import {Module}         from './../module';
import {Bot}            from './../bot';
import {Database}       from './../db/db';
import {message}        from './../util/resolver';

export class Tickets implements Module {
    commands = [

    ];
    register(bot: Bot) 
    {}

    async init(bot: Bot)
    {
        let configs = await Database.query('SELECT * FROM TicketsConfig');
        for(let server of configs)
        {
            try {
                let guild   =   await bot.bot.guilds.fetch(server['serverid']);
                let msg     =   await message(server['messageid'], guild, bot.bot);
                let collector = msg.createReactionCollector(() => true);
                collector.on('collect', async (reaction, user) => {
                    
                });
            } catch(err)
            {
                console.error(err);
            }
        }
    }
    name = "Tickets";

};