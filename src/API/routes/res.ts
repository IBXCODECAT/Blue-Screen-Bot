//Handles the res Route...

const express = require('express');
const res_route = express.Router();
const passport = require('passport');

res_route.get('/discord_id', (req: any, res: any) => {
    res.status(200).send(req.user);
});