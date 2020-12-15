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
            
            const requestedByAvatar = msg.author.displayAvatarURL({
                format: "jpg",
                size: 4096
            });
            
            const avatarUrl = usr.displayAvatarURL({
                                format: "jpg",
                                size: 64
            });
            const dateString = usr.createdAt.toUTCString();

            let infoEmbed = new MessageEmbed()
                .setThumbnail(avatarUrl)
                .setFooter(`Requested by ${msg.author.username}`, requestedByAvatar)
                .addFields([
                    {
                        name:       "Acount Tag",        
                        value:      usr.tag,                 
                        inline:     true
                    },
                    {
                        name:       "Discord ID",       
                        value:      usr.tag,
                        inline:     true
                    },
                    {
                        name:       "Bot Account",
                        value:      usr.bot.toString(),
                        inline: true
                    },
                    {
                        name:       "Creation Date",
                        value:      dateString,
                        inline: true
                    },
                    //avatar in MD format
                    {   
                        name:       "Avatar URL",
                        value:      `[URL](${avatarUrl})`,
                        inline:     true
                    }
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