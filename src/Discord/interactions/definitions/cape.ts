import { ApplicationCommandOptionType, ApplicationCommandPermissionType, InteractionType } from "discord.js";

export = {
    name: "cape",
    global: true,
    type: InteractionType.Ping,
    
    description: "Add or remove a cape from you Blue Screen Studios account!",
    options: 
    [    
        {
            "name": "cape",
            "description": "the cape you want applied to your account",
            "type": ApplicationCommandOptionType.String,
            "required": true,
            "choices":
            [
                {
                    "name": "Discord Member Cape",
                    "value": "cape_discord"
                },
                {
                    "name": "Early Member Cape",
                    "value": "cape_early"
                }
            ]
        },
        {
            "name": "enabled",
            "description": "wether or not to enable the cape on the account",
            "type": ApplicationCommandOptionType.Boolean,
            "required": true
        }
    ],

    executes: "cape"
}