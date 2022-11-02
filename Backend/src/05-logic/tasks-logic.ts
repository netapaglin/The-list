
import { ITaskModel, TaskModel } from '../03-models/task-model';
import ErrorModel from "../03-models/error-model";
import { IListModel, ListModel } from '../03-models/list-model';


async function getAllLists(): Promise<IListModel[]> {
    return ListModel.find().exec();
}

async function getAllTasks(): Promise<ITaskModel[]> {
    return TaskModel.find().exec();
    // return TaskModel.find().exec();
}

async function getTaskByList(listNameId: string): Promise<ITaskModel[]> {
    const TaskByList = await TaskModel.find({ listNameId: listNameId }, null, { sort: { done: -1 } }).exec()
    if (!TaskByList) throw new ErrorModel(404, `can not fint this list: ${listNameId}`)
    return TaskByList
}

async function addList(list: IListModel): Promise<IListModel> {
    const errors = list.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);
    return list.save();
}

async function addTask(task: ITaskModel): Promise<ITaskModel> {
    const errors = task.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);
    return task.save();
}

async function updateTask(task: ITaskModel): Promise<ITaskModel> {
    const errors = task.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);

    const updatedTask = await TaskModel.findByIdAndUpdate(task._id, task, { returnOriginal: false }).exec(); // returnOriginal: false --> return back the db product and not the product sent to the function.
    if (!updatedTask) throw new ErrorModel(404, `_id ${task._id} not found`);

    return updatedTask;
}

async function updateList(list: IListModel): Promise<IListModel> {
    const errors = list.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);

    const updatedList = await ListModel.findByIdAndUpdate(list._id, list, { returnOriginal: false }).exec(); // returnOriginal: false --> return back the db product and not the product sent to the function.
    if (!updatedList) throw new ErrorModel(404, `_id ${list._id} not found`);

    return updatedList;
}

async function deleteTask(_id: string): Promise<void> {
    const deletedTask = await TaskModel.findByIdAndDelete(_id).exec();
    if (!deletedTask) throw new ErrorModel(404, `_id ${_id} not found`);
}


async function deleteList(_id: string): Promise<void> {
    await TaskModel.deleteMany({ listNameId: _id })
    const deletedList = await ListModel.findByIdAndDelete(_id).exec();
    if (!deletedList) throw new ErrorModel(404, `_id ${_id} not found`);
}

// // UPDATE Products SET...
// async function updateProduct(product: IProductModel): Promise<IProductModel> {
//     const errors = product.validateSync();
//     if (errors) throw new ErrorModel(400, errors.message);

//     const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, { returnOriginal: false }).exec(); // returnOriginal: false --> return back the db product and not the product sent to the function.
//     if (!updateProduct) throw new ErrorModel(404, `_id ${product._id} not found`);

//     return updatedProduct;
// }

// // DELETE FROM Products...
// async function deleteProduct(_id: string): Promise<void> {
//     const deletedProduct = await ProductModel.findByIdAndDelete(_id).exec();
//     if (!deletedProduct) throw new ErrorModel(404, `_id ${_id} not found`);
// }


export default {
    getAllTasks,
    getAllLists,
    getTaskByList,
    addTask,
    addList,
    updateTask,
    deleteTask,
    deleteList,
    updateList
};
