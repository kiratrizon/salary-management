import Hash from "../../../libraries/Services/Hash.mjs";
import JWT from "../../../libraries/Services/JWT.mjs";
import DB from "../../database/Manager/DB.mjs";
import MemoryCache from "../../../vendor/MemoryCache.mjs";
import Collection from "../../database/Manager/Collection.mjs";

const jwtObj = await config('jwt');

class Guard {
    #driver; // session, jwt
    #model;
    #isModel;
    #table;
    constructor(driver, modelOrTable, driverProvider) {
        let isModel = driverProvider === 'eloquent';
        this.#driver = driver;
        this.#isModel = isModel;
        if (isModel) {
            this.#model = modelOrTable;
        } else {
            this.#table = modelOrTable;
        }
    }

    async attempt(data = {}, remember = false) {
        if (!is_object(data)) {
            return null;
        }
        if (this.#driver === 'jwt') {

            if (!this.#isModel) {
                return null;
            }
            const instance = new this.#model();
            if (
                !method_exist(instance, 'getJWTCustomClaims')
                || !method_exist(instance, 'getJWTIdentifier')
            ) {
                console.warn('Please define the getJWTCustomClaims and getJWTIdentifier methods in your model.');
                return null;
            }
        }
        let key = 'email';
        if (this.#isModel && method_exist(this.#model, 'getUsername')) {
            key = this.#model.getUsername();
        }

        if (isset(data[key])) {
            let user;
            if (this.#isModel) {
                user = await this.#model.where(key, data[key]).first();
            } else {
                user = DB.table(this.#table).where(key, data[key]).first();
            }
            if (user) {
                if (Hash.check(data.password, user.password)) {
                    if (this.#driver === 'jwt') {
                        let filtered = user.getJWTCustomClaims();
                        const keyName = `${new this.#model().table || generateTableNames(this.#model.name)}`;
                        filtered.role = keyName;
                        const cache = new MemoryCache();
                        let expiration = jwtObj.expiration.default * 60;
                        if (remember) {
                            expiration = expiration * 30;
                        }
                        cache.setExpiration(expiration);
                        // save to cache
                        await cache.set(`${keyName}__${user.id}`, user.makeVisible('password').toJson());
                        return JWT.generateToken(filtered, jwtObj.secret_key, expiration, jwtObj.algorithm);
                    } else if (this.#driver === 'session') {
                        return user;
                    }
                }
            }
        }
        return null;
    }

    check() {
        if (this.#driver === 'jwt') {
            // Get token from Authorization header
            const token = request().header('authorization');
            // If no token is provided, return null
            if (empty(token)) {
                return null;
            }

            // Remove the 'Bearer ' part from the token string
            const cleanedToken = String(token).replace('Bearer ', '');

            try {
                // Verify the token using JWT and your secret key
                const decoded = JWT.verifyToken(cleanedToken, jwtObj.secret_key, jwtObj.algorithm);

                return decoded;
            } catch (error) {
                // If verification fails (expired, invalid token), return null
                return null;
            }
        }
    }

    async user() {
        const check = this.check();
        if (check) {
            if (this.#driver === 'jwt') {
                const cache = new MemoryCache();
                const keyName = `${new this.#model().table || generateTableNames(this.#model.name)}`;
                const user = await cache.get(`${keyName}_${check.sub}`);
                if (user) {
                    console.log('user from cache', user);
                    return new Collection(this.#model).one([user]);
                } else {
                    // If not found in cache, fetch from database
                    const model = this.#model;
                    const userFromDB = await model.find(check.sub);
                    if (userFromDB) {
                        // Store in cache for future use
                        cache.setExpiration(null);
                        await cache.set(`${keyName}_${check.sub}`, userFromDB.makeVisible('password').toArray());
                        userFromDB.makeHidden('password');
                        return userFromDB;
                    }
                }
            }
        }
        return null;
    }

    id() {
        const check = this.check();
        if (check) {
            if (this.#driver === 'jwt') {
                return check.sub;
            }
        }
        return null;
    }

    logout() {
        const check = this.check();
        if (check) {
            if (this.#driver === 'jwt') {
                const cache = new MemoryCache();
                const keyName = `${new this.#model().table || generateTableNames(this.#model.name)}`;
                cache.delete(`${keyName}_${check.sub}`);
                return true;
            }
        }
        return null;
    }
}

export default Guard;