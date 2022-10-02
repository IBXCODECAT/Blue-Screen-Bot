//Handles the Auth Route...

const express = require('express');
const auth_route = express.Router();
const passport = require('passport');

auth_route.get('/discord', passport.authenticate('discord'));
auth_route.get('/discord/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/dashboard'
}), (req: any, res: any) => {
    res.status(200).send(req.user);
});

auth_route.get('/discord/logout', isAuthorized, (req: any, res: any) => {
    if(req.user) {
        req.logout();
        res.redirect("/");
    } else {
        res.redirect("/");
    }
})

//Middleware function to check authorization of discord user
function isAuthorized(req: any, res: any, next: any) {
    
}

export = auth_route;