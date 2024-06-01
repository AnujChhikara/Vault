import dbConnect from "@/lib/dbConnect";
import { CodeSnippetModel } from "@/model/Code";
import { VotingModel } from "@/model/Vote";

export async function GET(request: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const time = searchParams.get('time');
        const now = new Date()
        
        let filter = {};
        if (time === 'week') {
            const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            filter = { createdAt: { $gte: oneWeekAgo } };
        } else if (time === 'month') {
            const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            filter = { createdAt: { $gte: oneMonthAgo } };
        } 
        
         const data = await VotingModel.aggregate([
            {
                $match: filter
            },
            {
                    $group: {
                        _id: "$codeId",
                     totalVotes: { $sum: "$vote" }
                        }},
                    {
                    $lookup: {
                        from: "codesnippets",
                        localField: "_id",
                        foreignField: "_id",
                        as: "code"
                    }
                    },
                    {$addFields: {
                    code: {
                        $first: "$code"
                    }
                    }}
                    ]);

          return Response.json({ success: true, data }, { status: 200 });


    } catch (error) {
         console.log('Error while retrieving total votes', error);
        return Response.json({ success: false, message: "Error finding total votes" }, { status: 500 });
    }


}