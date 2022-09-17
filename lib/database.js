import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import path from 'path'
import fs from 'fs';

const PATH = "data";
export default (user) =>  {
    if (user.length<16) {
        user = "demo";
    }
    const suppliedName = Buffer.from(user).toString('base64');
    let databaseName = fs.readdirSync(PATH).filter(fn => fn.startsWith(suppliedName.slice(0, -4))).pop();
    if (!databaseName) {
        databaseName = 'ZGVtbwo='
    }
    const saveOnPush = (suppliedName==databaseName);
    return new JsonDB(new Config(path.join(PATH, databaseName, 'url'), saveOnPush, true, '/'));
}