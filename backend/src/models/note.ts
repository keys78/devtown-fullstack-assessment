import { model, Schema, Types, Document } from "mongoose";

interface Author {
    id: Types.ObjectId;
    username: string;
}

export interface Note extends Document {
    author: Author;
    category: string;
    title: string;
    tags: string[];
    note: string;
    isPersonal: boolean;
}

const noteSchema = new Schema({
    author: {
        id: { type: Types.ObjectId, required: true },
        username: { type: String, required: true }
    },
    category: { type: String, required: true },
    title: { type: String, required: true },
    tags: { type: Array, required: true },
    note: { type: String, required: true },
    isPersonal: { type: Boolean, default: false, required: true },
}, { timestamps: true });

export default model<Note>("Note", noteSchema);
