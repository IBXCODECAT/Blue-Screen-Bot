import { Client, GuildMember } from "discord.js";
import { HandleCommands } from "../scripts/commands";
//import { HandleCommands } from "../components/commands";

export = {
    name: 'guildMemberAdd',
    once: false,
    isasync: true,

    async execute(client: Client, member: GuildMember)
    {
        if(member.guild.id == process.env.BSS_GUILD)
        {
            member.send(`Hello <@${member.user?.id}>!`);
        }

        console.log("New GUILD Member");
    }
}