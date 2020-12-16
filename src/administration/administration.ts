import {Module}             from './../module';
import {BanCommand}         from './commands/BanCommand';
import {KickCommand}        from './commands/KickCommand';
import {KickInviteCommand}  from './commands/KickInvitecommand';
import {Bot}                from './../bot';

export class Administration implements Module {
    private commands = [
        new BanCommand,
        new KickCommand,
        new KickInviteCommand
    ];
    register(bot: Bot) 
    {
        for(let cmd of this.commands)
        {
            bot.commands.push(cmd);
        }
    }
    public name = "Administration";
    public config = {};
};