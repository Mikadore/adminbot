import { Message, Client, MessageEmbed }    from "discord.js";
import { embedPager }                       from './../../util/pages';
const fetch = require('node-fetch');

export async function fetchLanguages() : Promise<string[]>
{
    let response = await fetch("https://godbolt.org/api/languages", {
        headers: [["Accept", "application/json"]]
    });
    let json = await response.json();

    let languages: string[] = [];

    for(let lang of json)
    {
        languages.push(lang['id']);
    }
    return languages;
}
export async function showLanguages(msg: Message, bot: Client) 
{
    let languages = await fetchLanguages();

    let embeds: MessageEmbed[] = [];
    
    let string = '';
    let counter  = 0;

    for(let i = 0; i < languages.length; i++)
    {
        string += `**${i + 1})** ${languages[i]}\n`;
        if(++counter >= 16)
        {
            embeds.push(
                new MessageEmbed()
                        .setFooter(`Requested by ${msg.author.tag}`, msg.author.displayAvatarURL())
                        .addField(`Languages (${languages.length})`, string)
            );
            string = '';
            counter = 0;
        }
    }
    if(counter != 0)
    {
        embeds.push(
            new MessageEmbed()
                    .setFooter(`Requested by ${msg.author.tag}`, msg.author.displayAvatarURL())
                    .addField(`Languages (${languages.length})`, string)
        );
        string = '';
        counter = 0;
    }
    let sent = await msg.channel.send(embeds[0]);
    await embedPager(sent, embeds, 0, 60);
}