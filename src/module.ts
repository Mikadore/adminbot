import {Command} from './command';

export interface Module {
    commands: Command[];
    name: string;
}