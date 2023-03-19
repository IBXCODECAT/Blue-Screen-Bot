import { NextApiRequest, NextApiResponse } from "next"
import { APIApplicationCommandInteraction, APIChatInputApplicationCommandInteraction, APIInteractionResponse, MessageFlags } from "discord-api-types/v10"
import withDiscordInteraction from "middlewares/discord-interaction"
import withErrorHandler from "middlewares/error-handler"

const BASE_RESPONSE = { type: 4, flags: [ MessageFlags.Ephemeral ] }
const INVALID_COMMAND_RESPONSE = { ...BASE_RESPONSE, data: { content: "You have executed a command that does not exist in my directory. Try again later or run **/bot-support** to contact the developers." } }

const BOT_SUPPORT_RESPONSE = { ...BASE_RESPONSE, data: { content: "Here is the link to the bot support server!\n\nhttps://discord.gg/Zy5uXQUZXx" }}
const HELP_RESPONSE = { ...BASE_RESPONSE, data: { content: "Need Help? No problem! You can find a list of my commands here:\n\nhttps://blue-bot.vercel.app/docs/commands"}};
const PING_COMMAND_RESPONSE = { ...BASE_RESPONSE, data: { content: "Pong! As of March 9 2023 I started using an interactions endpoint URI and therefore I am unable to calculate ping times :(" } }
const PRIVACY_RESPONSE = { ...BASE_RESPONSE, data: { content: "I am a responsible Discord Bot that was built by a developer who values user privacy and security. I only store data that is absolutely necessary for operations regarding the servers I am in and only for the duration that I am in that server. This means that any data that is no longer critical to functionality is promptly deleted.\n\nIt is also important to note that Blue Bot **CAN NOT** and **WILL NOT** store any message content or profile data. This means user conversations and personal details are **CAN NOT** and **WILL NOT** be accessed except in the case of linked roels where you must manually approve this profile information to be viewed.\n\nIn addition, I allow users to have control over their data throught the implementation of a **/data** command. With this command, administrators of servers can view and request deletion of data stored by Blue Bot. This gives users peace of mind knowing that they have full control over their data and can manage it as they see fit." }}

// disable body parsing, need the raw body as per https://discord.com/developers/docs/interactions/slash-commands#security-and-authorization
export const config = {
  api: {
    bodyParser: false,
  },
}

//THIS IS THE COMMAND HANDLER I THINK
const handler = async (
  _: NextApiRequest,
  res: NextApiResponse<APIInteractionResponse>,
  interaction: APIApplicationCommandInteraction
) => {
  //@ts-expect-error
  const { data: { name, options }, } = interaction as APIChatInputApplicationCommandInteraction

  switch (name) {
    case "bot-support":
      return res.status(200).json(BOT_SUPPORT_RESPONSE)
    case "help" || "Need Help?":
      return res.status(200).json(HELP_RESPONSE);
    case "ping":
      return res.status(200).json(PING_COMMAND_RESPONSE)
    case "privacy":
      return res.status(200).json(PRIVACY_RESPONSE);
    default:
      return res.status(200).json(INVALID_COMMAND_RESPONSE)
  }
}



export default withErrorHandler(withDiscordInteraction(handler))
