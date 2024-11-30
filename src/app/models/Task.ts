import { Comm } from "./Comm";

export type List = 'do'| 'progress' |'done';
export class Task{
    public creatorId?: string;
    public userId?: string;
    public task?: string;
    public status?: List | undefined;
    public id?:string
    constructor(status:List | undefined){
        this.status = status;
    }
    setValues(creatorId: string, userId:string, task:string){
        this.creatorId = creatorId;
        this.userId = userId;
        this.task = task;
    }


}