import {Command} from './../../command';
import {Client, Message}        from 'discord.js';

export class CommitCommand implements Command {
    public async run(command: string, msg: Message, bot: Client) : Promise<void>
    {
        let hash = process.env.COMMIT;
        await msg.channel.send(`The current commit hash is ${hash}`).catch(console.error);
    }
    public command = ['commit'];
    metadata = {
        name: 'Code',
        description: 'Shows the curent commit hash',
        usage: 'commit',
        module: 'Utility'
    }
}
