import { GuildChannel, Message  } from "discord.js"
import { Database } from './../../db/db';


export async function collect(msg: Message, emojiid: string, category: GuildChannel)
{
    let collector = msg.createReactionCollector(() => true);
    collector.on('collect', async (reaction, user) => {
        if(reaction.emoji.id !== emojiid)
        {
            await reaction.remove();
            return;
        }
        
    })
}