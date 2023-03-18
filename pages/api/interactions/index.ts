import { NextApiRequest, NextApiResponse } from "next"
import { APIApplicationCommandInteraction, APIChatInputApplicationCommandInteraction, APIInteractionResponse, MessageFlags } from "discord-api-types/v10"
import withDiscordInteraction from "middlewares/discord-interaction"
import withErrorHandler from "middlewares/error-handler"
import { getGlobalCommands } from "services/discord"

const BASE_RESPONSE = { type: 4, flags: [ MessageFlags.Ephemeral ] }

const INVALID_COMMAND_RESPONSE = { ...BASE_RESPONSE, data: { content: "You have executed a command that does not exist in my directory. Try again later or run **/bot-support** to contact the developers." } }
const PING_COMMAND_RESPONSE = { ...BASE_RESPONSE, data: { content: "Pong! As of March 9 2023 I started using an interactions endpoint URI and therefore I am unable to calculate ping times :(" } }
const BOT_SUPPORT_RESPONSE = { ...BASE_RESPONSE, data: { content: "Here is the link to the bot support server!\n\nhttps://discord.gg/Zy5uXQUZXx" }}

// disable body parsing, need the raw body as per https://discord.com/developers/docs/interactions/slash-commands#security-and-authorization
export const config = {
  api: {
    bodyParser: false,
  },
}

const { data } = await getGlobalCommands()
console.log(data);

//THIS IS THE COMMAND HANDLER I THINK
const handler = async (
  _: NextApiRequest,
  res: NextApiResponse<APIInteractionResponse>,
  interaction: APIApplicationCommandInteraction
) => {
  //@ts-expect-error
  const { data: { name, options }, } = interaction as APIChatInputApplicationCommandInteraction

  switch (name) {
    case "help" || "Need Help?":
      return;
    case "ping":
      return res.status(200).json(PING_COMMAND_RESPONSE)
    case "bot-support":
      return res.status(200).json(BOT_SUPPORT_RESPONSE)
    default:
      return res.status(200).json(INVALID_COMMAND_RESPONSE)
  }
}



export default withErrorHandler(withDiscordInteraction(handler))
