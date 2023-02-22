import { ActionRow, ActionRowBuilder, Client, escapeHeading, Interaction, ModalActionRowComponentBuilder, ModalBuilder, ModalSubmitFields, TextChannel, TextInputBuilder, TextInputStyle } from "discord.js";
import { TextChange } from "typescript";
import { GetSlashCommandDefinitions } from "../../../scripts/filesystem";
import { toBold } from "../../scripts/messageFormatting";
import { ISlashCommand } from "../interfaces/slashCommand";

export async function Run(client:Client, interaction: Interaction) {
    
    if(interaction.isMessageContextMenuCommand())
    {
        await interaction.deferReply({
            ephemeral: true
        });
        
        const channel = await client.channels.fetch("1036100327864287284");
        (channel as TextChannel).send(`
        \r${toBold("New Message report")}
        \rReporter: ${interaction.user}
        \rLink: ${interaction.targetMessage.url}`);

        await interaction.editReply({
            content: "Your report was sent to the moderators.",
        });
    }    
}