const config = require('./config/config.json');
import {Bot} from './src/bot';
import {Administration} from './src/administration/administration'
import {Utility}        from './src/util/util';
const bot = new Bot(config.token, config.prefix);

bot.registerModule(new Administration);

//needs to go last to register all commands for `help`
bot.registerModule(new Utility);

bot.run();