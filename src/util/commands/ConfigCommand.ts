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

    }
    public command = ["config", "conf"];
    public metadata = {
        name: "Config",
        usage: "config <module> <options>",
        description: "Configures how the bot should operatoe on the current server",
        module: "Utility"
    };
};