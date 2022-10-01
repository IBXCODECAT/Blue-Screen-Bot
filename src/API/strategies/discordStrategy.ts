import { config } from "dotenv";
config();

const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');

var scopes = ['identify', 'email', 'guilds', 'guilds.join'];

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_OATUH2_REDIRECT,
    scope: ['identify', 'email', 'guilds', 'guilds.join']
}, (acessToken: any, refreshToken: any, profile: any, done: any) => {
    console.log(profile);
}))