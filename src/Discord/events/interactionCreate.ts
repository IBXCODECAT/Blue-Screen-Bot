import { Client, Interaction } from "discord.js";
import { HandleInteractions } from "../scripts/commands";
//import { HandleCommands } from "../components/commands";

export = {
    name: 'interactionCreate',
    once: false,
    isasync: true,

    async execute(client: Client, interaction: Interaction)
    {
        HandleInteractions(client, interaction);
    }
}