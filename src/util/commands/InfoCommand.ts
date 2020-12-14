import {Message, Client, MessageEmbed, EmbedField} from 'discord.js';
import {Command} from './../../command';
import {user} from './../resolver'

export class InfoCommand implements Command {
    public async run(command: string, msg: Message, bot: Client) : Promise<void> 
    {
        try {
            let usr = await user(command, msg, bot);

            let infoEmbed = new MessageEmbed()
                .addFields([
                    {name: "ID", value: usr.id}
                ]);
            
            msg.channel.send(infoEmbed).catch(err => console.error);

        } catch {
            msg.channel.send(`Cannot find user '${command}'`).catch(err => console.error(err));
        }
    }

    public command = "info";
    
    public metadata = {
        name: "Info",
        usage: "info <user>",
        description: "Gathers information of a Discord user",
        module: "Utility"
    };
};