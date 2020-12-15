import {Message, Client, MessageEmbed}      from 'discord.js';
import {Command}                            from './../../command';
import {name, version}                      from './../../bot';



export class HelpCommand implements Command {
    private commands: Command[];
    private embeds: {
        commands: string[],
        embed: MessageEmbed
    }[] = [];

    private helpPages: MessageEmbed[][] = [];

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
        
        let page: MessageEmbed[] = [];
        for(let cmd of this.commands)
        {   
            embed.addField(
                `${prefix}${cmd.metadata.usage}`,
                `\`${cmd.metadata.description}\``, 
                false
            );
            counter++;
            page.push(embed);

            if(counter == 25)
            {
                counter = 0;
                this.helpPages.push(page);
                page = [];
                embed = new MessageEmbed()
                        .setColor("#FF0000")
                        .setFooter(`${name} | ${version}`)
                        .setTitle('Help');
            }
        }

        if(counter != 0)
        {
            this.helpPages.push(page);
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
            try {
                let sent = await msg.channel.send(this.helpPages[0]);
                
                if(this.helpPages.length > 1)
                {
                    let collector = sent.createReactionCollector((reaction, user) => !user.bot, {
                        max: 300,
                    });

                    let currentIndex = 0;

                    await sent.react("➡️");

                    collector.on('collect', async (reaction, user) => {
                        if(reaction.emoji.name === "⬅️")
                        {
                            if(currentIndex > 0)
                            {
                                currentIndex--;
                            }
                            reaction.message.edit(this.helpPages[currentIndex]);
                        } else if (reaction.emoji.name === "➡️")
                        {
                            if(currentIndex < this.helpPages.length - 1)
                            {
                                currentIndex++;
                            }
                            reaction.message.edit(this.helpPages[currentIndex]);
                        }
                        await reaction.message.reactions.removeAll().catch(console.error);

                        if(currentIndex !== 0)
                            await reaction.message.react("⬅️").catch(console.error);
                        if(currentIndex !== this.helpPages.length - 1)
                            await reaction.message.react("➡️").catch(console.error);
                        
                    });

                    collector.on('end', async collected => {
                        await collector.message.reactions.removeAll().catch(console.error);
                    });
                }
            } catch(err)
            {
                await msg.channel.send("Error processing command").catch(console.error);
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