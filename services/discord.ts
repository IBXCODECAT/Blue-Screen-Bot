import axios from "axios"
import { APIApplicationCommand } from "discord-api-types/v10"

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
