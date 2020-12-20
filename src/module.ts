import {Command}    from './command';
import {Bot}        from './bot';  

export interface Module {
    register(bot: Bot) : void;
    name: string
}