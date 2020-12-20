import {Command}                from './../../command';
import {Client, Message}        from 'discord.js';
import {showLanguages}          from './LanguagesSub'
import {showCompilers}          from './CompilersSub';

export class CodeCommand implements Command {
    public async run(command: string, msg: Message, bot: Client) : Promise<void>
    {
        let arr = command.split(' ');
        try {
            switch(arr[0])
            {
                case 'compilers': {
                    if(arr[1] !== undefined)
                    {
                        await showCompilers(arr[1], msg, bot);
                    } else 
                    {
                        await msg.channel.send('Invalid usage; use `code compilers <language>`').catch(console.error);
                    }
                    break;
                }
                case 'languages': { 
                    await showLanguages(msg, bot); 
                    break;
                }
                case '': {
                    await msg.channel.send('Invalid usage, use \`help code\` to see the usage of this command');
                    break;
                }
                default: {
                    await msg.channel.send(`<options> must be one of [languages, compilers]`).catch(console.error);
                    break;
                }
            }
        } catch {
            await msg.channel.send('An error occured.').catch(console.error);
        }
    }
    public command = ['code', 'godbolt'];
    metadata = {
        name: 'Code',
        description: 'Uses https://godbolt.org to compile and run codeblocks',
        usage: 'code <options> <optional | codeblock>',
        module: 'Coding'
    }
}