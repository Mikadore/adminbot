import {Module}         from './../module';
import {InfoCommand}    from './commands/InfoCommand';
import {HelpCommand}    from './commands/HelpCommand';
import {Bot}            from './../bot';
import { ConfigCommand } from './commands/ConfigCommand';

export class Utility implements Module {
    commands = [
        new InfoCommand
    ];
    register(bot: Bot) 
    {
        bot.modules.push(this);
        let config = new ConfigCommand(bot.modules);
        for(let cmd of this.commands)
        {
            bot.commands.push(cmd);
        }
        //register special commands
        const help = new HelpCommand(bot.commands, bot.prefix);
    }
    name = "Utility";

    public config = {};
};