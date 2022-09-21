import { Client, DiscordAPIError, GuildMember, mergeDefault } from "discord.js";
import { isSemicolonClassElement } from "typescript";
import role = require("../Discord/commands/definitions/role");

const express = require('express');
const app = express();
const PORT = 8080;

export function API(client: Client)
{
    app.use(express.json());

    app.listen(
        PORT,
        () => console.log(`Express alive on http://localhost:${PORT}`)
    );
    
    //Discord data request handler (returns)
    app.get('/discord', async (req: any, res: any) => {
        
        let inGuild: boolean = false;
        const userID = req.query.id;
        console.log(userID);

        //GET DISCORD USER BY ID HERE
        let guild = client.guilds.cache.get('888875214459535360');
        
        let isStaff = false;

        let member: GuildMember;
        
        try
        {
            member = await guild?.members.fetch(userID)!;
        }
        catch (ex)
        {
            console.log(ex);
            res.status(400).send("Bad Request.");
            return;
        }

        res.status(200).send({
            username: member?.user.username,
            discriminator: member.user.tag,
            joined: member.joinedAt,
            joinedTimestamp: member.joinedTimestamp
        })
    });
}
