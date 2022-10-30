import { ChannelFlags, Client, GuildMember, TextChannel } from "discord.js";

const guild = process.env.BSS_GUILD!;
const log = process.env.BSS_LOG!;

export = {
    name: 'guildMemberRemove',
    once: false,
    isasync: true,

    async execute(client: Client, member: GuildMember)
    {
        console.log(member.guild.id);

        if(member.guild.id == guild)
        {
            const channel = await client.channels.fetch(log);
            (channel as TextChannel).send(`**Member Leave:** <@${member.user.id}> [${member.user.id}]`);
        }
    }
}