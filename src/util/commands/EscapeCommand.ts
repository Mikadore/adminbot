import {Command}            from './../../command';
import {Message, Client, GuildChannel}    from 'discord.js';
import {message}            from './../resolver';

export class EscapeCommand implements Command {
    public async run(command: string, msg: Message, bot: Client) : Promise<void> 
    {
        try {
            let m = await message(command, msg.guild!, bot);
            let gChan = <GuildChannel>m.channel;
            
            let perms = gChan.permissionsFor(msg.author);
        
            //Throwing in here is what we want
            //The message 'cannot find' is appropriate
            //Since we do *not* want to acknowledge 
            //The existence of a channel the user can't view
            if(perms === null) throw 'no perms';
            
            if(perms.has('VIEW_CHANNEL'))
            {
                let text : string;
                if(m.embeds.length > 0)
                {
                    text = JSON.stringify(m.embeds);
                } else 
                {
                    text = m.content;
                }
                
                let escaped = '```\n';
                
                escaped +=  text.replace(/```/g, '`\u200B`\u200B`');
                escaped += '\n```';
                
                await msg.channel.send(escaped).catch(console.error);

            } else throw 'no perms';

        } catch(err)
        {
            await msg.channel.send(`Cannot find '${command}'`).catch(console.error);
        }
    }
    public command = ["escape"];
    public metadata = {
        name:           "Escape",
        description:    "Escapes the content of a message",
        usage:          "escape <message>",
        module:         "Utility"
    }
};