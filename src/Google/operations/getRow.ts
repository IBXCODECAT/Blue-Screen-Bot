import { Compute, GoogleAuth } from 'google-auth-library';
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import { google, sheets_v4 } from 'googleapis';

export async function GetRow(auth: GoogleAuth, isheets: sheets_v4.Sheets, sheetID: string, range: string)
{
    const getRows = await isheets.spreadsheets.values.get({
        auth: auth,
        spreadsheetId: sheetID,
        range: range,
    });

    console.log(getRows.data.values);

    return getRows.data.values;
}

export async function WriteRow(auth: GoogleAuth, isheets: sheets_v4.Sheets, sheetID: string, range: string)
{
    const postRows = await isheets.spreadsheets.values.append({
        auth: auth,
        spreadsheetId: sheetID,
        range: range,
        valueInputOption: "RAW",
        insertDataOption: "OVERWRITE",
        responseDateTimeRenderOption: "FORMATTED_STRING",
        requestBody: {
            values: [
                ["Overwrite1", "Overwrite2"]
            ]
        }
    });

    console.log(postRows.data);
}

export async function AddRow(auth: GoogleAuth, isheets: sheets_v4.Sheets, sheetID: string, range: string)
{
    const postRows = await isheets.spreadsheets.values.append({
        auth: auth,
        spreadsheetId: sheetID,
        range: range,
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        responseDateTimeRenderOption: "FORMATTED_STRING",
        requestBody: {
            values: [
                ["Insert1", "Insert2"]
            ]
        }
    });

    console.log(postRows.data);
}