import {Command}    from './command';
import {Bot}        from './bot';  
import {Config}     from './config'

export interface Module {
    register(bot: Bot) : void;
    name: string
    config: Config;
}