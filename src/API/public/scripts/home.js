// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//Allow the user to login with PlayFab by pulling values from the form body
function LoginPlayFab()
{   
    console.log("Logging in with PlayFab...");

    var loginRequest = {
        // Currently, you need to look up the required and optional keys for this object in the API reference for LoginWithCustomID. See the Request Headers and Request Body.
        TitleId: PlayFab.settings.titleId,
        Username: document.getElementById("uname").value,
        Password: document.getElementById("psw").value
    };

    PlayFabClientSDK.LoginWithPlayFab(loginRequest, LoginCallback);
}

// callback functions take two parameters: result and error
// see callback functions in JavaScript if unclear
var LoginCallback = function (result, error) {

    console.log("Login Callback...");

    if (result !== null) {
        console.log("PlayFab Login Successfull!");

        sessionStorage.setItem('PlayFabID', result.data.PlayFabId);

        console.log("PlayFab ID: " + sessionStorage.getItem('PlayFabID'));

    } else if (error !== null) {
        document.getElementById("error_text").innerText = error.errorMessage;
    }
}

const playfabID = sessionStorage.getItem("PlayFabID");
const discord_id = "TEST_ID4";

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
        console.log(result);
    } else if (error !== null) {
        var error = PlayFab.GenerateErrorReport(error);
        console.error(error);
        console.log("I Ran!");
    }
}