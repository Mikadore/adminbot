import {Module}         from './../module';
import {InfoCommand}     from './commands/InfoCommand';
export class Utility implements Module {
    commands = [
        new InfoCommand,
    ];
    name = "Utility";
};