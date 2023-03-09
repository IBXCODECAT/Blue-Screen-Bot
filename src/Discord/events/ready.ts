import { ActivityType, Client } from 'discord.js';
import { InteractionMetadataDelete, InteractionMetadataCreate, LinkedRoleMetadataCreate, LinkedRoleMetadataDelete } from '../metadata/metadaata';


export = {
    name: 'ready',
    once: true,
    isasync: false,

    execute(client: Client)
    {
        console.log(`Discord Client [${client.application?.id}] is ready!`);
        
        //InteractionMetadataCreate(client); //Call this functiomn to register all slash commands
        //InteractionMetadataDelete(client); //Call this function to remove all commands

        //LinkedRoleMetadataCreate(client); //Call this function to link all linked roles
        //LinkedRoleMetadataDelete(client); //Call this function to remove all linked roles

        client.user?.setActivity(`${client.guilds.cache.size} servers!`, ({type: ActivityType.Watching }))
    }
}