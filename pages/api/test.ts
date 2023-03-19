// req = HTTP incoming message, res = HTTP server response

import { InsertGuildInfo } from "services/database";
import { GUILD_INFO_OBJ } from "types/GUILD_INFO";

//@ts-expect-error
export default async function handler(req: any, res: any) {

    //const test = new GUILD_INFO_OBJ(888875214459535360, true, { welcome: 1036100327864287284, logs: 917570387678740490} );
    
    //await InsertGuildInfo(test);

    return res.status(200).json({"code": 200, "type": "OK"});
}