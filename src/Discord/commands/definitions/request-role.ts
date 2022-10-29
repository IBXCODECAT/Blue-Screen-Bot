import { ApplicationCommandOptionType } from "discord.js"

export = {
    name: "request-role",
    global: false,
    description: "Reqeuest a role to be added to your Discord profile!",
    options: [
        {
            name: "role",
            description: "Which role are you requesting?",
            type: ApplicationCommandOptionType.Role,
            required: true,
        }
    ],
    procedure: "request-role"
}