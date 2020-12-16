const  config =         require('./config/config.json');
import {Bot}            from './src/bot';
import {Administration} from './src/administration/administration'
import {Utility}        from './src/util/util';
import {Database}       from './src/db/db';


Database.connect();

//Get enviromental variables

const defined = (x: any, name: string) => {
    if(x == undefined) {
        console.error(`Env var ${name} is not defined`);
        process.exit(1);
    }
}

let TOKEN   =   process.env.TOKEN;
defined(TOKEN, "TOKEN");


const bot = new Bot(TOKEN!, config.prefix);

bot.registerModule(new Administration);

//needs to go last to register all commands for `help`
bot.registerModule(new Utility);

bot.run();