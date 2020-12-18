import { Message, Client }  from "discord.js";
import { resolvePtr } from "dns";
import 'node-fetch';

export async function languages(msg: Message, bot: Client)
{
    let response = await fetch("https://godbolt.org", {
        headers: [["Accept", "application/json"]]
    });
    let json = await response.json();
    await msg.channel.send(JSON.stringify(json));
}