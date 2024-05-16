import dbConnect from "@/lib/dbConnect";
import { VotingModel } from "@/model/Vote";

export async function GET(request: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const codeId = searchParams.get('codeId');
        const userId = searchParams.get('userId');

        const vote = await VotingModel.findOne({ codeId, userId});
        if(vote){

        if (vote.vote ===1) {
            return Response.json({ success: false, message: "Already upvoted" }, { status: 400 });
        } 
        else if(vote.vote === -1){
            await VotingModel.findByIdAndUpdate(vote?._id, { $inc: {vote:2} },
            { new: true })
            return Response.json({ success: true, message: "upvoted successfully", data:vote }, { status: 200 });
        }
        else if(vote.vote === 0){
           const newVote = await VotingModel.findByIdAndUpdate(vote?._id, { $inc: {vote:1} },
            { new: true })
            return Response.json({ success: true, message: "upvoted successfully", data:newVote }, { status: 200 });
        }
    
    } 


            const newVote = await VotingModel.create({ userId, codeId, vote: 1 });
            await newVote.save();
            return Response.json({ success: true, message: "upvoted successfully" }, { status: 200 });
       
        
       
    } catch (error) {
        console.log('Error while upvoting', error);
        return Response.json({ success: false, message: "Error upvoting code" }, { status: 500 });
    }
}
