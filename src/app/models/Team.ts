import { Board } from "./Board";

export interface Team{
    adminId: string,
    // members: {userId: string, board:Board}[],
    members: string[],
    description: string[],
    name: string
}