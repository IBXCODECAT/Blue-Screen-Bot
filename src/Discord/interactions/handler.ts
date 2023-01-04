import { Client, Interaction, REST, Routes } from "discord.js";
import { GetMessageContextCommandDefinitions as GetContextCommandDefinitions, GetSlashCommandDefinitions } from "../../scripts/filesystem";
import { IMessageContextCommand as IContextCommand } from "./interfaces/contextCommand";
import { ISlashCommand } from "./interfaces/slashCommand";

const path = process.cwd();
const slashCommandDefs: Array<ISlashCommand> = GetSlashCommandDefinitions();
const contextCommandDefs: Array<IContextCommand> = GetContextCommandDefinitions();

const interactions: Array<any> = [slashCommandDefs, contextCommandDefs]

export async function DeleteInteractions(clinet: Client)
{
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);

    rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!), { body: [] })
        .then(() => console.log('Successfully deleted all application commands.'))
        .catch(console.error);
}

export async function PostInteractions(client: Client)
{
    let commands = client.application?.commands;

    let count = 1;

    for(const interactionGroup of interactions)
    {
        for(const interaction of interactionGroup)
        {
            /*await commands?.create({
                name: interaction.name,
                type: interaction.type,
                description: interaction.description || undefined,
                options: interaction.options || undefined
            });*/
        }
    }
}

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

        executablePath.Run(client, interaction);

    }

}