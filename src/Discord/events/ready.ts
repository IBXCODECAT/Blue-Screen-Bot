import { ActivityType, Client } from 'discord.js'
import { DeleteCommands } from '../scripts/deleteCommands';
import { RegisterSlashCommands } from './../scripts/commands';

export = {
    name: 'ready',
    once: true,
    isasync: false,

    execute(client: Client)
    {
        console.log(`Discord Client [${client.application?.id}] is ready!`);
        
        //RegisterSlashCommands(client); //Call this functiomn to register all slash commands
        //DeleteCommands(); //Call this function to delete all global commands

        client.user?.setActivity(`${client.guilds.cache.size} servers!`, ({type: ActivityType.Watching }))
    }
}