/// <reference path="./index.d.ts" />
interface IFetchDataOption {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, any>;
  timeout?: number;
  responseType?: "json" | "text" | "blob" | "arrayBuffer" | "document";
}
declare global {
  /**
   * This file assigns global variables and functions for the application.
   * It includes utility functions, configuration options, and other helpers
   * that can be used throughout the application.
   *
   * @module AssignGlobal
   */
  function functionDesigner(key: string, value: Function): void;

  /**
   * Retrieves the value of the specified environment variable.
   * Returns `null` if the variable is not set.
   *
   * Usage:
   *   const value = env('MY_ENV_VAR');
   *
   * @param {string} key - The name of the environment variable to retrieve.
   * @returns {string | null} The value of the environment variable, or `null` if not set.
   */
  function env(arg1: string, arg2?: any): any;

  /**
   * Defines a global variable on `global` with the specified name and value.
   * The variable will be writable but not configurable, meaning:
   * - It can be modified but not deleted.
   * - If the variable already exists, it cannot be redefined.
   *
   * Usage:
   *   define("myVar", 123);
   *   console.log(global.myVar); // 123
   *
   * @param {string} name - The name of the global variable.
   * @param {any} value - The value to assign to the global variable.
   * @throws {Error} If the global variable already exists.
   */
  function define(name: string, value: any, configurable?: boolean): void;

  /**
   * Checks whether a given variable is defined in the current scope.
   * It returns true if the variable exists, otherwise false.
   */
  function isDefined(name: string): boolean;

  /**
   * Dynamically imports a module relative to the specified base path.
   *
   * @param file - The relative path to the module file (from basePath).
   * @returns A promise that resolves to the imported module.
   */
  function dynamicImport(file: string): Promise<any>;

  /**
   * Retrieves the value of a configuration option, similar to Laravel's `config` helper function.
   * Supports dot notation for nested configuration keys.
   *
   * Usage:
   *   const value = await config('app.name'); // Retrieves the value of `app.name`
   *   const value = await config('database.connections.mysql.host'); // Retrieves the value of a nested key
   *
   * @param {string} key - The configuration key, which can use dot notation for nested values.
   * @returns {any} The value of the configuration option, or `undefined` if the key does not exist.
   * @returns {void} Sets the value of the configuration option if an object is passed as the argument.
   */
  function config(key: string, value?: any): Promise<any>;

  /**
   * Restricts an object to only the specified keys.
   * Returns a new object containing only the provided keys and their associated values.
   *
   * Usage:
   *   const filtered = only(obj, ['key1', 'key2']);
   *
   * @param {Object} source - The object to filter.
   * @param {string[]} keys - The list of keys to include in the new object.
   * @returns {Object} A new object containing only the specified keys.
   */
  function only(source: Object, keys: string[]): Object;

  /**
   * Removes the specified keys from an object.
   * Returns a new object excluding the provided keys and retaining the rest.
   *
   * Usage:
   *   const cleaned = except(obj, ['password', 'token']);
   *
   * @param {Object} source - The object to filter.
   * @param {string[]} keys - The list of keys to exclude from the new object.
   * @returns {Object} A new object without the specified keys.
   */
  function except(source: Object, keys: string[]): Object;

  /**
   * Converts the first character of a string to uppercase while keeping the rest unchanged.
   *
   * Usage:
   *   const result = ucFirst('example'); // 'Example'
   *
   * @param {string} str - The string to transform.
   * @returns {string} The string with the first character capitalized.
   */
  function ucFirst(str: string): string;

  /**
   * Writes the serialized content of a variable to a log file.
   * The log file will be created at `rootapplication/tmp/{logName}.log`.
   *
   * Usage:
   *   log({ key: 'value' }, 'debug'); // Writes the object to `tmp/debug.log`
   *
   * @param {any} variable - The variable to write into the log file. Can be any type (string, object, array, etc.).
   * @param {string} logName - The name of the log file (without extension).
   * @returns {void}
   */
  function log(variable: unknown, logName: string, prefix?: string): void;

  /**
   * The base path of the application, typically the root directory.
   * This is used as the starting point for resolving all other paths.
   */
  function basePath(concatenation?: string): string;

  /**
   * The path to the application's resources directory, which typically contains views, translations, and other assets.
   */
  function resourcesPath(concatenation?: string): string;

  /**
   * The path to the application's view directory, where view files (such as Blade templates) are stored.
   */
  function viewPath(concatenation?: string): string;

  /**
   * The path to the public directory, which is typically the web server's document root.
   * This is where publicly accessible files like images, JavaScript, and CSS are located.
   */
  function publicPath(concatenation?: string): string;

  /**
   * The path to the public directory, which is typically the web server's document root.
   * This is where publicly accessible files.
   */
  function uploadPath(concatenation?: string): string;

  /**
   * The path to the database directory, where database-related files or configurations might be stored.
   */
  function databasePath(concatenation?: string): string;

  /**
   * The path to the application's core directory, where the main application logic is stored.
   */
  function appPath(concatenation?: string): string;

  /**
   * The path to the stub directory, where template files or skeleton code files (stubs) are stored.
   */
  function stubPath(): string;

  /**
   * Resolves the path to a controller file based on the given controller name.
   *
   * This function returns the path to a controller, typically relative to your controllers directory.
   * It constructs the path by combining a base path with the provided controller name, assuming the standard file structure.
   *
   * Usage:
   *   controllerPath('UserController');  // "/path/to/controllers/UserController.mjs"
   *   controllerPath('AdminController'); // "/path/to/controllers/AdminController.mjs"
   *
   * @param controller - The name of the controller (e.g., "UserController").
   * @returns The path to the controller file as a string.
   */
  function controllerPath(concatenation?: string): string;

  /**
   * tmp path
   */
  function tmpPath(): string;

  /**
   * Checks whether a file exists relative to a predefined base path.
   *
   * Usage:
   *   const exists = fileExist('path/to/file.txt');
   *
   * - If no path is provided, returns `false`.
   * - Resolves the file path relative to `'../../../'` from the current `__dirname`.
   * - Uses `fs.existsSync` for synchronous existence checking.
   *
   * @param fileString - Relative file path from the base path.
   * @returns `true` if the file exists, otherwise `false`.
   */
  function pathExist(fileString?: string): boolean;

  /**
   * Writes the provided content to a file relative to the base path.
   *
   * Usage:
   *   writeFile('path/to/file.txt', 'Hello World');
   *
   * - Resolves the file path relative to `'../../../'` from the current `__dirname`.
   * - Synchronously writes the content using UTF-8 encoding.
   *
   * @param fileString - The relative path to the file.
   * @param content - The string content to write into the file.
   */
  function writeFile(fileString: string, content: string): void;

  /**
   * Creates a directory (including parent directories) if it doesn't already exist.
   *
   * Usage:
   *   makeDir('path/to/directory');
   *
   * - Resolves the directory path relative to `'../../../'` from the current `__dirname`.
   * - Uses `fs.mkdirSync` with the `{ recursive: true }` option to create any missing parent directories.
   *
   * @param dirString - The relative path of the directory to create.
   */
  function makeDir(dirString: string): void;

  /**
   * Appends content to a file, creating the file if it doesn't already exist.
   *
   * Usage:
   *   appendFile('path/to/file.txt', 'Additional content');
   *
   * - Resolves the file path relative to `'../../../'` from the current `__dirname`.
   * - Uses `fs.appendFileSync` to append content with UTF-8 encoding.
   *
   * @param fileString - The relative path to the file.
   * @param content - The string content to append to the file.
   */
  function appendFile(fileString: string, content: string): void;

  /**
   * Generates a table name based on the given model name.
   * Typically used to follow naming conventions for database tables.
   *
   * Usage:
   *   const tableName = generateTableNames('User'); // Generates 'users' table name
   *   const tableName = generateTableNames('Post'); // Generates 'posts' table name
   *
   * @param {string} modelName - The model name (e.g., 'User', 'Post') for which to generate the table name.
   * @returns {string} The generated table name, typically plural and in snake_case.
   */
  function generateTableNames(modelName: string): string;

  /**
   * Encodes a string to standard Base64.
   */
  function base64encode(str: string, safe?: boolean): string;

  /**
   * Decodes a standard Base64 string to its original form.
   */
  function base64decode(str: string, safe?: boolean): string;

  /**
   * This function mimics PHP's strtotime by parsing a string containing a date or time
   * and returning the corresponding Unix timestamp (in seconds). It supports relative
   * date/time formats such as "next Friday" or "3 days ago" and adjusts based on the
   * system's time zone.
   */
  function strtotime(time: string, now?: number): number | null;

  /**
   * This function returns the current date and time
   * in the specified format (e.g., "Y-m-d H:i:s"). If no timestamp is provided,
   * it returns the current system time formatted accordingly.
   */
  function date(format?: string, timestamp?: number): string;

  /**
   * This function returns the current date and time
   * in the specified format (e.g., "Y-m-d H:i:s"). If no timestamp is provided,
   * it returns the current system time formatted accordingly.
   */
  function DATE(format: string, timestamp?: number): string;

  /**
   * Transfer a file into a new location.
   * @param {string} filePath - The path to the file to be transferred.
   * @param {string} destination - The destination path where the file should be transferred.
   */
  function transferFile(filePath: string, destination: string): boolean;

  /**
   * Performs an HTTP request to the specified URL with customizable options.
   * Returns a tuple: [error, response], where either one may be `null`.
   *
   * Usage:
   *   const [error, data] = fetchData('https://api.example.com', { method: 'GET' });
   *
   * @param url - The endpoint to request.
   * @param options - Optional configuration for the request (method, headers, body, etc.).
   * @returns A tuple containing the Promise<[error, data]>.
   */
  function fetchData(
    url: string,
    options?: IFetchDataOption
  ): Promise<[any, any]>;

  /**
   * Retrieve the last element of an array.
   * If the array is empty, `null` is returned.
   */
  function end(array: any[]): any;

  /**
   * Checks whether a given function is defined in the current scope.
   * It returns true if it is a function, otherwise false.
   */
  function is_function(name: any): boolean;

  /**
   * Checks if the given value is a string.
   *
   * @param value - The value to check.
   * @returns `true` if the value is a string, otherwise `false`.
   */
  function is_string(value: any): boolean;

  /**
   * Checks if the given value is an array.
   *
   * @param value - The value to check.
   * @returns `true` if the value is an array, otherwise `false`.
   */
  function is_array(value: any): boolean;

  /**
   * Checks if the given value is an object (excluding null and arrays).
   *
   * @param value - The value to check.
   * @returns `true` if the value is an object, otherwise `false`.
   */
  function is_object(value: any): boolean;

  /**
   * Checks if the given value is numeric (a number or numeric string).
   *
   * @param value - The value to check.
   * @returns `true` if the value is numeric, otherwise `false`.
   */
  function is_numeric(value: any): boolean;

  /**
   * Checks if the given value is an integer.
   *
   * @param value - The value to check.
   * @returns `true` if the value is an integer, otherwise `false`.
   */
  function is_integer(value: any): boolean;

  /**
   * Checks if the given value is a floating-point number.
   *
   * @param value - The value to check.
   * @returns `true` if the value is a float, otherwise `false`.
   */
  function is_float(value: any): boolean;

  /**
   * Checks if the given value is a boolean.
   *
   * @param value - The value to check.
   * @returns `true` if the value is a boolean, otherwise `false`.
   */
  function is_boolean(value: any): boolean;

  /**
   * Checks if the given value is `null`.
   *
   * @param value - The value to check.
   * @returns `true` if the value is null, otherwise `false`.
   */
  function is_null(value: any): boolean;

  /**
   * Checks if the given value is set (not `undefined` or `null`).
   *
   * @param value - The value to check.
   * @returns `true` if the value is set, otherwise `false`.
   */
  function isset(value: any): boolean;

  /**
   * Checks if the given key exists in the object.
   *
   * @param object - The object to check.
   * @param key - The key to check for.
   * @returns `true` if the key exists in the object, otherwise `false`.
   */
  function key_exist(object: object, key: string): boolean;

  /**
   * Checks if the given value is empty.
   *
   * @param value - The value to check.
   * @returns `true` if the value is empty, otherwise `false`.
   */
  function empty(value: any): boolean;

  /**
   * Checks if the given method exists on the given object.
   *
   * @param object - The object to check.
   * @param method - The method to check for.
   * @returns `true` if the method exists on the object, otherwise `false`.
   */
  function method_exist(object: object, method: string): boolean;

  /**
   * Encodes the given data as a JSON string.
   *
   * @param data - The data to encode.
   * @returns A string representing the JSON-encoded version of the data.
   */
  function json_encode(data: any): string;

  /**
   * Decodes the given JSON string into a JavaScript object or returns the data if it's not a string.
   *
   * @param data - The JSON string to decode.
   * @returns The decoded JavaScript object, or the original data if it is not a string.
   */
  function json_decode(data: any): any;

  /**
   * Reads the content of a file synchronously.
   * @param fileString The relative file path from the base path.
   * @returns The file contents as a UTF-8 string. Returns an empty string if reading fails or no path is provided.
   */
  function getFileContents(fileString?: string): string;
}
export {};
