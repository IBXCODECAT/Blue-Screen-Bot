import { ApplicationCommandOptionType } from "discord.js";

export = {
    name: "role",
    description: "I will modify the role of a user!",
    adminOnly: true,
    options: [
        {
            name: "action",
            description: "What action should I take?",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices:
            [
                {
                    name: "add",
                    value: "add"
                },
                {
                    name: "remove",
                    value: "remove"
                },
                {
                    name: "has",
                    value: "has"
                }
            ]
        },
        {
            name: "role",
            description: "Which role should I utilize for this operation?",
            type: ApplicationCommandOptionType.Role,
            required: true,
        },
        {
            name: "member",
            description: "Which member should I perform a role operation on?",
            type: ApplicationCommandOptionType.User,
            required: true
        } 
    ],
    procedure: "role"
}