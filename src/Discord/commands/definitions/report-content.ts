import { InteractionType } from "discord.js";

export = {
    name: "Report Content",
    global: false,
    type: InteractionType.MessageComponent,

    helpMessageDescription: "Report content to the moderators of the server",

    procedure: "report-content"
}