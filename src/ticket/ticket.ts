import {Module}         from './../module';
import {Bot}            from './../bot';
import {Database}       from './../db/db';

export class Tickets implements Module {
    commands = [
    ];
    register(bot: Bot) 
    {
        (async () => {
                let configs = await Database.query('SELECT * FROM TicketsConfig');
                for(let server of configs)
                {
                    try {
                        let guild   =   await bot.bot.guilds.fetch(server['serverid']);
                        let channel =   guild.channels.resolve(server['messagechanid']);
                        if(channel !== null)
                        {
                            if(channel.isText())
                            {
                                let msg         =   await channel.messages.fetch(server['messageid']);
                                let collector   =   msg.createReactionCollector(filter => {
                                    return true;
                                });
                                collector.on('collect', (even, user) => {

                                });
                            } else throw 'channel is not text'; 
                        } else throw 'chan is null';
                    } catch(err)
                    {
                        console.error(err);
                    }
                }
        })();
    }
    name = "Tickets";

};