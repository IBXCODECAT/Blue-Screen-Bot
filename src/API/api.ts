import { config } from "dotenv";

const express = require('express');
const session = require('express-session');
const passport = require('passport');

const app = express();

const discord = require('./strategies/discordStrategy');

const PORT = process.env.PORT || 8080; //Use env defined port or use 8080 (standard web server port)

import * as fs from 'fs';
import { join } from 'path';

import db_connection = require('./database/db');
import auth_route = require("./routes/auth");
import dashboard_route = require('./routes/dashboard');


db_connection.then(() => console.log('Connected to database.'));

export function API()
{
    app.use(session({
        secret: 'super secure secret',
        cookie: {
            maxAge: 60000 * 60 * 24, //One day
        },
        saveUninitialized: false,
        name: 'Discord.OAuth2' //This will name our session id cookie
    }))

    app.use(express.static(join(__dirname, 'public')));
    app.use(passport.initialize());
    app.use(passport.session());

    //Middleware Routes
    app.use('/auth', auth_route);
    app.use('/dashboard', dashboard_route);

    //Utilize the EJS view engine for front end HTML
    app.set('view engine', 'ejs');
    app.set('views', join(__dirname, 'views'));

    app.listen(
        PORT,
        () => console.log(`Express alive on http://localhost:${PORT}`)
    );
    
    //Data request
    app.get('/', (req: any, res: any) => {
        res.status(200).send(`You have requested the root URI from the Blue Screen Studios API on port ${PORT}.`);
    });

    app.get('/home', (req: any, res: any) => {
        res.status(200).render('home', {
            users: [
                { "name": "bob", "email": "bob@example.com" },
                { "name": "joe", "email": "joe@example.com" },
                { "name": "ted", "email": "ted@example.com" },
            ]
        });
    });
}
