import mongoose, {Schema, Document} from "mongoose";

export interface Vote extends Document{
    userId:string;
    codeId:string;
    vote: number;
}

const VoteSchema:Schema<Vote> = new Schema({
    userId:{
        type:String,
    },
    codeId: {
        type: String,
    },

    vote:{
        type:Number,
        default:0
    }
   
   
})

export const VotingModel = mongoose.models.Vote as mongoose.Model<Vote> || mongoose.model<Vote>("Vote", VoteSchema);

