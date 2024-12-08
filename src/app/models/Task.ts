export type List = 'do'| 'progress' |'done';
export class Task{
    public creatorId?: string;
    public userId?: string;
    public task?: string;
    public status?: List | undefined;
    public id:string | null = null;
    public num: number;
    public teamId:string;
    constructor(status:List | undefined, num:number, teamId:string){
        this.status = status;
        this.num = num;
        this.teamId = teamId;
    }
    setValues(creatorId: string, userId:string, task:string, ){
        this.creatorId = creatorId;
        this.userId = userId;
        this.task = task;
    }
    setId(id:string | null){
        this.id = id;
    }
}