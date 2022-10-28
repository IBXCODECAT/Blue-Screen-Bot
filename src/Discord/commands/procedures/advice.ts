import { Client, Interaction } from "discord.js";
import { GetDiscordCommandDefinitions } from "../../../scripts/filesystem";
import { CommandDefinition } from "../interfaces/commandDefinition";
import { GET } from './../../scripts/webrequest';

export async function Run(client:Client, interaction: Interaction) {
    
    if(!interaction.isCommand()) return;

    const commands: Array<CommandDefinition> = GetDiscordCommandDefinitions();

    let messageContent: string = "Here is some advice:\n\n";
    
    if(!interaction.replied)
    {    
        await interaction.deferReply({
            ephemeral: true
        });
    }

    const data = await GET("https://api.adviceslip.com/advice");
    messageContent += `> ${JSON.parse(data).slip.advice}`;

    await interaction.editReply({
        content: messageContent
    });
}