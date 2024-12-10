import { Board } from "./Board";

export interface Team{
    id?:string;
    adminId: string,
    members: string[],
    description: string,
    name: string,
    default: boolean;
}