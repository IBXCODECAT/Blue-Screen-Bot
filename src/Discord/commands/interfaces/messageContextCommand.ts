export interface IMessageContextCommand
{
    name: string;
    global: boolean;
    type: number;

    helpMessageDescription: string;

    procedure: string;
}