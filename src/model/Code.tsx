import mongoose, {Schema} from "mongoose";
import { User} from "./User";
export interface CodeSnippet {
    title: string;
    keywords: string[];
    dependencies: string[];
    code: string;
    owner: Schema.Types.ObjectId | User["_id"];
    upvotes: number;
    createdAt: Date;
}

const CodeSnippetSchema: Schema<CodeSnippet> = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    keywords: {
        type: [String],
        default: []
    },
    dependencies: {
        type: [String],
        default: []
    },
    code: {
        type: String,
        required: [true, 'Code is required']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const CodeSnippetModel = mongoose.models.CodeSnippet as mongoose.Model<CodeSnippet> || mongoose.model<CodeSnippet>("CodeSnippet", CodeSnippetSchema);