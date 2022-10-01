import { config } from "dotenv";
import { DiscordUser } from "../database/models/discordUser";
config();

const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');

var scopes = ['identify', 'email', 'guilds', 'guilds.join'];

passport.serializeUser((user: any, done: any) => {
    console.log("Serializing User");
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser(async (id: any, done: any) => {
    const user = await DiscordUser.findById(id);
    if(user) done(null, user);
});

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_OATUH2_REDIRECT,
    scope: ['identify', 'email', 'guilds', 'guilds.join']
}, async (acessToken: any, refreshToken: any, profile: any, done: any) => {
    try
    {
        const user = await DiscordUser.findOne({ discord_id: profile.id });
        
        //If we have a user documented, invoke the passport.serializeUser() function, otherwise create them
        if(user)
        {
            done(null, user);
        }
        else
        {
            const newUser = await DiscordUser.create({
                discord_id: profile.id,
                username: profile.username,
                email: profile.email,
            });

            const saveduser = await newUser.save();

            done(null, saveduser);
        }
    }
    catch(err)
    {
        console.log(err);
        done(err, null);
    }
}));