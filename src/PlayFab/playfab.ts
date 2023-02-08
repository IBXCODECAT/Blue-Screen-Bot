import { PlayFab, PlayFabClient  } from "playfab-sdk";


export function PlayFabInit()
{
    PlayFab.settings.titleId = "8BD04";
}

async function LoginWithPlayfab(username: string, password: string) 
{
    let loginRequest = 
    {
        TitleId: PlayFab.settings.titleId,
        Username: username,
        Password: password
    };

    PlayFabClient.LoginWithPlayFab(loginRequest, LoginCallback);    
}

function LoginCallback(error: any, result: any)
{
    if(result !== null)
    {
        console.log("Playfab User Logged In!");
    }
    else if(error !== null)
    {
        console.error(CompileErrorReport(error));
    }
}

// This is a utility function we haven't put into the core SDK yet. Feel free to use it.
function CompileErrorReport(error: any) {
    if (error == null)
        return "";
    var fullErrors = error.errorMessage;
    for (var paramName in error.errorDetails)
        for (var msgIdx in error.errorDetails[paramName])
            fullErrors += "\n" + paramName + ": " + error.errorDetails[paramName][msgIdx];
    return fullErrors;
}
