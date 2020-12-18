import {Command}                from './../../command';
import {Client, Message}        from 'discord.js';
import {languages}              from './LanguagesSub'
export class CodeCommand implements Command {
    public async run(command: string, msg: Message, bot: Client) : Promise<void>
    {
        let arr = command.split(' ');
        switch(arr[0])
        {
            case 'languages': await languages(msg, bot); break;
        }
    }
    public command = ['code', 'godbolt'];
    metadata = {
        name: 'Code',
        description: 'Uses https://godbolt.org to compile and run codeblocks',
        usage: 'code <options> <codeblock>',
        module: 'Coding'
    }
}