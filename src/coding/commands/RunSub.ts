/*
{
    "source": "int main () { return 1; }",
    "compiler": "g82",
    "options": {
        "userArguments": "-O3",
        "executeParameters": {
            "args": ["arg1", "arg2"],
            "stdin": "hello, world!"
        },
        "compilerOptions": {
            "executorRequest": true
        },
        "filters": {
            "execute": true
        },
        "tools": [],
        "libraries": [
            {"id": "openssl", "version": "111c"}
        ]
    },
    "lang": "c++",
    "allowStoreCodeDebug": true
}
*/
import {Message, Client} from 'discord.js';
export async function runCode(command: string, msg: Message, bot: Client) 
{
    let matches = command.match(/```[A-z]+\n(.*)```/s);
    if(matches)
    {

    } else 
    {
        await msg.channel.send('Append a codeblock!');
    }
}
