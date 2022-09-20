import { Client, Interaction } from "discord.js";
//import { HandleCommands } from "../components/commands";

export = {
    name: 'interactionCreate',
    once: false,
    isasync: true,

    async execute(client: Client, interaction: Interaction)
    {
        //await HandleCommands(client, interaction);
    }
}