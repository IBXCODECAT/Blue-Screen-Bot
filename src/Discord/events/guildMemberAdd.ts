import { Channel, Client, GuildMember, TextChannel } from "discord.js";

const guild = process.env.BSS_GUILD!;
const log = process.env.BSS_LOG!;

export = {
    name: 'guildMemberAdd',
    once: false,
    isasync: true,

    async execute(client: Client, member: GuildMember)
    {
        if(member.guild.id == guild)
        {
            const channel = await client.channels.fetch(log);
            (channel as TextChannel).send(`**Member Join:** <@${member.user.id}> [${member.user.id}]`);
        }
    }
}