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
          return Response.json({ success: true, message: "Successfully fetch vote status" , data:vote}, { status: 200 });
    } 
    return Response.json({ success: false, message: "Error fetching vote status" }, { status: 200 });
       
    } catch (error) {
        
        console.log('Error while upvoting', error);
        return Response.json({ success: false, message: "Error finding vote status code" }, { status: 500 });
    }
}
