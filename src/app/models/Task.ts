import { Comm } from "./Comm";

export type List = 'do'| 'progress' |'done';
export class Task{
    constructor(
    public creatorId: string,
    public userId: string,
    public task: string,
    public status: List |undefined,
    public id?:string){}
    changeMessage(message:string){
        this.task = message;

    }
}