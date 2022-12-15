import * as fs from 'fs';

import { ISlashCommand } from "../Discord/commands/interfaces/slashCommand";

//The extension to use when searching the file system (ts for ts-node, js for js-node)
export const ModuleFileExtension = '.ts';

//This is the path to the command definitions & procedures directories
const commandDefsPath = `${process.cwd()}/src/Discord/commands/definitions/`
const proceduresPath = `${process.cwd()}/src/Discord/commands/procedures/`

export function GetDiscordCommandDefinitions(): Array<ISlashCommand> {
  //Fetch a list of all command definitions in the command definitions directory
  const commandDefinitionFiles = fs.readdirSync(commandDefsPath).filter((file: string) => file.endsWith(ModuleFileExtension));

  //Create a new array to return with our command definitons
  var commandDefinitions: Array<ISlashCommand> = new Array<ISlashCommand>;

  //For each file in our command definition files...
  for (const file of commandDefinitionFiles) {
    const module: string = file.substring(0, file.length - 3);
    const m_command: ISlashCommand = require(`${commandDefsPath}${module}`);

    //Add the command definition onto the end of the array
    commandDefinitions.push(m_command);

    console.log(`FILESYSTEM: Loaded command definition: ${m_command.name}`);
  }

  return commandDefinitions;
}

export function GetDiscordProcedureFiles(): Array<string> {
  //Fetch a list of all command definitions in the command procedures directory
  const procedureFiles = fs.readdirSync(proceduresPath).filter((file: string) => file.endsWith(ModuleFileExtension));

  return procedureFiles;
}