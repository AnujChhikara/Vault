import mongoose, {Schema, Document} from "mongoose";
import { User } from "./User";
import { CodeSnippet } from "./Code";

export interface Vote extends Document{
    userId:Schema.Types.ObjectId | User["_id"];
    codeId:Schema.Types.ObjectId | CodeSnippet["_id"];
    vote: number;
}

const VoteSchema:Schema<Vote> = new Schema({
    userId:{
        
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    codeId: {
        
        type: Schema.Types.ObjectId,
        ref: 'CodeSnippet',
        required: true
    },

    vote:{
        type:Number,
        default:0
    }
   
   
}, {timestamps:true})

export const VotingModel = mongoose.models.Vote as mongoose.Model<Vote> || mongoose.model<Vote>("Vote", VoteSchema);

