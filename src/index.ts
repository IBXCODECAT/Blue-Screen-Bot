import { Client } from 'discord.js';
import { config } from 'dotenv';
import { Discord } from './Discord/discord'

config();

const discordClient = new Client({
    intents: []
});

Discord(discordClient)