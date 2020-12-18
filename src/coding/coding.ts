import {Module}             from './../module';
import {Bot}                from './../bot';
import {CodeBlocksCommand}  from './commands/CodeBlocksCommand';
import {CodeCommand}        from './commands/CodeCommand';

export class Coding implements Module {
    private commands = [
        new CodeBlocksCommand,
        new CodeCommand
    ];
    register(bot: Bot) 
    {
        for(let cmd of this.commands)
        {
            bot.commands.push(cmd);
        }
        bot.modules.push(this);
    }
    public name = "Coding";
    public config = {};
};