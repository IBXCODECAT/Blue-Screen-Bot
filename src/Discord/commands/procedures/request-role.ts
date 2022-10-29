import { Client, Interaction } from "discord.js";
import { GetDiscordCommandDefinitions } from "../../../scripts/filesystem";
import { CommandDefinition } from "../interfaces/commandDefinition";

export async function Run(client:Client, interaction: Interaction) {
    
    if(!interaction.isCommand()) return;

    const commands: Array<CommandDefinition> = GetDiscordCommandDefinitions();

    let role = interaction.options.get('role');

    let messageContent: string = `You are not eligable for this role.\n\n`;

    interaction.reply({
        content: messageContent,
        ephemeral: true
    })
}