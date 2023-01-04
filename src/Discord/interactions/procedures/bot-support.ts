import { Client, Interaction } from "discord.js";
import { GetSlashCommandDefinitions } from "../../../scripts/filesystem";
import { GET } from "../../scripts/webrequest";
import { ISlashCommand } from "../interfaces/slashCommand";

export async function Run(client:Client, interaction: Interaction) {
    
    if(!interaction.isCommand()) return;

    const commands: Array<ISlashCommand> = GetSlashCommandDefinitions();

    let messageContent: string = "Here is the link to the bot support server:\n\n";

    if(!interaction.replied)
    {    
        await interaction.deferReply({
            ephemeral: true
        });
    }

    const data = await GET("https://discord.com/api/guilds/888875214459535360/widget.json");

    messageContent += JSON.parse(data).instant_invite;

    interaction.editReply({
        content: messageContent
    })
}