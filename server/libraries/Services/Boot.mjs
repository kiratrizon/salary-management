import ExpressView from "../../main/express/http/ExpressView.mjs";

class Boot {

    static async register() {
        // define your global variables here

        define('helloworld', 'hi');
    }


    static async notFound() {
        if (isRequest()) {
            return response().json({ message: 'Not Found' }, 404);
        }
        return view('error');
    }

    static hasher() {
        return 'bcrypt';
    }

    static async init() {
        await ExpressView.init();
    }
}

export default Boot;