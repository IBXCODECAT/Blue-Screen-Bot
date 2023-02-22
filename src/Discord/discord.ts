//Import discord and dotenv components
import { Client } from 'discord.js';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { storeDiscordTokens } from '../storage';
import fetch from 'node-fetch';

//Configure dotenv
config();

//Instantiate the Discord Bot!
export function DiscordInit(discordClient: Client)
{
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

/**
 * Generate the url which the user will be directed to in order to approve the
 * bot, and see the list of requested scopes.
 */
export function getOAuthUrl() {
    const state = crypto.randomUUID();
  
    const url = new URL('https://discord.com/api/oauth2/authorize');
    url.searchParams.set('client_id', process.env.DISCORD_CLIENT_ID!);
    url.searchParams.set('redirect_uri', process.env.DISCORD_REDIRECT_URI!);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('state', state);
    url.searchParams.set('scope', 'role_connections.write identify');
    url.searchParams.set('prompt', 'consent');
    return { state, url: url.toString() };
}

/**
 * Given an OAuth2 code from the scope approval page, make a request to Discord's
 * OAuth2 service to retreive an access token, refresh token, and expiration.
 */
export async function getOAuthTokens(code: string) {
    const url = 'https://discord.com/api/v10/oauth2/token';
    const body = new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID!,
        client_secret: process.env.DISCORD_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.DISCORD_REDIRECT_URI!,
    });
  
    const response = await fetch(url, {
        body,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error(`Error fetching OAuth tokens: [${response.status}] ${response.statusText}`);
    }
}

/**
 * Given a user based access token, fetch profile information for the current user.
 */
export async function getUserData(tokens: any) {
    const url = 'https://discord.com/api/v10/oauth2/@me';
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${tokens.access_token}`,
        },
    });
    
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error(`Error fetching user data: [${response.status}] ${response.statusText}`);
    }
}

/**
 * The initial token request comes with both an access token and a refresh
 * token.  Check if the access token has expired, and if it has, use the
 * refresh token to acquire a new, fresh access token.
 */
export async function getAccessToken(userId: string, tokens: any) {
    if (Date.now() > tokens.expires_at) {
        
        const url = 'https://discord.com/api/v10/oauth2/token';
        
        const body = new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID!,
            client_secret: process.env.DISCORD_CLIENT_SECRET!,
            grant_type: 'refresh_token',
            refresh_token: tokens.refresh_token,
        });

        const response = await fetch(url, {
            body,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

      if (response.ok) {
            const tokens = await response.json();
            tokens.access_token = tokens.access_token;
            tokens.expires_at = Date.now() + tokens.expires_in * 1000;
            await storeDiscordTokens(userId, tokens);
            return tokens.access_token;
        } else {
            throw new Error(`Error refreshing access token: [${response.status}] ${response.statusText}`);
        }
    }
    return tokens.access_token;
}