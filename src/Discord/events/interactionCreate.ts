import { Client, Interaction } from "discord.js";
import { HandleInteraction } from "../interactions/handler";

export = {
    name: 'interactionCreate',
    once: false,
    isasync: true,

    async execute(client: Client, interaction: Interaction)
    {
        HandleInteraction(client, interaction);
    }
}