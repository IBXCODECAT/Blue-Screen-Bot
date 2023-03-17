import axios from "axios"
import { APIApplicationCommand } from "discord-api-types/v10"
import { GetAccessToken, GetDiscordTokens } from "./storage";

export const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN!;
export const CLIENT_ID = process.env.DISCORD_APP_ID!;
export const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET!;
export const REDIRECT_URI = process.env.OAUTH2_REDIRECT_URI!;

export const API_URL = "https://discord.com/api/v10";

if (!BOT_TOKEN || !CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
  throw new Error("Environment variables not configured correctly")
}

export const DISCORD_CLIENT = axios.create({
  baseURL: "https://discord.com/api/v10",
  headers: { Authorization: `Bot ${BOT_TOKEN}` },
})


export const getGlobalCommands = () =>
  DISCORD_CLIENT.get<APIApplicationCommand[]>(`/applications/${CLIENT_ID}/commands`)

export type CreateGlobalCommand = Omit<APIApplicationCommand, "id" | "application_id">
export const createGlobalCommand = (command: CreateGlobalCommand) =>
  DISCORD_CLIENT.post<APIApplicationCommand>(`/applications/${CLIENT_ID}/commands`, command)

/**
 * Given a user based access token, fetch profile information for the current user.
 */
export async function GetUserData(tokens: any) {
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
 * Given a Discord UserId, push static make-believe data to the Discord 
 * metadata endpoint. 
 */
export async function UpdateMetadata(userId: number) {
  // Fetch the Discord tokens from storage
  const tokens = await GetDiscordTokens(userId);
    
  let metadata = {
    is_employee: 0,
    has_account: 0,
  };

  try {
    //611649234848186388 = IBX,
    //994362736270135376 = BSS,
    //1005300704379932784 = LucyVTuber,
    //596533034816372736 = Lucky,
    //806217031098695704 = Krok,
    //174262233545572352 = Tony

    if(userId == 611649234848186388 || 
      userId == 994362736270135376 || 
      userId == 1005300704379932784 || 
      userId == 596533034816372736 || 
      userId == 806217031098695704 ||
      userId == 174262233545572352) {
        metadata = {
          is_employee: 1, // 0 for false, 1 for true
          has_account: 0, // 0 for false, 1 for true
        };
    }
    
  } catch (ex: any) {
    ex.message = `Error fetching external data: ${ex.message}`;
    console.error(ex);
    // If fetching the profile data for the external service fails for any reason,
    // ensure metadata on the Discord side is nulled out. This prevents cases
    // where the user revokes an external app permissions, and is left with
    // stale linked role data.
  }

  // Push the data to Discord.
  await PushMetadata(userId, tokens, metadata);
}

/**
 * Given metadata that matches the schema, push that data to Discord on behalf
 * of the current user.
 */
export async function PushMetadata(userId: number, tokens: any, metadata: any) {
  // PUT /users/@me/applications/:id/role-connection
  const url = `https://discord.com/api/v10/users/@me/applications/${DISCORD_CLIENT}/role-connection`;
  const accessToken = await GetAccessToken(userId, tokens);
  const body = {
    platform_name: 'Blue Screen Studios Account',
    metadata,
  };

  console.log(metadata);

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
export async function GetMetadata(userId: number, tokens: any) {
  // GET /users/@me/applications/:id/role-connection
  const url = `https://discord.com/api/v10/users/@me/applications/${CLIENT_ID}/role-connection`;
  const accessToken = await GetAccessToken(userId, tokens);
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