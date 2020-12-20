const  config =         require('./config/config.json');
import {Bot}            from './src/bot';
import {Administration} from './src/administration/administration'
import {Utility}        from './src/util/util';
import {Coding}         from './src/coding/coding';
import {Database}       from './src/db/db';
import {Tickets}        from './src/ticket/ticket';    

(async () => {

    await Database.connect()

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

    bot.registerModule(new Coding);

    bot.registerModule(new Tickets);

    //needs to go last to register all commands for `help`
    bot.registerModule(new Utility);

    bot.run();

})();