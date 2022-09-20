export function toErrorBlock(message: string): string
{
    return "```diff\n-ERROR: " + message + "\n```" 
}