import { Client } from "discord.js";

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
    app.get('/discord', (req: any, res: any) => {
        
        const userID = req.query.userID;
        console.log(userID);

        //GET DISCORD USER BY ID HERE

        res.status(200).send({
            name: "",
            roles: []
        })
    });
}
