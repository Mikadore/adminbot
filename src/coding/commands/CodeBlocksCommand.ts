import {Command}            from './../../command';
import {Message, Client}    from 'discord.js';
export class CodeBlocksCommand implements Command {
    public async run(command: string, msg: Message, bot: Client) : Promise<void> 
    {
        await msg.channel.send(
            "Use code blocks to properly format your code!\n" +
            "Use 3 backtics '\\`' to indicate a code block:\n" +
            "\\`\\`\\`py\n" +
            "print(\"Hello World\")\n" +
            "\\`\\`\\`\n" +
            "Will format as: \n" +
            "```py\n" +
            "print(\"Hello World\")\n" +
            "```\n" +
            "For more information see https://highlightjs.org/static/demo/"
        ).catch(console.error);
    }
    public command = ["codeblocks", "code", "codeblock"];
    public metadata = {
        name: "Codeblocks",
        usage: "codeblocks",
        description: "Displays proper usage of codeblocks",
        module: "Coding"
    };
};