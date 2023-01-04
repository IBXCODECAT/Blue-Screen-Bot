import { Client, Interaction, InteractionType } from "discord.js";
import { GetMessageContextCommandDefinitions, GetSlashCommandDefinitions } from "../../../scripts/filesystem";
import { ISlashCommand } from "../interfaces/slashCommand";
import { toBold, toUnderline } from "../../scripts/messageFormatting";
import { IMessageContextCommand } from "../interfaces/contextCommand";

export async function Run(client: Client, interaction: Interaction) {
    
    if(!interaction.isCommand() && !interaction.isContextMenuCommand()) return;

    const slashCOmmands: Array<ISlashCommand> = GetSlashCommandDefinitions();
    const contextCommands: Array<IMessageContextCommand> = GetMessageContextCommandDefinitions();
    let messageContent: string;

    messageContent = `\n${toBold("Here is a list of slash commands:")}\n`;
    
    slashCOmmands.forEach((command) => {
        messageContent += `</${command.name}:0> - ${command.description}\n`;
    });

    messageContent += `\n${toBold("Here is a list of context menu options (right click message):")}\n`;

    contextCommands.forEach((command) => {
        messageContent += `${toUnderline(command.name)} - ${command.helpMessageDescription}\n`;
    });

    interaction.reply({
        content: messageContent,
        ephemeral: true
    })
}