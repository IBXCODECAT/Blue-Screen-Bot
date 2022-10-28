import { Client, Interaction } from "discord.js";
import { GetDiscordCommandDefinitions } from "../../../scripts/filesystem";
import { CommandDefinition } from "../interfaces/commandDefinition";

export async function Run(client:Client, interaction: Interaction) {
    
    if(!interaction.isCommand()) return;

    const commands: Array<CommandDefinition> = GetDiscordCommandDefinitions();

    let messageContent: string = "Here is a list of commands:\n\n";
    
    commands.forEach( (command) => {
        messageContent += `</${command.name}:0> - ${command.description}\n`;
    })

    interaction.reply({
        content: messageContent,
        ephemeral: true
    })
}