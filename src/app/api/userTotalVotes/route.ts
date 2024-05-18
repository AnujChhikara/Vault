import dbConnect from "@/lib/dbConnect";
import { VotingModel } from "@/model/Vote";

export async function GET(request: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return Response.json({ success: false, message: "userId parameter is missing" }, { status: 400 });
        }

        const data = await VotingModel.aggregate([
            {
                $match: {
                    userId: userId  // Match documents with the specific codeId
                }
            },
            {
                $group: {
                    _id: "$userId",
                    totalVotes: { $sum: "$vote" }
                }
            },
            {
                $project: {
                    _id: 0,
                    userId: "$_id",
                    totalVotes: 1
                }
            }
        ]);

        if (data.length === 0) {
            return Response.json({ success: false, message: "No votes found for the specified user" }, { status: 404 });
        }

        return Response.json({ success: true, data }, { status: 200 });

    } catch (error) {
        console.log('Error while retrieving total votes', error);
        return Response.json({ success: false, message: "Error finding total votes of this user" }, { status: 500 });
    }
}
