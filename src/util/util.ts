import {Module}         from './../module';
import {Bot}            from './../bot';
import {InfoCommand}    from './commands/InfoCommand';
import {HelpCommand}    from './commands/HelpCommand';
import {ConfigCommand}  from './commands/ConfigCommand';
import {ContentCommand} from './commands/ContentCommand';
import {CommitCommand}  from './commands/CommitCommand';

export class Utility implements Module {
    commands = [
        new InfoCommand,
        new ContentCommand,
        new CommitCommand
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

};