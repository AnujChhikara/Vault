import dbConnect from "@/lib/dbConnect";
import { VotingModel } from "@/model/Vote";

export async function GET(request: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const codeId = searchParams.get('codeId');

        if (!codeId) {
            return Response.json({ success: false, message: "codeId parameter is missing" }, { status: 400 });
        }

        const data = await VotingModel.aggregate([
            {
                $match: {
                    codeId: codeId
                }
            },
            {
                $group: {
                    _id: codeId,
                    totalVotes: { $sum: "$vote" }
                }
            }
        ]);

        if (data.length === 0) {
            return Response.json({ success: false, message: "No data found for the provided codeId" }, { status: 404 });
        }

        const totalVotes = data[0].totalVotes;

        return Response.json({ success: true, totalVotes }, { status: 200 });

    } catch (error) {
        console.log('Error while retrieving total votes', error);
        return Response.json({ success: false, message: "Error finding total votes" }, { status: 500 });
    }
}
