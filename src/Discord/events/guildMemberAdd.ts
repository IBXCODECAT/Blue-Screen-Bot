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
            member.send(`Hello <@${member.user?.id}>! We are so glad you are have joined our gaming community!

Here are a few important channels that you should check out!

- <#888875746402127902> contains the rules for our community.
- <#956007761173418044> contains information about Blue Screen Studios.
- <#1031594012366352475> contains all development updates.

The Blue Screen Studios server is owned and operated by the game developers at Blue Screen Studios. If you ever have any questions about anything, please feel free to ask! We hope you enjoy it here!
            
*I am a bot, and this message was automated...*`);
            
            const channel = await client.channels.fetch(log);
            (channel as TextChannel).send(`**Member Join:** <@${member.user.id}> [${member.user.id}]`);
        }
    }
}