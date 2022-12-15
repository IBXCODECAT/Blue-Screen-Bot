import { Client, Interaction } from "discord.js";
import { GetDiscordCommandDefinitions } from "../../../scripts/filesystem";
import { ISlashCommand } from "../interfaces/slashCommand";

export async function Run(client:Client, interaction: Interaction) {
    
    if(!interaction.isContextMenuCommand()) return;

    interaction.reply({
        content: "success",
        ephemeral: true
    })
}