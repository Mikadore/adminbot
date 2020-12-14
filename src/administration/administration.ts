import {Module}         from './../module';
import {BanCommand}     from './commands/BanCommand';
import { KickCommand } from './commands/KickCommand';
export class Administration implements Module {
    commands = [
        new BanCommand,
        new KickCommand
    ];
    name = "Administration";
};