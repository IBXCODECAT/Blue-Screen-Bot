import { ApplicationCommandOptionType } from "discord.js";

export = {
    name: "role-all",
    description: "I will modify the roles of all users!",
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
        }
    ],
    procedure: "role-all"
}