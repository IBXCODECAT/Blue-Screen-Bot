//makes string an error block
export function toErrorBlock(message: string): string
{
    return "```diff\n-ERROR: " + message + "\n```" 
}

//Makes string bold
export function toBold(message: string): string
{
    return `**${message}**`;
}

//Formats a string to write as a slash command link
export function toSlashCommandFormat(message: string): string
{
    return `</${message}:0>`;
}

export function toUnderline(message: string): string
{
    return `__${message}__`;
}