import {Command}    from './command';
import {Bot}        from './bot';  

export interface Module {
    register(bot: Bot) : void;
    init?: (bot: Bot) => Promise<void>
    name: string
}