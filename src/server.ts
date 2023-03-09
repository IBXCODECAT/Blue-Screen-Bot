import { Client, IntentsBitField } from 'discord.js';
import { config } from 'dotenv';
import { DiscordInit } from './Discord/discord'

config();

import * as express from 'express';
import * as cookieParser from 'cookie-parser';


const https = express();
https.use(cookieParser(process.env.COOKIE_SECRET));


const port = process.env.PORT || 3000;
https.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

//A happy little route to show our server is up...
https.get('/', (req: any, res: any) => {
    res.send('Connected!👋');
});

const discordClient = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers
    ] 
});

//discordClient.on('debug', console.log);
discordClient.on('warn', console.log);

DiscordInit(discordClient)
