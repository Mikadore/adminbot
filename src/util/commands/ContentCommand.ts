import {Command}            from './../../command';
import {Message, Client, GuildChannel}    from 'discord.js';
import {message}            from './../resolver';

export class ContentCommand implements Command {
    public async run(command: string, msg: Message, bot: Client) : Promise<void> 
    {
        try {
            let m = await message(command, msg, bot);
            let gChan = <GuildChannel>m.channel;
            
            let perms = gChan.permissionsFor(msg.author);
        
            //Throwing in here is what we want
            //The message 'cannot find' is appropriate
            //Since we do *not* want to acknowledge 
            //The existence of a channel the user can't view
            if(perms === null) throw 'no perms';
            
            if(perms.has('VIEW_CHANNEL'))
            {
                let file : Buffer;
                if(m.embeds.length > 0)
                {
                    file = Buffer.from(JSON.stringify(m.embeds), 'utf8');
                } else 
                {
                    file = Buffer.from(m.content, "utf8");
                }
                await msg.channel.send({
                    files: [{
                        attachment: file,
                        name:       'raw.txt'       
                    }]
                }).catch(console.error);
            } else throw 'no perms';

        } catch(err)
        {
            await msg.channel.send(`Cannot find ${command}`).catch(console.error);
        }
    }
    public command = ["content", "raw"];
    public metadata = {
        name:           "Content",
        description:    "Fetches the raw text of a message",
        usage:          "content <message>",
        module:         "Utility"
    }
};