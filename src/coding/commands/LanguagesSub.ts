import { Message, Client }  from "discord.js";
import { resolvePtr } from "dns";
import 'node-fetch';

export async function languages(msg: Message, bot: Client)
{
    let resp = await (await fetch("https://godbolt.org/api/languages")).text();
    msg.channel.send(resp);
}