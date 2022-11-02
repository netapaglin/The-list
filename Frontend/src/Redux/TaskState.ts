

import TaskModel from "../Models/TaskModel";

// Products State - products data needed in the application level:
export class TaskState {
    public tasks: TaskModel[] = [];
}

// Products Action Type - any action which can be done on the above products state:
export enum TasksActionType {
    FetchTasks = "FetchTasks",
    AddTasks = "AddTasks",
    UpdateTasks = "UpdateTasks",
    DeleteTask = "DeleteTask"
}

// Products Action - any single object sent to the store during "dispatch":
export interface TasksAction {
    type: TasksActionType;
    payload: any;
}

// Products Action Creators - function for creating ProductsAction objects. each function creates one Action object:
export function fetchTaskAction(tasks: TaskModel[]): TasksAction {

    return { type: TasksActionType.FetchTasks, payload: tasks };
}
export function addTaskAction(tasks: TaskModel): TasksAction {
    return { type: TasksActionType.AddTasks, payload: tasks };
}
export function updateTaskAction(tasks: TaskModel): TasksAction {
    return { type: TasksActionType.UpdateTasks, payload: tasks };
}
export function deleteTaskAction(id: string): TasksAction {
    return { type: TasksActionType.DeleteTask, payload: id };
}

export function tasksReducer(currentState = new TaskState(), action: TasksAction): TaskState {

    const newState = { ...currentState };

    switch (action.type) {

        case TasksActionType.FetchTasks:
            newState.tasks = action.payload; // Here the payload is the products list.
            break;

        case TasksActionType.AddTasks:

            newState.tasks = [...newState.tasks, action.payload]
            break;

        case TasksActionType.UpdateTasks:
            const indexToUpdate = newState.tasks.findIndex(p => p._id === action.payload._id); // Here the payload is a single object to update.
            let newTasks = [...newState.tasks]
            if (indexToUpdate >= 0) {
                newTasks[indexToUpdate] = action.payload;
                newState.tasks = newTasks
            }
            break;

        case TasksActionType.DeleteTask:
            const indexToDelete = newState.tasks.findIndex(p => p._id === action.payload); // Here the payload is the id to delete.
            if (indexToDelete >= 0) {
                let newTasks = [...newState.tasks]
                newTasks.splice(indexToDelete, 1);
                newState.tasks = newTasks
            }
            break;
    }
    return newState;
}
