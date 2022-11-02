import axios from "axios";
import TaskModel from "../Models/TaskModel";
import store from "../Redux/Store";
import { addTaskAction, deleteTaskAction, fetchTaskAction, updateTaskAction } from "../Redux/TaskState";
import config from "../Utils/Config";


class TasksService {

    // Get all tasks: 
    public async getAllTasks(): Promise<TaskModel[]> {
        if (store.getState().tasksState.tasks.length === 0) {
            const response = await axios.get<TaskModel[]>(config.tasksUrl);
            const tasks = response.data;
            store.dispatch(fetchTaskAction(tasks))
        }

        return store.getState().tasksState.tasks
    }


    public async getTasksByList(listId: string): Promise<TaskModel[]> {
        const response = await axios.get<TaskModel[]>(config.tasksByListUrl + listId);
        const tasks = response.data.reverse();
        store.dispatch(fetchTaskAction(tasks))
        return store.getState().tasksState.tasks
    }

    // Add task: 
    public async addTask(task: TaskModel, listId: string): Promise<TaskModel> {
        task.done = false
        const response = await axios.post<TaskModel>(config.addTaskUrl + listId, task);
        store.dispatch(addTaskAction(response.data));
        return response.data;
    }

    // Edit task: 
    public async editTask(task: TaskModel, taskId: string, dispatch: any): Promise<TaskModel> {
        const response = await axios.put<TaskModel>(config.editTaskUrl + taskId, task);
        dispatch(updateTaskAction(response.data));
        return response.data;
    }

    // Delete task: 
    public async deleteTasks(taskId: string): Promise<void> {
        await axios.delete(config.deletetasksUrl + taskId);
        store.dispatch(deleteTaskAction(taskId));
    }

}

const tasksService = new TasksService()
export default tasksService;