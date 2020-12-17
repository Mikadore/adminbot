import {Message, Client, MessageEmbed}      from 'discord.js';
import {Command}                            from './../../command';
import {name, version}                      from './../../bot';
import {embedPager}                         from './../pages';


export class HelpCommand implements Command {
    private commands: Command[];
    private embeds: {
        commands: string[],
        embed: MessageEmbed
    }[] = [];

    private helpPages: MessageEmbed[] = [];

    constructor(cmds: Command[], prefix: string)
    {
        cmds.push(this);
        cmds.sort((a, b) => (a.command[0] < b.command[0]) ? -1 : 1);

        this.commands = cmds;

        
        let embed =     new MessageEmbed()
                            .addField(
                                "This bot",
                                "This is Adminbot, it helps administrators carry out their duties " + 
                                "as well as provide functionality to the server itself.",
                                false
                            )
                            .setColor("#FF0000")
                            .setFooter(`${name} | v${version}`)
                            .setTitle('Help');

        let counter = 1;
        
        for(let cmd of this.commands)
        {   
            embed.addField(
                `${prefix}${cmd.metadata.usage}`,
                `\`${cmd.metadata.description}\``, 
                false
            );
            counter++;
            if(counter == 15)
            {
                counter = 0;
                this.helpPages.push(embed);
                embed = new MessageEmbed()
                        .setColor("#FF0000")
                        .setFooter(`${name} | ${version}`)
                        .setTitle('Help');
            }
        }

        if(counter != 0)
        {
            this.helpPages.push(embed);
        }

        for(let cmd of this.commands)
        {
            let embed       = new MessageEmbed()
                            .setTitle(`${cmd.metadata.name} Command`)
                            .setFooter(`${name} | v${version}`)
                            .addFields([
                                {
                                    name: "Usage",
                                    value: cmd.metadata.usage,
                                    inline: true
                                },
                                {
                                    name: "Description",
                                    value: cmd.metadata.description,
                                    inline: true
                                },
                                {
                                    name: "Module",
                                    value: cmd.metadata.module,
                                    inline: true
                                },
                                {
                                    name: "Aliases",
                                    value: cmd.command.join(', '),
                                    inline: false
                                }
                            ]);
            this.embeds.push({
                commands: cmd.command,
                embed: embed
            });

        }
    }

    public async run(command: string, msg: Message, bot: Client) : Promise<void> 
    {
        if(command.length == 0)
        {
            if(this.helpPages.length > 1)
            {
                try {
                    const sent  = await msg.channel.send(this.helpPages[0]);
                    await embedPager(sent, this.helpPages, 0, 300);
                } catch(err)
                {
                    console.error(err);
                }
            } else 
            {
                await msg.channel.send(this.helpPages[0]).catch(console.error);
            }
        } else 
        {
            const embed = this.embeds.find(cmd => (cmd.commands.find(elem => elem === command) != undefined));
            if(embed)
            {
                await msg.channel.send(embed).catch(console.error);
            } else 
            {
                await msg.channel.send(`Cannot find command ${command}`).catch(console.error);
            }
        }
    }
    public command = ["help", "h"];
    public metadata =  {
        name: "Help",
        usage: "help <optional | command>",
        description: "Lists available commands or elaborates on one",
        module: "Utility"
    }
};