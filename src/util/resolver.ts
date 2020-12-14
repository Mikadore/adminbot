import {User, Message, GuildMember, Client} from 'discord.js';

export async function user(str: string, msg: Message, bot: Client) : Promise<User>
{
    let user = msg.mentions.users.first();
    if(user !== undefined)
    {
        return user;
    }
    
    user = bot.users.cache.find(user => user.username == str || user.tag == str || user.id == str);
    if(user !== undefined)
    {
        return user;
    }
    return await bot.users.fetch(str, true, true);
}
export async function member(str: string, msg: Message, bot: Client) : Promise<GuildMember> 
{
    let user = msg.mentions.users.first();
    if(user !== undefined)
    {
        const member = await msg.guild?.members.fetch(user);
        if(member !== undefined)
        {
            return member;
        }        
    }
    let member = msg.guild?.members.cache.find(user => user.user.username == str || user.user.tag == str || user.id == str );
    if(member !== undefined)
    {
        return member;
    }
    return await msg.guild!.members.fetch({
        user: str, 
        force: true
    });
}