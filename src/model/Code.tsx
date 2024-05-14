import mongoose, {Schema} from "mongoose";
import { User} from "./User";
export interface CodeSnippet {
    title: string;
    keywords: string;
    dependencies: string;
    code: string;
    owner: Schema.Types.ObjectId | User["_id"];
    upvotes: number;
    note:string;
    createdAt: Date;
}

const CodeSnippetSchema: Schema<CodeSnippet> = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    
    note: {
        type: String,
      
    },
    keywords: {
        type: String,
        required:[true, "Keywords are required"]
    
    },
    dependencies: {
        type: String,
       
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