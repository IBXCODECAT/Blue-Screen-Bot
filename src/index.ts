import { Client, IntentsBitField } from 'discord.js';
import { config } from 'dotenv';
import { Discord } from './Discord/discord'

config();

const discordClient = new Client({
    intents: [
        IntentsBitField.Flags.GuildMembers
    ] 
});

Discord(discordClient)