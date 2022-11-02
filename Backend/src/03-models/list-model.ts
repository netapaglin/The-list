import { Document, model, Schema } from "mongoose";

// 1. Interface describing category:
export interface IListModel extends Document {
    listName: string;
    date: Date;
}

// 2. Schema describing category:
const ListSchema = new Schema<IListModel>({
    listName: {
        type: String,
        required: [true, "Missing list name"],
        minlength: [2, "Name too short"],
        maxlength: [100, "name too long"],
        trim: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now 
    }
}, {
    versionKey: false
});

// 3. Category Model:
export const ListModel = model<IListModel>("ListModel", ListSchema, "lists");
