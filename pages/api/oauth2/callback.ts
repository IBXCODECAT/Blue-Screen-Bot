import { getCookie } from "cookies-next";
import { API_URL, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } from "services/discord"

// req = HTTP incoming message, res = HTTP server response
export default async function handler(req: any, res: any) {
    
    try {
        //Use the code and state to acquire Discord OAuth2 tokens
        const code = req.query['code'];
        const state = req.query['state'];

        // make sure the state parameter exists
        const { clientState } = getCookie('clientState', {req, res});
        if (clientState !== state) {
            console.error('State verification failed.');
            return res.status(403).json({error: "Unauthorized"});
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

        console.log(response);

        if(response.ok)
        {
            console.log("ok");
        }
        else
        {
            console.error(response)
        }
    }
    catch (ex){
        console.error(ex);
    }

    res.status(200).json({text: "Test"});
}