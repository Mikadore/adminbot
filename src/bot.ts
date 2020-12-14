import {Client} from 'discord.js';
import {Module} from './module';
import {Command} from './command';
export class Bot 
{
    private bot: Client;
    private prefix: string;
    private token: string;
    private commands: Command[] = []; 

    constructor(token: string, prefix: string)
    {
        this.bot    = new Client;
        this.token  = token;
        this.prefix = prefix;
    }

    public registerModule(module : Module) 
    {
        for(let command of module.commands)
        {
            this.commands.push(command);
        }
    }

    public run()
    {   
        this.bot.on('ready', () => {
            console.log(`Started the bot and logged in as ${this.bot.user?.tag}`);
        });
        this.bot.on('message', async msg => {
            if(msg.author.bot) return;
            if(msg.guild !== null)
            {
                if(msg.content.startsWith(this.prefix))
                {
                    let array = msg.content.split(' ');
                    let command_str = array[0].substring(this.prefix.length);

                    const command = this.commands.find(cmd => cmd.command == command_str);

                    if(command === undefined)
                    {
                        msg.reply(`Unknown command '${command_str}'! Use '${this.prefix}help' to see the usage of this bot`).catch(err => console.error(err));
                    } else 
                    {
                        let content = array.slice(1).join(' ');
                        await command.run(content.trim(), msg, this.bot);
                    }
                }
            }
        });
        this.bot.login(this.token);
    }
};