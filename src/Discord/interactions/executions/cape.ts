import { ActionRow, ActionRowBuilder, BaseSelectMenuBuilder, Client, Interaction, ModalActionRowComponentBuilder, ModalBuilder, SelectMenuBuilder, SelectMenuOptionBuilder, StringSelectMenuBuilder, StringSelectMenuComponent, TextInputBuilder, TextInputComponent, TextInputStyle } from "discord.js";
import { LoginWithPlayfab } from "../../../PlayFab/playfab";
import { toBold } from "../../scripts/messageFormatting";
import cape = require("../definitions/cape");
import { ISlashCommand } from "../interfaces/slashCommand";

export async function Run(client:Client, interaction: Interaction) {
    
    if(interaction.isChatInputCommand())
    {
        const modal = new ModalBuilder();

        const capeField = new TextInputBuilder();
        const usernameField = new TextInputBuilder();
        const passwordField = new TextInputBuilder();
        
        const actionRow0 = new ActionRowBuilder<ModalActionRowComponentBuilder>();
        const actionRow1 = new ActionRowBuilder<ModalActionRowComponentBuilder>();
        const actionRow2 = new ActionRowBuilder<ModalActionRowComponentBuilder>();

        modal.setCustomId("cape-modal").setTitle(`Log in to your account.`);

        capeField.setCustomId('cape');
        capeField.setLabel("Selected Cape");
        capeField.setRequired(true);
        capeField.setStyle(TextInputStyle.Short);
        capeField.setPlaceholder("Discord Member Cape | Early Member Cape");
        capeField.setValue(interaction.options.getString('cape', true));

        usernameField.setCustomId("username");
        usernameField.setLabel("Username");
        usernameField.setRequired(true);
        usernameField.setStyle(TextInputStyle.Short);
        usernameField.setPlaceholder("Username");
        usernameField.setMaxLength(50);

        passwordField.setCustomId("password");
        passwordField.setLabel("Password");
        passwordField.setRequired(true);
        passwordField.setStyle(TextInputStyle.Short);
        passwordField.setPlaceholder("**********");
        passwordField.setMinLength(8);
        passwordField.setMaxLength(200);


        actionRow0.setComponents(capeField);
        actionRow1.setComponents(usernameField);
        actionRow2.setComponents(passwordField);

        modal.addComponents(actionRow0, actionRow1, actionRow2);

        await interaction.showModal(modal);
    }

    if(interaction.isModalSubmit())
    {
        await interaction.deferReply({
            ephemeral: true
        });

        const username = interaction.fields.getTextInputValue('username');
        const password = interaction.fields.getTextInputValue('password');

        await LoginWithPlayfab(username, password);

        await interaction.editReply({
            content: "Your report was sent to the moderators.",
        });

        console.log(interaction.fields.getTextInputValue("extra_details"));
    }
}