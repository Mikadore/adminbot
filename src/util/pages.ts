import {Message, MessageEmbed} from 'discord.js';
export async function embedPager(message: Message, embeds: MessageEmbed[], index: number, maxTime: number)
{
    let collector = message.createReactionCollector((reaction, user) => !user.bot, {
        time: maxTime*1000,
    });

    let currentIndex = index;

    await message.react("➡️").catch(console.error);

    collector.on('collect', async (reaction, user) => {
        if(reaction.emoji.name === "⬅️")
        {
            if(currentIndex > 0)
            {
                currentIndex--;
            }
            await reaction.message.edit(embeds[currentIndex]).catch(console.error);
        } else if (reaction.emoji.name === "➡️")
        {
            if(currentIndex < embeds.length - 1)
            {
                currentIndex++;
            }
            await reaction.message.edit(embeds[currentIndex]).catch(console.error);
        }
        await reaction.message.reactions.removeAll().catch(console.error);

        if(currentIndex !== 0)
            await reaction.message.react("⬅️").catch(console.error);
        if(currentIndex !== embeds.length - 1)
            await reaction.message.react("➡️").catch(console.error)
    });

    collector.on('end', async collected => {
        await collector.message.reactions.removeAll().catch(console.error);
    });
}