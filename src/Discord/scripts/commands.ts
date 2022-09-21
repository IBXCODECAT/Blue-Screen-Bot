import { Client, Interaction } from "discord.js";
import { FgCyan, FgGreen, FgRed, FgWhite, FgYellow } from "../../scripts/consoleFormatting";
import { CommandDefinition } from "../commands/interfaces/commandDefinition";
import { toErrorBlock } from "./messageFormatting";

import { GetDiscordCommandDefinitions, GetDiscordProcedureFiles, ModuleFileExtension } from "../../scripts/filesystem";


const commandDefs: Array<CommandDefinition> = GetDiscordCommandDefinitions();
const procedures = GetDiscordProcedureFiles();

export async function RegisterCommands(client: Client)
{
    //Leave guildID empty to register commands across all servers (this process can take about 2 hours)
    const guildID = ''; //BSS = 888875214459535360 | Staff = 913885055598886922
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
    for(const command of commandDefs)
    {
        await commands?.create({
            name: command.name,
            description: command.description,
            options: command.options,
        })
    }
}

export async function HandleCommands(client: Client, interaction: Interaction)
{
    //Is our interaction a command? If it is not, return.
    if(!interaction.isCommand()) return;
    
    //Extract the command name from this interaction & define a variable to store this command's definiton in
    const { commandName: thisCommandName } = interaction;
    let thisCommandDefinition: CommandDefinition;
    let thisProcedurename: string = "noprocedure";

    //For each command definiton in our list of definitions...
    for(const command of commandDefs)
    {
        //If the command defintion name matches this command's name...
        if(command.name == thisCommandName)
        {
            //Set this command definiton to the command definition we found
            thisCommandDefinition = command;
            thisProcedurename = thisCommandDefinition?.procedure;
        }
    }
    
    //Does this command have a procedure in it's definition? If not, return
    if(thisProcedurename == undefined || thisProcedurename == null) return;

    //Find the procedure for this command
    const path = "./../commands/procedures/";
    const procedure = require(`${path}${thisProcedurename}`);

    //Run the procedure
    procedure.Run(client, interaction);
}