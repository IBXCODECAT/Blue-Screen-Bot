import * as https from 'https';

export async function GET(uri: string): Promise<string>
{
    let ret = 'you should not see this';

    return new Promise((resolve) => {
        https.get(uri, (response) => {
            let data = '';
        
            //A chunk of data has been recieved
            response.on('data', (chunk) => {
                data += chunk;
            });
        
            response.on('end', () => {
                console.log(`GET Result: ${data}`);
                resolve(data);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
            return `There was a problem resolving \`GET\` request at the uri: \`${uri}\``;
        });
    })
}