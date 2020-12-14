import {Message, Client, MessageEmbed, EmbedField} from 'discord.js';
import {Command} from './../../command';
import {user} from './../resolver'

export class InfoCommand implements Command {
    public async run(command: string, msg: Message, bot: Client) : Promise<void> 
    {
        if(command.length == 0)
        {
            msg.channel.send("Need user to lookup!").catch(console.error);
            return;
        }
        try {
            let usr = await user(command, msg, bot);

            let infoEmbed = new MessageEmbed()
                .setImage(usr.avatarURL({
                    format: "jpg",
                    dynamic: true,
                    size: 64
                })!)
                .setFooter(`Requested by ${msg.author.username}`)
                .addFields([
                    {name: "ID",    value:      usr.id,                 inline: true},
                    {name: "Tag",   value:      usr.tag,                inline: true},
                    {name: "Bot",   value:      usr.bot.toString(),     inline: true}
                ]);
            
            msg.channel.send(infoEmbed).catch(err => console.error);

        } catch {
            msg.channel.send(`Cannot find user \`${command}\``).catch(err => console.error(err));
        }
    }

    public command = ["info", "i"];
    
    public metadata = {
        name: "Info",
        usage: "info <user>",
        description: "Gathers information of a Discord user",
        module: "Utility"
    };
};