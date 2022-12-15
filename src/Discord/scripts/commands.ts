import { Client, Interaction } from "discord.js";
import { FgCyan, FgGreen, FgRed, FgWhite, FgYellow } from "../../scripts/consoleFormatting";
import { ISlashCommand } from "../commands/interfaces/slashCommand";
import { toErrorBlock } from "./messageFormatting";

import { GetDiscordCommandDefinitions, GetDiscordProcedureFiles, ModuleFileExtension } from "../../scripts/filesystem";
import { IMessageContextCommand as IContextCommand } from "../commands/interfaces/messageContextCommand";


const commandDefs: Array<ISlashCommand> = GetDiscordCommandDefinitions();
const procedures = GetDiscordProcedureFiles();

export async function RegisterBSSCommands(client: Client) 
{
    //Leave guildID empty to register commands across all servers (this process can take about 2 hours)
    const guildID = '888875214459535360'; //BSS = 888875214459535360 | Staff = 913885055598886922
    const guild = client.guilds.cache.get(guildID); //Get the guild to register our commands in from our clients cache of joined guilds
    let commands; //Create our commands object to hold our command data

    //Do we have a guild specified?
    if(guild) 
    {
        //If so let's register the commands in there
        commands = guild.commands;
        console.log(`Registering Commands in the ${guild?.name} GUILD!`);
    }
    else
    {
        console.log("No GUILD was specified to register BSS commands in");
    }

    //For each command file, load the module and create the commands using the propreties defined in the command definition
    for(const command of commandDefs)
    {
        console.log("Creating Command: " + command.name);
        
        if(!command.global)
        {
            await commands?.create({
                name: command.name,
                description: command.description,
                options: command.options,
            });
        }
    }
}

export async function RegisterCommands(client: Client)
{
    //Leave guildID empty to register commands across all servers (this process can take about 2 hours)
    const guildID = process.env.DEV_SERVER_ID!.toString(); //BSS = 888875214459535360 | Staff = 913885055598886922
    const guild = client.guilds.cache.get(guildID); //Get the guild to register our commands in from our clients cache of joined guilds
    let commands; //Create our commands object to hold our command data

    //Do we have a guild specified?
    if(guild) 
    {
        //If so let's register the commands in there
        commands = guild.commands;
        console.log(FgYellow + `Registering Commands in the ${guild?.name} GUILD!`);
    } 
    else
    {
        console.log("==========================");
        //Otherwise we will register them globally across all servers (this process can take about 2 hours)
        commands = client.application?.commands;
    }

    //For each command file, load the module and create the commands using the propreties defined in the command definition
    for(const command of commandDefs)
    {   
        if(command.global)
        {
            await commands?.create({
                name: command.name,
                type: command.type,
                description: command.description || undefined,
                options: command.options || undefined
            });

            console.log(`Created ${command.name}`)
        }
    }
}

export async function HandleInteractions(client: Client, interaction: Interaction)
{
    //Is our interaction a command varient? If it is not, return.
    if(!interaction.isCommand() && !interaction.isContextMenuCommand()) return;
    
    let executionProcedure: string = "";

    if(interaction.isCommand())
    {
        //Extract the command name from this interaction & define a variable to store this command's definiton in
        const { commandName: thisCommandName } = interaction;
        let thisCommandDefinition: ISlashCommand;


        //For each slash command definiton in our list of definitions...
        for(const command of commandDefs)
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

    if(interaction.isContextMenuCommand())
    {
        const { commandName: thisCommandName } = interaction;
        let thisCommandDefinition: IContextCommand;
    }

    //Find the procedure for this command interaction
    const path = "./../commands/procedures/";
    const procedure = require(`${path}${executionProcedure}`);

    //Run the procedure
    procedure.Run(client, interaction);
}