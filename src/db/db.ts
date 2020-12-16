import {createConnection, Connection} from 'mariadb';

export class DB
{
    private connection!: Connection;
    private     user: string;
    private     pass: string;
    private     host: string;
    private     ssl : boolean;

    constructor(user: string, pass: string, host: string, ssl: boolean) 
    {
        this.user = user;
        this.pass = pass;
        this.host = host;
        this.ssl  = ssl;
    }
    public async connect() 
    {
        this.connection = await createConnection({

            user:       this.user,
            password:   this.pass,
            host:       this.host,
            database:   'discord',
            ssl:        this.ssl

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
const equal = (x: any, name: string, values: any[]) => {
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
const DB_ENCR = process.env.DB_ENCR;

defined(DB_PASS, "DB_PASS");
defined(DB_USER, "DB_USER");
defined(DB_HOST, "DB_HOST");
equal  (DB_ENCR, "DB_ENCR", ["true", "false"]);

console.log(`connecting to ${DB_USER}@${DB_HOST} with SSL = ${DB_ENCR}`);

export const Database: DB = new DB(DB_USER!, DB_PASS!, DB_HOST!, DB_ENCR! === "true" ? true : false);
