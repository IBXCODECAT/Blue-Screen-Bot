export interface CommandDefinition
{
    name: string;
    adminOnly: boolean;
    description: string;
    options: any;
    procedure: string;
}