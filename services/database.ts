import { MongoClient, ServerApiVersion } from "mongodb";
import { GUILD_INFO_OBJ } from "types/GUILD_INFO";

const password = process.env.DB_PASSWORD!;
const database_location = process.env.DB_LOCATION!;

const uri = `mongodb+srv://IBXCODECAT:${[password]}@${database_location}/?retryWrites=true&w=majority`;

const db_client = new MongoClient(uri, {
    serverApi: ServerApiVersion.v1,
});

let connected: boolean = false;

let database: any = null;
let guild_collection: any = null;

export async function ConnectToDB() {
    try
    {
        //Connect to MongoDB
        await db_client.connect();
        console.log("Connected to MongoDB");

        //Get databases and collections
        database = db_client.db("Blue-Bot-Main");
        guild_collection = database.collection("GUILD_INFO");

        connected = true;
    }
    catch (ex)
    {
        console.error(ex);
    }
}

export async function InsertGuildInfo(info: GUILD_INFO_OBJ): Promise<boolean>
{
    let success = false;

    //If our database is not connected
    if(!connected)
    {
        //Connect to our database
        await ConnectToDB();
    }

    try
    {
        //Make the INSERT request
        const res = await guild_collection.insertOne(info);
        console.log(res);
        success = true;
    }
    catch(ex)
    {
        //Log the error and set success to false
        console.error(ex);
        success = false;
    }
    finally
    {
        //Close the connection
        await db_client.close();
        connected = false;
    }

    return success;
}