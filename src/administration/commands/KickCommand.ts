import {Command}            from './../../command';
import {Message, Client}    from 'discord.js';
import {member}             from './../../util/resolver';

export class KickCommand implements Command {
    public async run(command: string, msg: Message, bot: Client) : Promise<void> 
    {
        let array   = command.split(' ');
        let user    = array[0];  
        if(user.length == 0)
        {
            msg.channel.send(`Need a user to kick!`);
        }
        try {
            let mbr     =   await member(user, msg, bot);
            let reason  =   array.slice(1).join(' ');
            try {
                await mbr.kick(reason);
                msg.channel.send(`Succesfully kicked <@${mbr.user.id}>`).catch(err => console.error(err));
            } catch 
            {
                msg.channel.send(`Cannot kick <@${mbr.user.id}>`).catch(err => console.error(err));
            }
        } catch 
        {
            msg.channel.send(`Cannot find user \`${user}\`!`).catch(err => console.error(err));
        }
    }

    public command = ["kick", "k"];
    
    public metadata = {
        name: "Kick",
        usage: "kick <user> <reason>",
        description: "Kicks a user from the server the command is invoked in",
        module: "Administration"
    };
};