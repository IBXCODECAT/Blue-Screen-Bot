import { Client, Interaction } from "discord.js";
import { FgCyan, FgGreen, FgRed, FgWhite, FgYellow } from "./consoleFormatting";
import * as fs from 'fs';
import { CommandDefinition } from "../commands/interfaces/commandDefinition";
import { toErrorBlock } from "./messageFormatting";

//The extension to use when searching the file system (ts for ts-node, js for js-node)
const fileExtension = '.ts';

//This is the path to the command definitions & procedures directories
const commandDefsPath = './../commands/definitions/'
const proceduresPath = './../commands/procedures/'

//Fetch a list of all command definitions in our command definitions directory
const commandDefs = fs.readdirSync(__dirname + commandDefsPath).filter((file: string) => file.endsWith(fileExtension));
const procedures = fs.readdirSync(__dirname + proceduresPath).filter((file: string) => file.endsWith(fileExtension));

export async function RegisterCommands(client: Client)
{
    //Leave guildID empty to register commands across all servers (this process can take about 2 hours)
    const guildID = '913885055598886922'; //BSS = 888875214459535360 | Staff = 913885055598886922
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
        //Otherwise we will register them globally across all servers (this process can take about 2 hours)
        commands = client.application?.commands;
    }

    //For each command file, load the module and create the commands using the propreties defined in the command definition
    for(const file of commandDefs)
    {
        const module: string = file.substring(0, file.length - 3);
        const m_command: CommandDefinition = require(`${commandDefsPath}${module}`);

        console.log(FgCyan + `Loaded command module: ${m_command.name}` + FgWhite);
        
        console.log(m_command);

        await commands?.create({
            name: m_command.name,
            description: m_command.description,
            options: m_command.options,
        })
    }

    console.log(FgGreen + "Commands registered!");
}

export async function HandleCommands(client: Client, interaction: Interaction)
{
    //Is our interaction a command?
    if(interaction.isCommand())
    {
        const { commandName } = interaction;
        console.log("COMMAND NAME: " + commandName);
        const commandDefPath = `${commandDefsPath}${commandName}`;

        const m_command: CommandDefinition = require(commandDefPath);
        
        console.log(`${FgYellow}Running command at path: ${FgCyan}${commandDefPath}${FgYellow} using procedure ${FgCyan}${m_command.procedure}${FgWhite}`);

        const procedureName = m_command.procedure;
        
        //Does this command have a procedure in it's definition? If not, attempt to reply with an error and return...
        if(procedureName == undefined || procedureName == null)
        {
            try
            {
                interaction.reply({
                    content: toErrorBlock("No procedure was found in the command definition!"),
                    ephemeral: true
                })
            }
            catch {} finally { return; }
        }

        //Do we have procedure definiton for this command? If not, attempt to reply with an error and return...
        if(!procedures.includes(`${procedureName}${fileExtension}`))
        {
            try
            {
                interaction.reply({
                    content: toErrorBlock("No matching procedure could be found for this command!"),
                    ephemeral: true
                })
            }
            catch { logCommandInteractionFailed() } finally { return; }
        }

        //Now we can start loading the procedure and executing it...

        const procedureDefPath = `${proceduresPath}${procedureName}`;
        console.log(procedureDefPath);

        const procedure = require(procedureDefPath);

        try
        {
            await procedure.Run(client, interaction);
        } catch { logCommandInteractionFailed() }
    }

    //========================================================================
    
    function logCommandInteractionFailed()
    {
        console.log(`${FgRed}Command Interaction Response Failed!${FgWhite}`);
    }
}