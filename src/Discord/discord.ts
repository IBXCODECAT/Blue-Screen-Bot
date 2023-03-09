//Import discord and dotenv components
import { Client } from 'discord.js';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as crypto from 'crypto';
import fetch from 'node-fetch';
import { fileExtension as moduleFileExtension } from '../scripts/filesystem';

//Configure dotenv
config();

//Instantiate the Discord Bot!
export function DiscordInit(discordClient: Client)
{
    discordClient.login(process.env.DISCORD_TOKEN);

    const eventFiles = fs.readdirSync(__dirname + "/events/").filter((file: string) => file.endsWith(moduleFileExtension));

    console.log(`Loading Discord Event files from ${__dirname}/events/`);
    console.log(eventFiles);

    for(const file of eventFiles)
    {
        const module: string = file.substring(0, file.length - 3);
        const event = require(`./events/${module}`);

        if(event.once)
        {
            discordClient.once(event.name, (...args) => event.execute(discordClient, ...args));
        }
        else
        {
            if(event.isasync) discordClient.on(event.name, async (...args) => await event.execute(discordClient, ...args));
            else discordClient.on(event.name, (...args) => event.execute(discordClient, ...args));
        }
    }
}