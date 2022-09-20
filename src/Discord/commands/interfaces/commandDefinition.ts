import { ApplicationCommandOption } from "discord.js";

export interface CommandDefinition
{
    name: string;
    description: string;
    options: any;
    procedure: string;
}