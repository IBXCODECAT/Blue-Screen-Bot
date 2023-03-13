import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"
import { customAlphabet } from "nanoid"
import { APIApplicationCommandInteraction, APIChatInputApplicationCommandInteraction, APIEmbed, APIInteractionResponse } from "discord-api-types/v10"
import withDiscordInteraction from "middlewares/discord-interaction"
import withErrorHandler from "middlewares/error-handler"

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz-", 16)

const BASE_RESPONSE = { type: 4 }
const INVALID_COMMAND_RESPONSE = { ...BASE_RESPONSE, data: { content: "You have executed a command that does not exist in my directory. Try again later or run **/bot-support** to contact the developers.", ephemeral: true } }
const PING_COMMAND_RESPONSE = { ...BASE_RESPONSE, data: { content: "Pong! As of March 9 2023 I started using an interactions endpoint URI and therefore I am unable to calculate ping times :(", ephemeral: true } }

const baseRandomPicEmbed = {
  title: "Random Pic",
  description: "Here's your random pic!",
}

const generateEmbedObject = (source: string, path: string): APIEmbed => {
  return {
    ...baseRandomPicEmbed,
    fields: [{ name: "source", value: source }],
    image: {
      url: `${source}${path}`,
    },
  }
}

const getEmbed = async (value: string) => {
  switch (value) {
    case "cat":
      const {
        data: { url },
      } = await axios.get("https://cataas.com/cat?json=true")
      return generateEmbedObject("https://cataas.com", url)
    case "dog":
      try {
        const {
          data: { message },
        } = await axios.get("https://dog.ceo/api/breeds/image/random")
        return {
          ...baseRandomPicEmbed,
          fields: [{ name: "source", value: "https://dog.ceo/api" }],
          image: { url: message },
        }
      } catch (err) {
        return { ...baseRandomPicEmbed, description: "Oh no! Error getting random dog." }
      }

    default:
      return generateEmbedObject("https://picsum.photos", `/seed/${nanoid()}/500`)
  }
}

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
  const { data: { name, options }, } = interaction as APIChatInputApplicationCommandInteraction

  switch (name) {
    case "ping":
      return res.status(200).json(PING_COMMAND_RESPONSE)
    case "randompic":
      if (!options) {
        throw new Error()
      }
      return res.status(200).json({
        type: 4,
        data: {
          // @ts-ignore
          embeds: [await getEmbed(options[0].value)],
        },
      })

    default:
      return res.status(200).json(INVALID_COMMAND_RESPONSE)
  }
}

export default withErrorHandler(withDiscordInteraction(handler))
