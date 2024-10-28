import { Task } from "./Task";

export interface Board{
    todo: Task[], 
    process:Task[], 
    done: Task[]
}