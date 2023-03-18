import { getCookie } from "cookies-next";
import { API_URL, CLIENT_ID, CLIENT_SECRET, GetMetadata, GetUserData, REDIRECT_URI, UpdateMetadata } from "services/discord"
import { StoreDiscordTokens } from "services/storage";

// req = HTTP incoming message, res = HTTP server response
export default async function handler(req: any, res: any) {
    
    let tokens;

    /**
     * Given an OAuth2 code from the scope approval page, make a request to Discord's
     * OAuth2 service to retrieve an access token, refresh token, and expiration.
     */
    try {
        //Use the code and state to acquire Discord OAuth2 tokens
        const code = req.query['code'];
        const state = req.query['state'];

        // make sure the state parameter exists and that the request wasn't forged from another app
        const clientState = getCookie('clientState', {req, res});
        if (clientState !== state) {
            console.error('State verification failed.');
            return res.status(403).json({code: 403, type: "Unauthorized"});
        }

        const url = API_URL + "/oauth2/token"; //url = 'https://discord.com/api/v10/oauth2/token';

        const body = new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI
        });

        const response = await fetch(url, {
            body,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if(response.ok)
        {
            tokens = await response.json();
            console.log("ok");

            //Use the Discord Access Token to fetch the user profile
            const meData = await GetUserData(tokens);
            const userId = meData.user.id;

            await StoreDiscordTokens(userId, {
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                expires_at: Date.now() + tokens.expires_in * 1000,
            });

            //Update the user's metadata
            const x = await GetMetadata(userId, tokens);

            console.log(x);

            await UpdateMetadata(userId);

            console.log("Authorized & Updated: " + userId);

            //Redirect to Discord's "authorized" page
            res.redirect("https://discord.com/oauth2/authorized");
        }
    }
    catch (ex){
        console.error(ex);
        res.status(500).json({code: 500, type: "Internal", ex: `${ex}`});
    }
}