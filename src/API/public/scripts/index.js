//Set our Title ID so we know which game backend we are trying to update
PlayFab.settings.titleId = "D5AB4";


function LinkAccountID()
{
    var linkRequest = {
        
        // Currently, you need to look up the required and optional keys for this object in the API reference for LoginWithCustomID. See the Request Headers and Request Body.
        CustomId: "test",
        ForceLink: true
    };

    PlayFabClientSDK.LinkCustomID(linkRequest, LinkingCallback);
}

var LinkingCallback = function (result, error) {
    if(result !== null) {

    } else if (error !== null) {
        var error = PlayFab.GenerateErrorReport(error);
        console.error(error);
    }
}