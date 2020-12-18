import *            as https    from 'https';
import {Command}                from './../../command';
import {Client, Message}        from 'discord.js';

export class CodeCommand implements Command {
    public async run(command: string, msg: Message, bot: Client) : Promise<void>
    {

    }
    public command = ['code', 'godbolt'];
    metadata = {
        name: 'Code',
        description: 'Uses https://godbolt.org to compile and run codeblocks',
        usage: 'code <options> <codeblock>',
        module: 'Coding'
    }
}