
const express = require('express');
const app = express();
const PORT = 8080;

const discord = require('discord.js');
const dotenv = require('dotenv');

app.use(express.json());

app.listen(
    PORT,
    () => console.log(`alive on http://localhost:${PORT}`)
);

//Discord data request handler (returns)
app.get('/discord', (req: any, res: any) => {
    res.status(200).send({
        name: "",
        roles: []
    })
});