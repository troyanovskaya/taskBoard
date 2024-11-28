import { List, Task } from "./Task";

export interface Board{
    title: string, 
    ref: List, 
    id: string, 
    tasks: Task[], 
    connectedTo: string[]
}