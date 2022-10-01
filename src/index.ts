import { Client } from 'discord.js';

import { Discord } from './Discord/discord'
import { API } from './API/api'

const discordClient = new Client({
    intents: []
});

//Discord(discordClient)
API()