import { ActivityType, Client } from 'discord.js'
import { DeleteCommands } from '../scripts/deleteCommands';
import { RegisterBSSCommands, RegisterCommands } from './../scripts/commands';

export = {
    name: 'ready',
    once: true,
    isasync: false,

    execute(client: Client)
    {
        console.log(`Discord Client [${client.application?.id}] is ready!`);
        
        //RegisterBSSCommands(client); //Call this functiomn to register all non-global commands!
        //RegisterCommands(client); //Call this function to register all global commands!
        DeleteCommands(); //Call this function to delete all global commands

        client.user?.setActivity(`${client.guilds.cache.size} servers!`, ({type: ActivityType.Watching }))
    }
}