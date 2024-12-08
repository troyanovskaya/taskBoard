import { Board } from "./Board";

export interface Team{
    id:string;
    adminId: string,
    members: {userId: string, board:Board}[],
    // members: string[],
    description: string,
    name: string,
    default: boolean;
}