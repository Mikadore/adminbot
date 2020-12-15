import {User, Message, GuildMember, Client, MessageMentions} from 'discord.js';

export async function user(str: string, msg: Message, bot: Client) : Promise<User>
{
    const matches = str.match(/.*<@!?(\d+)>.*/);
    if(matches)
    {
        const ID    = matches[1];
        return await bot.users.fetch(ID);
    }
    const user = bot.users.cache.find(usr => usr.id === str || usr.tag === str || usr.username === str);
    return user ? user : await bot.users.fetch(str, true, true);
}
export async function member(str: string, msg: Message, bot: Client) : Promise<GuildMember> 
{
    const matches = str.match(/.*<@!?(\d+)>.*/);
    if(matches)
    {
        const ID    = matches[1];
        return await msg.guild!.members.fetch(ID);
    } 
    const mbr = msg.guild!.members.cache.find(usr => usr.id === str || usr.user.tag === str || usr.user.username === str);

    return mbr ? mbr : await msg.guild!.members.fetch({
        user: str,
        force: true
    });
}