import { ListModel } from './list-model';
import { model, Schema } from "mongoose";
import Document from "mongoose";

// 1. Model Interface describing the data in the model:
export interface ITaskModel extends Document {
    description: string;
    done: boolean;
    listNameId: Schema.Types.ObjectId;
}

// 2. Model Schema describing validation, constraints and more:
const TaskSchema = new Schema<ITaskModel>({
    description: {
        type: String,
        required: [true, "Missing description"],
        minlength: [2, "Description too short"],
        maxlength: [200, "Description too long"],
        trim: true
    },
    done: {
        type: Boolean,
    },
    listNameId: {
        type: Schema.Types.ObjectId
    }
}, {
    versionKey: false, // Don't create __v field for versioning
    toJSON: { virtuals: true }, // When converting db to json - allow to bring virtual fields
    id: false // Don't duplicate _id into id field
});

// Virtual Fields:
TaskSchema.virtual("lists", {
    ref: ListModel, // Which model are you describing?
    localField: "listNameId", // Which field in our model is it
    foreignField: "_id", // Which field in CategoryModel is it
    justOne: true // category is a single object and not array
});


// 3. Model Class - this is the final model class:
export const TaskModel = model<ITaskModel>("TaskModel", TaskSchema, "tasks");
