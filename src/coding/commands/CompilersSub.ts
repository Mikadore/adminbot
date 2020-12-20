import { Message, Client, MessageEmbed }    from "discord.js";
import { embedPager }                       from './../../util/pages';   

const fetch = require('node-fetch');

export async function showCompilers(language: string, msg: Message, bot: Client)
{
    let response    = await fetch(`https://godbolt.org/api/compilers/${language}`, {
        headers: [["Accept", "application/json"]]
    });
    let compilers   = await response.json();

    if(compilers.length == 0)
    {
        await msg.channel.send('Not a valid language; see `code languages`').catch(console.error);
        return;
    }

    let embeds: MessageEmbed[] = [];
    let embed =  new MessageEmbed()
                    .setFooter(`Requested by ${msg.author.tag}`, msg.author.displayAvatarURL());

    let counter  = 0;

    for(let compiler of compilers)
    {
        embed.addField(compiler['id'], compiler['name']);
        if(++counter >= 10)
        {
            embeds.push(embed);
            counter = 0;
            embed = new MessageEmbed()
                    .setFooter(`Requested by ${msg.author.tag}`, msg.author.displayAvatarURL());
        }
    }
    if(counter != 0)
    {
        embeds.push(embed);
        counter = 0;
    }
    let sent = await msg.channel.send(embeds[0]);
    if(embeds.length > 1)
    {
        await embedPager(sent, embeds, 0, 60);
    }
}