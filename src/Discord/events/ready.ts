import { ActivityType, Client } from 'discord.js';
import { DeleteInteractions, PostInteractions } from '../interactions/handler';


export = {
    name: 'ready',
    once: true,
    isasync: false,

    execute(client: Client)
    {
        console.log(`Discord Client [${client.application?.id}] is ready!`);
        
        PostInteractions(client); //Call this functiomn to register all slash commands
        //DeleteInteractions(client); //Call this function to delete all global commands

        client.user?.setActivity(`${client.guilds.cache.size} servers!`, ({type: ActivityType.Watching }))
    }
}