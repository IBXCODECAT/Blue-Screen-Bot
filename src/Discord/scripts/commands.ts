import { Client, Interaction, InteractionCollector } from "discord.js";
import { FgBlue, FgCyan, FgGreen, FgRed, FgWhite, FgYellow } from "../../scripts/consoleFormatting";
import { ISlashCommand } from "../commands/interfaces/slashCommand";
import { toErrorBlock } from "./messageFormatting";

import { GetSlashCommandDefinitions, GetDiscordProcedureFiles, ModuleFileExtension, GetMessageContextCommandDefinitions } from "../../scripts/filesystem";
import { IMessageContextCommand as IContextCommand, IMessageContextCommand } from "../commands/interfaces/messageContextCommand";

const slashCommandDefs: Array<ISlashCommand> = GetSlashCommandDefinitions();
const messageCommandDefs: Array<IMessageContextCommand> = GetMessageContextCommandDefinitions();

const procedures = GetDiscordProcedureFiles();

export async function RegisterSlashCommands(client: Client) 
{
    //Leave guildID empty to register commands across all servers (this process can take about 2 hours)
    const guildID = process.env.DEV_SERVER_ID!.toString(); //BSS = 888875214459535360 | Staff = 913885055598886922
    const guild = client.guilds.cache.get(guildID); //Get the guild to register our commands in from our clients cache of joined guilds
    
    let globalCommands;
    let localCommands; 

    globalCommands = client.application?.commands;
    localCommands = guild?.commands;

    //For each slash command definition file, load the module and register the commands
    for(const command of slashCommandDefs)
    {
        if(command.global)
        { 
            console.log(`${FgGreen}Creating global slash command: ${command.name}${FgWhite}`);

            await globalCommands?.create({
                name: command.name,
                type: command.type,
                description: command.description || undefined,
                options: command.options || undefined
            });
        }
        else
        {
            console.log(`${FgBlue}Creating local slash command: ${command.name}${FgWhite}`)

            await localCommands?.create({
                name: command.name,
                type: command.type,
                description: command.description || undefined,
                options: command.options || undefined
            });
        }
    }

    //Do the same thing as before, but this time for our message context commandds
    for(const command of messageCommandDefs)
    {
        if(command.global)
        { 
            console.log(`${FgGreen}Creating global message context command: ${command.name}${FgWhite}`);

            await globalCommands?.create({
                name: command.name,
                type: command.type
            });
        }
        else
        {
            console.log(`${FgBlue}Creating local message context command: ${command.name}${FgWhite}`)

            await localCommands?.create({
                name: command.name,
                type: command.type
            });
        }
    }
}


export async function HandleInteractions(client: Client, interaction: Interaction)
{
    let executionProcedure: string = "";

    if(interaction.isModalSubmit())
    {
        const executionProcedure = interaction.customId;

        //Find the procedure for this command interaction
        const path = "./../commands/procedures/";
        const procedure = require(`${path}${executionProcedure}`);

        //Run the procedure
        procedure.Run(client, interaction);
    }

    //Is our interaction a command varient? If it is not, return.
    if(!interaction.isCommand() && !interaction.isContextMenuCommand()) return;

    if(interaction.isCommand())
    {
        //Extract the command name from this interaction & define a variable to store this command's definiton in
        const { commandName: thisCommandName } = interaction;
        let thisCommandDefinition: ISlashCommand;


        //For each slash command definiton in our list of definitions...
        for(const command of slashCommandDefs)
        {
            //If the slash command defintion name matches this command's name...
            if(command.name == thisCommandName)
            {
                //Set this slash command definiton to the command definition we found
                thisCommandDefinition = command;
                executionProcedure = thisCommandDefinition?.procedure;
            }
        }

        //Does this command have a procedure in it's definition? If not, return
        if(executionProcedure == undefined || executionProcedure == null) return;
    }

    if(interaction.isMessageContextMenuCommand())
    {
        const { commandName: thisCommandName } = interaction;
        let thisCommandDefinition: IContextCommand;

        //For each slash command definiton in our list of definitions...
        for(const command of messageCommandDefs)
        {
            //If the slash command defintion name matches this command's name...
            if(command.name == thisCommandName)
            {
                //Set this slash command definiton to the command definition we found
                thisCommandDefinition = command;
                executionProcedure = thisCommandDefinition?.procedure;
            }
        }
    }

    //Find the procedure for this command interaction
    const path = "./../commands/procedures/";
    const procedure = require(`${path}${executionProcedure}`);

    //Run the procedure
    procedure.Run(client, interaction);
}