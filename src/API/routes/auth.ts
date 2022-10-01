//Handles the Auth Route...

const express = require('express');
const auth_route = express.Router();
const passport = require('passport');

auth_route.get('/discord', passport.authenticate('discord'));
auth_route.get('/discord/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden'
}), (req: any, res: any) => {
    res.status(200).send(200);
});

/*auth_route.get('/discord', (req: any, res: any) => {
    res.status(200).send(200);
})*/

export = auth_route;