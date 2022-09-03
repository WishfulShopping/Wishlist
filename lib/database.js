import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import path from 'path'

const PATH = "data";
export default (user) =>  new JsonDB(new Config(path.join(PATH, Buffer.from(user).toString('base64'), 'url'), true, true, '/'));