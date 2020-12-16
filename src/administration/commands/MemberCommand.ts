import {Message, MessageEmbed, Client}      from 'discord.js'; 
import {Command}                            from './../../command';
import {member}                             from './../../util/resolver';

export class MemberCommand implements Command {
    public async run(command: string, msg: Message, bot: Client) : Promise<void> 
    {
        try {
            const mbr = await member(command, msg, bot);
        } catch 
        {
            await msg.channel.send(`Cannot find member ${command}`).catch(console.error);
        }
    }
    public command = ["member", "mem", "m"];
    public metadata = {
        name: "Member",
        usage: "member <member>",
        description: "Lists information on a server member",
        module: "Administration"
    };
};