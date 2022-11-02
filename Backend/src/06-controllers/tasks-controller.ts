
import express, { NextFunction, Request, Response } from "express";
import logic from "../05-logic/tasks-logic";
import { ListModel } from '../03-models/list-model';
import { TaskModel } from '../03-models/task-model';

const router = express.Router();

router.get("/lists", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const lists = await logic.getAllLists()
        response.json(lists);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/tasks", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const tasks = await logic.getAllTasks()
        response.json(tasks);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/tasks/:listId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const listId = request.params.listId;
        const tasks = await logic.getTaskByList(listId)
        response.json(tasks);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/lists", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const list = new ListModel(request.body);
        const addedList = await logic.addList(list);
        response.status(201).json(addedList);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/task/:listId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.listNameId = request.params.listId;
        const task = new TaskModel(request.body);
        const addedTask = await logic.addTask(task);
        response.status(201).json(addedTask);
    }
    catch (err: any) {
        next(err);
    }
});


router.put("/task/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body._id = request.params._id;
        const task = new TaskModel(request.body);
        const updatedTask = await logic.updateTask(task);
        response.json(updatedTask);
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/list/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body._id = request.params._id;
        const list = new ListModel(request.body);
        const updatedList = await logic.updateList(list);
        response.json(updatedList);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/list/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        // await logic.deleteTask({ listNameId: _id });
        await logic.deleteList(_id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/task/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await logic.deleteTask(_id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
