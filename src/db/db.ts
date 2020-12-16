import {createConnection, Connection} from 'mariadb';

export class DB
{
    private connection!: Connection;
    
    constructor(user: string, pass: string, host: string) 
    {
        createConnection({
            user: user,
            password: pass,
            host: host
        }).then(conn => {
            this.connection = conn;
        }).catch(err => {
            console.error(err);
            process.exit(1);
        });
    }
};

const defined = (x: any, name: string) => {
    if(x == undefined) {
        console.error(`Env var ${name} is not defined`);
        process.exit(1);
    }
}
const equal = (x: any, name: string, values: []) => {
    defined(x, name);
    for(let val of values)
    {
        if(x === val)
            return;
    }
    console.error(`Env var ${name} is not one of `, values);
}

const DB_PASS = process.env.DB_PASS;
const DB_USER = process.env.DB_USER;
const DB_HOST = process.env.DB_HOST;

defined(DB_PASS, "DB_PASS");
defined(DB_USER, "DB_USER");
defined(DB_HOST, "DB_HOST");

export const Database: DB = new DB(DB_USER!, DB_PASS!, DB_HOST!);