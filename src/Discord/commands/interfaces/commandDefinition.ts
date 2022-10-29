export interface CommandDefinition
{
    name: string;
    global: boolean;
    description: string;
    options: any;
    procedure: string;
}