import { config } from "dotenv";

const express = require('express');
const app = express();

config(); //Configure dotenv

const PORT = process.env.PORT || 8080; //Use env defined port or use 8080 (standard web server port)

export function API()
{
    app.use(express.json());

    app.listen(
        PORT,
        () => console.log(`Express alive on http://localhost:${PORT}`)
    );
    
    //Data request
    app.get('/', (req: any, res: any) => {
        res.status(200).send(`You have requested the root URI from the Blue Screen Studios API on port ${PORT}.`);
    });
}
