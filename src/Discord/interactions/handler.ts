import { Client, EmbedBuilder, Interaction, PermissionsBitField, REST, Routes } from "discord.js";
import { GetMessageContextCommandDefinitions as GetContextCommandDefinitions, GetSlashCommandDefinitions } from "../../scripts/filesystem";
import { CheckClientPermissions, PermissionCheck } from "../scripts/permissions";
import { IMessageContextCommand as IContextCommand } from "./interfaces/contextCommand";
import { ISlashCommand } from "./interfaces/slashCommand";

const path = process.cwd();
const slashCommandDefs: Array<ISlashCommand> = GetSlashCommandDefinitions();
const contextCommandDefs: Array<IContextCommand> = GetContextCommandDefinitions();

const interactions: Array<any> = [slashCommandDefs, contextCommandDefs]

export async function HandleInteraction(client: Client, interaction: Interaction)
{
    if(interaction.isCommand() || interaction.isMessageContextMenuCommand())
    {
        const { commandName: commandName } = interaction;
        let useDefinition: ISlashCommand | IContextCommand;
        let executablePath;

        for(const interactionGroup of interactions)
        {
            for(const interaction of interactionGroup)
            {
                if(interaction.name == commandName)
                {
                    useDefinition = interaction;
                    executablePath = require(`${path}\\src\\Discord\\interactions\\executions\\${useDefinition.executes}`);
                }
            }
        }

        if(CheckClientPermissions(client, interaction.guild))
        {
            executablePath.Run(client, interaction);
        }
        else
        {
            try
            {
                const embed = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle("Error | Permissions Required")
                    .setDescription("I require all of the following permissions to function properly. Please grant me all of the following permissions:")
                    .addFields(
                        { name: "MANAGE_SERVER", value: `${PermissionCheck(client, interaction.guild, PermissionsBitField.Flags.ManageGuild)}` },
                        { name: "MANAGE_WEBHOOKS", value: `${PermissionCheck(client, interaction.guild, PermissionsBitField.Flags.ManageWebhooks)}`},
                        { name: "SEND_MESSAGES", value: `${PermissionCheck(client, interaction.guild, PermissionsBitField.Flags.SendMessages)}`},
                        { name: "EMBED_LINKS", value: `${PermissionCheck(client, interaction.guild, PermissionsBitField.Flags.EmbedLinks)}`})
                await interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            }
            catch
            {
                console.log("No Permissions");
            }
        }
    }
}