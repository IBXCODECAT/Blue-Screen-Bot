import { Client } from 'discord.js';
import { API } from './API/api'
import { config } from 'dotenv';

config();

const discordClient = new Client({
    intents: []
});

//Discord(discordClient)
API()