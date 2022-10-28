import { Client, REST, Routes } from 'discord.js';

export async function DeleteCommands()
{
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);

    rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!), { body: [] })
        .then(() => console.log('Successfully deleted all application commands.'))
        .catch(console.error);
}
