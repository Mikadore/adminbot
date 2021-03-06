import {Command}            from './../../command';
import {Message, Client}    from 'discord.js';
import {member}             from './../../util/resolver';

export class KickInviteCommand implements Command {
    public async run(command: string, msg: Message, bot: Client) : Promise<void> 
    {
        if(!msg.member!.hasPermission('KICK_MEMBERS'))
        {
            await msg.channel.send(`You don't have kicking permissions`).catch(console.error);
            return;
        }
        let array   = command.split(' ');
        let user    = array[0];  
        if(user.length == 0)
        {
            await msg.channel.send(`Need a user to kick!`).catch(console.error);
            return;
        }
        try {
            let mbr = await member(user, msg.guild!, bot);
            try {
                let channel = msg.guild!.channels.resolve(msg.channel.id);
                let invite = await channel?.createInvite({
                    temporary:  false,
                    maxAge:     60*60*24,
                    maxUses:    1,
                    reason:     'ikick invoked' 
                });
                if(invite != null)
                {
                    await mbr.send(invite.url);
                } else throw'';
            } catch 
            {
                await msg.channel.send("Could not DM invite link, aborting").catch(console.error);
                return;
            }
            let reason  =   array.slice(1).join(' ');
            try {
                await mbr.kick(reason);
                await msg.channel.send(`Succesfully kicked <@${mbr.user.id}>`).catch(console.error);
            } catch 
            {
                await msg.channel.send(`Cannot kick <@${mbr.user.id}>`).catch(console.error);
            }
        } catch 
        {
            await msg.channel.send(`Cannot find user \`${user}\`!`).catch(console.error);
        }
    }

    public command = ["kick-invite", "ikick", "kickinv", "kickinvite", "invitekick", "invite-kick"];
    
    public metadata = {
        name: "Kick Invite",
        usage: "kick-invite <user> <optional | reason>",
        description: "Kicks a user from the server and sends them an invite to the server",
        module: "Administration"
    };
};