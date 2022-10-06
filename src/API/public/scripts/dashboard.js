const playfabID = sessionStorage.getItem("PlayFabID");
const discord_id = "TEST_ID";

console.log("Player ID: " + playfabID);
console.log("Discord ID: " + discord_id);


function LinkAccountID()
{
    var linkRequest = {
        
        // Currently, you need to look up the required and optional keys for this object in the API reference for LoginWithCustomID. See the Request Headers and Request Body.
        CustomId: discord_id,
        ForceLink: true
    };

    try
    {
        
        PlayFabClientSDK.LinkCustomID(linkRequest, LinkingCallback);
    }
    catch (res)
    {
        console.error("There was a problem calling this method.. " + res)
    }
}

var LinkingCallback = function (result, error) {
    if(result !== null) {
        console.log("Linked?");
    } else if (error !== null) {
        var error = PlayFab.GenerateErrorReport(error);
        console.error(error);
        console.log("I Ran!");
    }
}