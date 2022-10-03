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
        window.location.href = "/auth/discord"; //Redirect to discord authorization prompt
    } else if (error !== null) {
        const err_report = PlayFab.GenerateErrorReport(error);
        document.getElementById("error_text").innerText = error.errorMessage;
    }
}