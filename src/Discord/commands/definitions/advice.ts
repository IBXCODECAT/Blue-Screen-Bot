import { InteractionType } from "discord.js";

export = {
    name: "advice",
    global: true,
    type: InteractionType.Ping,
    
    description: "Let me give you some helpful advice!",
    options: undefined,

    procedure: "advice"
}