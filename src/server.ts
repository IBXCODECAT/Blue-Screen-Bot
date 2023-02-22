import { Client, IntentsBitField } from 'discord.js';
import { config } from 'dotenv';
import { DiscordInit, getOAuthTokens, getOAuthUrl } from './Discord/discord'

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

/**
 * Route configured in the Discord developer console which facilitates the
 * connection between Discord and any additional services you may use. 
 * To start the flow, generate the OAuth2 consent dialog url for Discord, 
 * and redirect the user there.
 */
https.get('/role-links', async (req, res) => {
    const { url, state } = getOAuthUrl()

    // Store the signed state param in the user's cookies so we can verify
    // the value later. See: https://discord.com/developers/docs/topics/oauth2#state-and-security
    res.cookie('clientState', state, { maxAge: 1000 * 60 * 5, signed: true });

    // Send the user to the Discord owned OAuth2 authorization endpoint
    res.redirect(url);
});

/**
 * Route configured in the Discord developer console, the redirect Url to which
 * the user is sent after approving the bot for their Discord account. This
 * completes a few steps:
 * 1. Uses the code to acquire Discord OAuth2 tokens
 * 2. Uses the Discord Access Token to fetch the user profile
 * 3. Stores the OAuth2 Discord Tokens in Redis / Firestore
 * 4. Lets the user know it's all good and to go back to Discord
 */
https.get('/oauth2-callback', async (req, res) => {
    try {
        // 1. Uses the code and state to acquire Discord OAuth2 tokens
        const code = req.query['code']?.toString()!;
        const discordState = req.query['state'];
    
        // make sure the state parameter exists
        const { clientState } = req.signedCookies;
        if (clientState !== discordState) {
            console.error('State verification failed.');
            return res.sendStatus(403);
        }

        const tokens = await getOAuthTokens(code);
    
        // 2. Uses the Discord Access Token to fetch the user profile
        /*
        const meData = await discord.getUserData(tokens);
        const userId = meData.user.id;
        await storage.storeDiscordTokens(userId, {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_at: Date.now() + tokens.expires_in * 1000,
        });

        // 3. Update the users metadata, assuming future updates will be posted to the `/update-metadata` endpoint
        await updateMetadata(userId);
        */
        res.send('You did it!  Now go back to Discord.');
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
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
