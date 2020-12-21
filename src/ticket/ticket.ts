import {Module}                 from './../module';
import {Bot}                    from './../bot';
import {Database}               from './../db/db';
import {message}                from './../util/resolver';
import { ReactionCollector }    from 'discord.js';

export class Tickets implements Module {
    commands = [

    ];
    register(bot: Bot) 
    {
        for(let cmd of this.commands)
        {
            bot.commands.push(cmd);
        }
    }

    private collector?: ReactionCollector;

    async init(bot: Bot)
    {
        let configs = await Database.query('SELECT * FROM TicketsConfig');
        for(let server of configs)
        {
            try {
                let guild   =   await bot.bot.guilds.fetch(server['serverid']);
                let msg     =   await message(server['messageid'], guild, bot.bot);

            } catch(err)
            {
                console.error(err);
            }
        }
    }
    name = "Tickets";

};