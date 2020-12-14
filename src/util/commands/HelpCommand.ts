import {Message, Client, MessageEmbed}      from 'discord.js';
import {Command}                            from './../../command';
import {name, version}                      from './../../bot';



export class HelpCommand implements Command {
    private commands: Command[];
    private embeds: {
        commands: string[],
        embed: MessageEmbed
    }[] = [];

    constructor(cmds: Command[])
    {
        cmds.push(this);
        this.commands = cmds;
        
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

        } else 
        {
            const embed = this.embeds.find(cmd => (cmd.commands.find(elem => elem === command) != undefined));
            if(embed)
            {
                msg.channel.send(embed).catch(err => console.error(err));
            } else 
            {
                msg.channel.send(`Cannot find command '${command}'`).catch(err => console.error(err));
            }
        }
    }
    public command = ["help", "h"];
    public metadata =  {
        name: "Help",
        usage: "help <optional | command>",
        description: "Lists available commands and provides a short description of the bot or shows information about querried command",
        module: "Utility"
    }
};