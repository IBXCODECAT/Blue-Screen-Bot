import { Client, flatten, Guild, PermissionsBitField } from "discord.js";

export function CheckClientPermissions(client: Client, guild: Guild | null): Boolean
{
    if(guild) 
    {
        if(guild.members.me?.permissions.has(
            [
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