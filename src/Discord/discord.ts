
//Import discord and dotenv components
import { Client } from 'discord.js';
import { config } from 'dotenv';
import * as fs from 'fs';

//Configure dotenv
config();

export function Discord()
{
    const discordClient = new Client({
        intents: []
    });

    discordClient.login(process.env.DISCORD_TOKEN);

    const eventFiles = fs.readdirSync(__dirname + "/events/").filter((file: string) => file.endsWith('.ts'));

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