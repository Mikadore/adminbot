import {Message, Client, MessageEmbed, Role}    from 'discord.js';
import {Command}                                from './../../command';
import {member, user}                           from './../resolver'

export class InfoCommand implements Command {
    public async run(command: string, msg: Message, bot: Client) : Promise<void> 
    {
        if(command.length == 0)
        {
            await msg.channel.send("Need user to lookup!").catch(console.error);
            return;
        }
        try {
            let usr = await user(command, bot);
            
            const requestedByAvatar = msg.author.displayAvatarURL({
                format: "png",
                dynamic: true
            });
            
            const avatarUrl = usr.displayAvatarURL({
                                format: "png",
                                dynamic: true
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
                        value:      usr.id,
                        inline:     true
                    },
                    {
                        name:       "Bot Account",
                        value:      usr.bot.toString(),
                        inline:     true
                    },
                    //avatar in MD format
                    {   
                        name:       "Avatar",
                        value:      `[URL](${avatarUrl})`,
                        inline:     true
                    }, 
                    {
                        name:       "Profile",
                        value:      `<@${usr.id}>`,
                        inline:     true
                    },
                    {
                        name:       "Animated PFP",
                        value:      avatarUrl.endsWith('gif').toString(),
                        inline:     true
                    }
                ]);
            
            //if the user is also a member of the guild display guild specific information
            try {
                const member    = await msg.guild!.members.fetch(usr); 

                let roles : Role[] = [];                
                member.roles.cache.forEach((role, key) => {
                    if(role != msg.guild!.roles.everyone)
                        roles.push(role);
                });
                roles.sort((a, b) => {
                    return -1*a.comparePositionTo(b);
                });

                const roleString = roles.join('');
                

                infoEmbed.addFields([
                    {
                        name:       "Nickname",
                        value:      member.nickname ? member.nickname : "none",
                        inline:     false
                    }, 
                    {
                        name:       "Roles",
                        value:      roleString ? roleString : "none",
                        inline:     false
                    }
                ])
                .setColor(member.displayHexColor);
                
                if(member.joinedTimestamp)
                {
                    const daysSince = Math.floor((Date.now() - member.joinedTimestamp)/(1000*60*60*24));
                    infoEmbed.addField(
                        "Join Date",
                        `\`${member.joinedAt!.toUTCString()}\` (${daysSince} days ago)`,
                        false
                    );
                }
            } catch(err)
            {
                console.error(err);
            }

            const daysSince = Math.floor((Date.now() - usr.createdTimestamp)/(1000*60*60*24));

            infoEmbed.addField(
                "Account Creation Date",
                `\`${usr.createdAt.toUTCString()}\` (${daysSince} days ago)`,
                false
            );         

            await msg.channel.send(infoEmbed).catch(console.error);

        } catch {
            await msg.channel.send(`Cannot find user ${command}`).catch(console.error);
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