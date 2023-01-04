import { InteractionType } from 'discord.js';
import * as fs from 'fs';
import { IMessageContextCommand } from '../Discord/interactions/interfaces/contextCommand';

import { ISlashCommand } from "../Discord/interactions/interfaces/slashCommand";

//The extension to use when searching the file system (ts for ts-node, js for js-node)
export const ModuleFileExtension = '.ts';

//This is the path to the command definitions & procedures directories
const commandDefsPath = `${process.cwd()}/src/Discord/interactions/definitions/`
const proceduresPath = `${process.cwd()}/src/Discord/interactions/procedures/`

export function GetSlashCommandDefinitions(): Array<ISlashCommand> {
  //Fetch a list of all command definitions in the command definitions directory
  const commandDefinitionFiles = fs.readdirSync(commandDefsPath).filter((file: string) => file.endsWith(ModuleFileExtension));

  //Create a new array to return with our command definitons
  let commandDefinitions: Array<ISlashCommand> = new Array<ISlashCommand>;

  //For each file in our command definition files...
  for (const file of commandDefinitionFiles) {
    const module: string = file.substring(0, file.length - 3);
    const m_command: ISlashCommand = require(`${commandDefsPath}${module}`);

    //Is this command a slash command?
    if(m_command.type == InteractionType.Ping)
    {
      //Add the command definition onto the end of the array
      commandDefinitions.push(m_command);
      console.log(`FILESYSTEM: Loaded slash command definition: ${m_command.name}`);
    }
  }

  return commandDefinitions;
}

export function GetMessageContextCommandDefinitions(): Array<IMessageContextCommand> {
  //Fetch a list of all command definitions in the command definitions directory
  const commandDefinitionFiles = fs.readdirSync(commandDefsPath).filter((file: string) => file.endsWith(ModuleFileExtension));

  //Create a new array to return with our command definitons
  let commandDefinitions: Array<IMessageContextCommand> = new Array<IMessageContextCommand>;

  //For each file in our command definition files...
  for (const file of commandDefinitionFiles) {
    const module: string = file.substring(0, file.length - 3);
    const m_command: IMessageContextCommand = require(`${commandDefsPath}${module}`);

    //Is this commmand a message context command?
    if(m_command.type == InteractionType.MessageComponent)
    {
      //Add the command definition onto the end of the array
      commandDefinitions.push(m_command);
      console.log(`FILESYSTEM: Loaded context command definition: ${m_command.name}`);
    }
  }

  return commandDefinitions;
}

export function GetDiscordProcedureFiles(): Array<string> {
  //Fetch a list of all command definitions in the command procedures directory
  const procedureFiles = fs.readdirSync(proceduresPath).filter((file: string) => file.endsWith(ModuleFileExtension));

  return procedureFiles;
}