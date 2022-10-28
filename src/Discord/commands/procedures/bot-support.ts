import { Client, Interaction } from "discord.js";
import { GetDiscordCommandDefinitions } from "../../../scripts/filesystem";
import { GET } from "../../scripts/webrequest";
import { CommandDefinition } from "../interfaces/commandDefinition";

export async function Run(client:Client, interaction: Interaction) {
    
    if(!interaction.isCommand()) return;

    const commands: Array<CommandDefinition> = GetDiscordCommandDefinitions();

    let messageContent: string = "Here is the link to the bot support server:\n\n";

    const data = await GET("https://discord.com/api/guilds/888875214459535360/widget.json");

    messageContent += JSON.parse(data).instant_invite;

    interaction.reply({
        content: messageContent,
        ephemeral: true
    })
}