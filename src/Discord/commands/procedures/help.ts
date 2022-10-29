import { Client, Interaction } from "discord.js";
import { GetDiscordCommandDefinitions } from "../../../scripts/filesystem";
import { CommandDefinition } from "../interfaces/commandDefinition";

export async function Run(client:Client, interaction: Interaction) {
    
    if(!interaction.isCommand()) return;

    const commands: Array<CommandDefinition> = GetDiscordCommandDefinitions();

    let messageContent: string = "Here is a list of commands:\n\n";
    
    commands.forEach( (command) => {
        if(command.global)
        {
            messageContent += `</${command.name}:0> - ${command.description}\n`;
        }
        else
        {
            if(interaction.guild?.id == process.env.BSS_GUILD)
            {
                messageContent += `</${command.name}:0> - (This server only) - ${command.description}\n`;
            }
        }
    })

    interaction.reply({
        content: messageContent,
        ephemeral: true
    })
}