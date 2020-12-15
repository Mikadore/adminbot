import {Client} from 'discord.js';
import {Module} from './module';
import {Command} from './command';

export const version  = "1.0.0";
export const name     = "adminbot";

export class Bot 
{
    private bot:        Client;
    private token:      string;

    public  prefix:     string;
    public  commands:   Command[] = []; 

    constructor(token: string, prefix: string)
    {
        this.bot    = new Client;
        this.token  = token;
        this.prefix = prefix;
    }

    public registerModule(module : Module) 
    {
        module.register(this);
    }

    public run()
    {   
        console.log("Starting...");
        this.bot.on('ready', () => {
            this.bot.user?.setPresence({
                status: "online",
                afk: false,
                activity: {
                    type: "PLAYING",
                    name: `${this.prefix}help`
                }
            }).catch(console.error);
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

                    const cmd = this.commands.find(cmd => (cmd.command.find(elem => elem === command_str) != undefined));

                    if(cmd === undefined)
                    {
                        await msg.reply(`Unknown command '${command_str}'! Use '${this.prefix}help' to see the usage of this bot`).catch(console.error);
                    } else 
                    {
                        let content = array.slice(1).join(' ');
                        //SHAN'T throw
                        await cmd.run(content.trim(), msg, this.bot).catch(console.error);
                    }
                }
            }
        });
        this.bot.login(this.token);
    }
};