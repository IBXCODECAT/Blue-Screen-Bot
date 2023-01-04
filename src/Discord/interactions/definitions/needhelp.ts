import { InteractionType } from "discord.js";

export = {
    name: "Need Help?",
    global: true,
    type: InteractionType.MessageComponent,
    
    helpMessageDescription: "I will reply with a list of commands and thier use!",
    
    executes: "help"
}