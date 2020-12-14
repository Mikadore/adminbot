import {Module}         from './../module';
import {BanCommand}     from './commands/BanCommand';
import {KickCommand}    from './commands/KickCommand';
import {Bot}            from './../bot';
export class Administration implements Module {
    private commands = [
        new BanCommand,
        new KickCommand
    ];
    register(bot: Bot) 
    {
        for(let cmd of this.commands)
        {
            bot.commands.push(cmd);
        }
    }
    name = "Administration";
};