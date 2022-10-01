import { config } from "dotenv";

const express = require('express');
const session = require('express-session');
const passport = require('passport');

const app = express();

const discord = require('./strategies/discordStrategy');

const PORT = process.env.PORT || 8080; //Use env defined port or use 8080 (standard web server port)

import db_connection = require('./database/db');

import auth_route = require("./routes/auth");

db_connection.then(() => console.log('Connected to database.'));

export function API()
{
    app.use(session({
        secret: 'super secure secret',
        cookie: {
            maxAge: 60000 * 60 * 24, //One day
        },
        saveUninitialized: false
    }))


    app.use(passport.initialize());
    app.use(passport.session());

    //Middleware Routes
    app.use('/auth', auth_route);

    app.listen(
        PORT,
        () => console.log(`Express alive on http://localhost:${PORT}`)
    );
    
    //Data request
    app.get('/', (req: any, res: any) => {
        res.status(200).send(`You have requested the root URI from the Blue Screen Studios API on port ${PORT}.`);
    });
}
