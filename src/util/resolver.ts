import {User, Message, GuildMember, Client, MessageMentions, TextChannel, GuildChannel} from 'discord.js';

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
        user:   str,
        force:  true
    });
}

export async function message(str: string, msg: Message, bot: Client) : Promise<Message>
{
    const matches = str.match(/^https:\/\/discord.com\/channels\/(\d+)\/(\d+)\/(\d+)$/);
    if(matches)
    {
        const   guildID   = matches[1];
        const   channelID = matches[2];
        const   messageID = matches[3];

        if(guildID != msg.guild!.id)
        {
            throw 'Not from this guild';
        }

        let channel = msg.guild!.channels.resolve(channelID);

        if(channel !== null && channel!.isText())
        {   
            let text = <TextChannel>channel;
            return await text.messages.fetch(messageID);
        } else 
        {
            throw 'Not a text channel';
        }
    } else 
    {
        if(str.match(/^[0-9]+$/))
        {
            let arr = msg.guild!.channels.cache.array();
            for(let chan of arr)
            {
                if(chan.isText())
                    try {
                        return await chan.messages.fetch(str);
                    } catch {}
            }
            throw 'not found';
        } else 
        {
            throw 'not an id';
        }
    }
}
/*
export async function guildChannel(str: string, msg: Message, bot: Client) : Promise<GuildChannel>
{

}*/