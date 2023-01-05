import { Client, Guild, PermissionsBitField } from "discord.js";

export function CheckClientPermissions(client: Client, guild: Guild | null): Boolean
{
    if(guild) 
    {
        if(guild.members.me?.permissions.has(
            [
                PermissionsBitField.Flags.ManageGuild,
                PermissionsBitField.Flags.ManageWebhooks,
                PermissionsBitField.Flags.SendMessages,
                PermissionsBitField.Flags.EmbedLinks
            ]
        ))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    return false;
}

export function PermissionCheck(client: Client, guild: Guild | null, permission: bigint): String
{
    if(guild)
    {
        if(guild.members.me?.permissions.has(permission)!)
        {
            return "✅ - This permission has been granted, no further action required."
        }
    }

    return "❌ - I do not have this permission, but I require this permission to function properly.";
}