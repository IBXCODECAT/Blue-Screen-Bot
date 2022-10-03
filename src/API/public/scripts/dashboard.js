const playfabID = sessionStorage.getItem("PlayFabID");
var discord_id = null;

const http = new XMLHttpRequest();
const url = "/res/discord_id";
http.open("GET", url);
http.send();

console.log("Player ID: " + playfabID);
console.log("Discord ID: " + discord_id);

http.onreadystatechange = (e) => {
    discord_id = http.response;
    console.log(http.response);
}

function LinkAccountID()
{
    var linkRequest = {
        
        // Currently, you need to look up the required and optional keys for this object in the API reference for LoginWithCustomID. See the Request Headers and Request Body.
        CustomId: discord_id,
        ForceLink: true
    };

    PlayFabClientSDK.LinkCustomID(linkRequest, LinkingCallback);
}

var LinkingCallback = function (result, error) {
    if(result !== null) {
        console.log("Linked?");
    } else if (error !== null) {
        var error = PlayFab.GenerateErrorReport(error);
        console.error(error);
    }
}