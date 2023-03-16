import { CLIENT_ID, REDIRECT_URI } from "services/discord"
import crypto from 'crypto';
import { setCookie } from 'cookies-next';

// req = HTTP incoming message, res = HTTP server response
export default function handler(req: any, res: any) {

    const state = crypto.randomUUID();

    const url = new URL("https://discord.com/api/oauth2/authorize");

    url.searchParams.set('client_id', CLIENT_ID);
    url.searchParams.set('redirect_uri', REDIRECT_URI);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('state', state);
    url.searchParams.set('scope', 'role_connections.write identify');
    url.searchParams.set('prompt', 'consent');

    setCookie('clientState', state, {req, res, maxAge: 1000 * 60 * 5});

    res.redirect(url.toString());
}