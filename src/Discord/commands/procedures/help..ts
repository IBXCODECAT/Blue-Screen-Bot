import { Client, Interaction } from "discord.js";

export async function execute(client:Client, interaction: Interaction) {
    
    if(!interaction.isCommand()) return;

    interaction.reply({
        content: "Not yet implemented",
        ephemeral: true
    })
}