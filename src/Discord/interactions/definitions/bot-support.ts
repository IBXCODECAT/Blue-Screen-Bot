import { InteractionType } from "discord.js";

export = {
    name: "bot-support",
    global: true,
    type: InteractionType.Ping,

    description: "I will provide a link to the bot support server!",
    options: undefined,
    
    executes: "bot-support"
}