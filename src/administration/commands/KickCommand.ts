import {Command}            from './../../command';
import {Message, Client}    from 'discord.js';
import {member}             from './../../util/resolver';

export class KickCommand implements Command {
    public async run(command: string, msg: Message, bot: Client) : Promise<void> 
    {
        if(!msg.member!.hasPermission('KICK_MEMBERS'))
        {
            await msg.channel.send(`You don't have banning permissions`).catch(console.error);
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
            let mbr     =   await member(user, msg, bot);
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

    public command = ["kick", "k"];
    
    public metadata = {
        name: "Kick",
        usage: "kick <user> <optional | reason>",
        description: "Kicks a user from the server the command is invoked in",
        module: "Administration"
    };
};