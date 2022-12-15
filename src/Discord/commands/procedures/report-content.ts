import { ActionRow, ActionRowBuilder, Client, escapeHeading, Interaction, ModalActionRowComponentBuilder, ModalBuilder, ModalSubmitFields, TextChannel, TextInputBuilder, TextInputStyle } from "discord.js";
import { TextChange } from "typescript";
import { GetSlashCommandDefinitions } from "../../../scripts/filesystem";
import { toBold } from "../../scripts/messageFormatting";
import { ISlashCommand } from "../interfaces/slashCommand";

export async function Run(client:Client, interaction: Interaction) {
    
    if(interaction.isMessageContextMenuCommand())
    {
        const modal = new ModalBuilder();

        const messageLink = new TextInputBuilder();
        const extraDetails = new TextInputBuilder();
        
        const actionRow1 = new ActionRowBuilder<ModalActionRowComponentBuilder>();
        const actionRow2 = new ActionRowBuilder<ModalActionRowComponentBuilder>();

        modal.setCustomId("report-content").setTitle(`Report ${interaction.targetMessage.author.username}?`);

        messageLink.setCustomId("link");
        messageLink.setLabel("Message Link");
        messageLink.setRequired(true);
        messageLink.setStyle(TextInputStyle.Short);
        messageLink.setValue(interaction.targetMessage.url);

        extraDetails.setCustomId("extra_details");
        extraDetails.setLabel("Additional Inforamtion (optional)");
        extraDetails.setRequired(false);
        extraDetails.setStyle(TextInputStyle.Paragraph);
        extraDetails.setPlaceholder("You can add any other useful information here");

        actionRow1.addComponents(messageLink);
        actionRow2.addComponents(extraDetails);

        modal.addComponents(actionRow1, actionRow2);

        await interaction.showModal(modal);
    }

    if(interaction.isModalSubmit())
    {
        await interaction.deferReply({
            ephemeral: true
        });

        const channel = await client.channels.fetch("1036100327864287284");
        (channel as TextChannel).send(`
        \r${toBold("New Message report")}
        \rReporter: ${interaction.user}
        \rLink: ${interaction.fields.getTextInputValue('link')}
        \rAdditional Information:${toBold(interaction.fields.getTextInputValue('extra_details'))}
        `);

        await interaction.editReply({
            content: "Your report was sent to the moderators.",
        });

        console.log(interaction.fields.getTextInputValue("extra_details"));
    }    
}