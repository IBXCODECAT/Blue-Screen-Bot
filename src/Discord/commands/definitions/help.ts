import { InteractionType } from "discord.js";

export = {
    name: "help",
    global: true,
    type: InteractionType.Ping,
    
    description: "I will reply with a list of commands and thier use!",
    options: undefined,

    procedure: "help"
}