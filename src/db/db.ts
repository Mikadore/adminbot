import {createConnection} from 'mariadb';

export class DB
{

};

const defined = (x: any, name: string) => {
    if(x == undefined) {
        console.error(`Env var ${name} is not defined`);
        process.exit(1);
    }
}

const DB_PASS = process.env.DB_PASS;

defined(DB_PASS, "DB_PASS")

export const Database: DB = new DB;