import {Command}            from './../../command';
import {Module}             from './../../module'
import {Message, Client}    from 'discord.js'


export class ConfigCommand implements Command 
{
    private modules: Module[] = [];

    constructor(modules: Module[])
    {
        this.modules = this.modules;
    }

    public async run(command: string, msg: Message, bot: Client) : Promise<void> 
    {
        const   array     = command.split(' ');
        const   moduleStr = array[0];
        let     module    = this.modules.find(module => module.name.toLocaleLowerCase() === module.name.toLowerCase());
        if(module !== undefined)
        {

        } else 
        {
            
        }
    }
    public command = ["config", "conf"];
    public metadata = {
        name: "Config",
        usage: "config <module> <options>",
        description: "Configures how the bot should operate on the current server",
        module: "Utility"
    };
};