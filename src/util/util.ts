import {Module}         from './../module';
import {InfoCommand}    from './commands/InfoCommand';
import {HelpCommand}    from './commands/HelpCommand';
import {Bot}            from './../bot';

export class Utility implements Module {
    commands = [
        new InfoCommand
    ];
    register(bot: Bot) 
    {
        for(let cmd of this.commands)
        {
            bot.commands.push(cmd);
        }
        //register special commands
        const help = new HelpCommand(bot.commands);
    }
    name = "Utility";
};