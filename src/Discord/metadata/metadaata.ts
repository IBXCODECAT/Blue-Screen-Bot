import { Client, REST, Routes } from "discord.js";
import { GetMessageContextCommandDefinitions as GetContextCommandDefinitions, GetSlashCommandDefinitions } from "../../scripts/filesystem";
import { IMessageContextCommand as IContextCommand } from "../interactions/interfaces/contextCommand";
import { ISlashCommand } from "../interactions/interfaces/slashCommand";

import fetch from 'node-fetch';
import { getAccessToken } from "../discord";
import { getDiscordTokens } from "../../storage";

const slashCommandDefs: Array<ISlashCommand> = GetSlashCommandDefinitions();
const contextCommandDefs: Array<IContextCommand> = GetContextCommandDefinitions();

const interactions: Array<any> = [slashCommandDefs, contextCommandDefs]

//#region Application Metadata

//Delete Interaction Metadata from Discord
export async function InteractionMetadataDelete(client: Client)
{
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);

    rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!), { body: [] })
        .then(() => console.log('Successfully deleted all application commands.'))
        .catch(console.error);

    rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID!, "888875214459535360"), { body: [] })
        .then(() => console.log('Successfully deleted all BSS_PUBLIC guild commands.'))
        .catch(console.error);

    rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID!, "929815024158003280"), { body: [] })
        .then(() => console.log('Successfully deleted all BSS_LABS guild commands.'))
        .catch(console.error);

    rest.put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID!, "913885055598886922"), { body: [] })
        .then(() => console.log('Successfully deleted all BSS_STAFF guild commands.'))
        .catch(console.error);
}

//Delete Linked Roles metadata from Discord
export async function LinkedRoleMetadataDelete(client: Client)
{
    const rest = new REST({ version: `10` }).setToken(process.env.DISCORD_TOKEN!);

    rest.put(`/applications/${process.env.DISCORD_CLIENT_ID}/role-connections/metadata`, { body: [] })
        .then(() => console.log(`Successfully deleted all linked role metadata!`))
        .catch(console.error);
}

//Post Interaction Metadata to Discord
export async function InteractionMetadataCreate(client: Client)
{
    let commands = client.application?.commands;

    for(const interactionGroup of interactions)
    {
        for(const interaction of interactionGroup)
        {
            await commands?.create({
                name: interaction.name,
                type: interaction.type,
                description: interaction.description || undefined,
                options: interaction.options || undefined
            });
        }
    }
}

//Post Linked Roles metadata to Discord
export async function LinkedRoleMetadataCreate(client: Client)
{
    /**
     * Register the metadata to be stored by Discord. This should be a one time action.
     * Note: uses a Bot token for authentication, not a user token.
     */
    
    const url = `https://discord.com/api/v10/applications/${process.env.DISCORD_CLIENT_ID}/role-connections/metadata`;
    // supported types: number_lt=1, number_gt=2, number_eq=3 number_neq=4, datetime_lt=5, datetime_gt=6, boolean_eq=7
    const body =
    [
        {
            key: 'has_account',
            name: 'Has Account',
            description: 'Must have an account with Blue Screen Studios.',
            type: 7,
        },
        {
            key: 'is_employee',
            name: 'Blue Screen Studios Employee',
            description: 'Must work for Blue Screen Studios.',
            type: 7,
        }
    ];

    const response = await fetch(url,{
        method: 'PUT',
        body: JSON.stringify(body),
        headers: 
        {
            'Content-Type': 'application/json',
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
        },
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
    } else {
        //throw new Error(`Error pushing discord metadata schema: [${response.status}] ${response.statusText}`);
        const data = await response.text();
        console.error(data);
    }
}

//#endregion Application Metadata

/**
 * Given metadata that matches the linked roles schema, push that data to Discord on behalf
 * of the current user.
 */
export async function pushMetadata(userId: string, tokens: any, metadata: any) {
    // GET/PUT /users/@me/applications/:id/role-connection
    const url = `https://discord.com/api/v10/users/@me/applications/${process.env.DISCORD_CLIENT_ID!}/role-connection`;
    const accessToken = await getAccessToken(userId, tokens);
    
    const body = {
        platform_name: 'Blue Screen Studios Account',
        metadata,
    };
    
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });
    
    if (!response.ok) {
        throw new Error(`Error pushing discord metadata: [${response.status}] ${response.statusText}`);
    }
}

/**
 * Fetch the metadata currently pushed to Discord for the currently logged
 * in user, for this specific bot.
 */
export async function getMetadata(userId: string, tokens: any) {
    // GET/PUT /users/@me/applications/:id/role-connection
    const url = `https://discord.com/api/v10/users/@me/applications/${process.env.DISCORD_CLIENT_ID!}/role-connection`;
    const accessToken = await getAccessToken(userId, tokens);
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error(`Error getting discord metadata: [${response.status}] ${response.statusText}`);
    }
}

/**
 * Given a Discord UserId, push static make-believe data to the Discord 
 * metadata endpoint. 
 */
export async function updateMetadata(userId: string) {
    // Fetch the Discord tokens from storage
    const tokens = await getDiscordTokens(userId);
      
    let metadata = {};
    try {
        // Fetch the new metadata you want to use from an external source. 
        // This data could be POST-ed to this endpoint, but every service
        // is going to be different.  To keep the example simple, we'll
        // just generate some random data. 
        metadata = {
            is_employee: true,
            has_account: true
        };
    } catch (e: any) {
        e.message = `Error fetching external data: ${e.message}`;
        console.error(e);
        // If fetching the profile data for the external service fails for any reason,
        // ensure metadata on the Discord side is nulled out. This prevents cases
        // where the user revokes an external app permissions, and is left with
        // stale linked role data.
    }
  
    // Push the data to Discord.
    await pushMetadata(userId, tokens, metadata);
  }
  