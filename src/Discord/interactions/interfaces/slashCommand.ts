export interface ISlashCommand
{
    name: string;
    global: boolean;
    type: number;
    description: string;
    
    options: any;
    executes: string;
}