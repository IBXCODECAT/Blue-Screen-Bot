import { Client } from 'discord.js'
import { DeleteCommands } from '../scripts/deleteCommands';
import { RegisterCommands } from './../scripts/commands';

export = {
    name: 'ready',
    once: true,
    isasync: false,

    execute(client: Client)
    {
        console.log(`Discord Client [${client.application?.id}] is ready!`);
        
        //RegisterCommands(client); //Call this function to register all global commands!
        //DeleteCommands(); //Call this function to delete all global commands
    }
}