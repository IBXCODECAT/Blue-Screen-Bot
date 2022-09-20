const express = require('express');
const app = express();
const PORT = 8080;

import { Discord } from './Discord/discord'

Discord();

app.use(express.json());

app.listen(
    PORT,
    () => console.log(`Express alive on http://localhost:${PORT}`)
);

//Discord data request handler (returns)
app.get('/discord', (req: any, res: any) => {
    res.status(200).send({
        name: "",
        roles: []
    })
});