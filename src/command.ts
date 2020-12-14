import {Message, Client} from 'discord.js';
export interface Command {
    run: (command:string, msg: Message, bot: Client) => Promise<void>,
    command: string[],
    metadata: {
        name: string,
        usage: string,
        description: string,
        module: string
    }
}