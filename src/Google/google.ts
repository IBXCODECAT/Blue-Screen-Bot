import { OverwriteType } from 'discord.js';
import { google } from 'googleapis';
import { AddRow, GetRow, WriteRow } from './operations/getRow';

const spreadsheetID = "1huh5TzWEyxreLbBAIVZNrb3cROLNJ2hh2vsL_-mYHAc";

export async function SetupGoogle() 
{
    const auth = new google.auth.GoogleAuth({
        keyFile: `${process.cwd() + "\\credentials.json"}`,
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    //Create google client instance for auth
    const googleClient = await auth.getClient();

    //Create instance of google sheets api
    const googleSheets = google.sheets({version: "v4", auth: googleClient});

    //Get sheet metadata for debug
    const metadata = await googleSheets.spreadsheets.get({
        auth: auth,
        spreadsheetId: spreadsheetID
    });

    //console.log(metadata.data);

    await GetRow(auth, googleSheets, spreadsheetID, "live-db");
    //await WriteRow(auth, googleSheets, spreadsheetID, "live-db!B3:B3");
    //await AddRow(auth, googleSheets, spreadsheetID, "live-db!A2:A2");
}

