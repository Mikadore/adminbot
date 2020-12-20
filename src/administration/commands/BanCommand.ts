import {Command}            from './../../command';
import {Message, Client}    from 'discord.js';
import {member}             from './../../util/resolver';

export class BanCommand implements Command {
    public async run(command: string, msg: Message, bot: Client) : Promise<void> 
    {
        if(!msg.member!.hasPermission('BAN_MEMBERS'))
        {
            await msg.channel.send(`You don't have banning permissions`).catch(console.error);
            return;
        }
        let array   = command.split(' ');
        let user    = array[0];  
        if(user.length == 0)
        {
            await msg.channel.send(`Need a user to ban!`).catch(console.error);
            return;
        }
        try {
            let mbr     =   await member(user, msg.guild!, bot);
            let reason  =   array.slice(1).join(' ');
            try {
                await mbr.ban({
                    reason: reason
                });
                await msg.channel.send(`Succesfully banned <@${mbr.user.id}>`).catch(console.error);
            } catch 
            {
                await msg.channel.send(`Cannot ban <@${mbr.user.id}>`).catch(console.error);
            }
        } catch 
        {
            await msg.channel.send(`Cannot find user ${user}!`).catch(console.error);
        }
    }

    public command = ["ban", "b"];
    
    public metadata = {
        name: "Ban",
        usage: "ban <user> <optional | reason>",
        description: "Bans a user from the server the command is invoked in",
        module: "Administration"
    };
};