import { Comm } from "./Comm";

export enum List{
    'to do',
    'in process',
    'done'
}
export interface Task{
    userId:string,
    list: List,
    teamId:string,
    taskMessage:string,
    creationTime:string,
    edited:boolean,
    comms: Comm[]
}