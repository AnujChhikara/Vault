import dbConnect from "@/lib/dbConnect";
import { VotingModel } from "@/model/Vote";
import mongoose from "mongoose";
export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const codeId = searchParams.get("codeId");

    if (!codeId) {
      return Response.json(
        { success: false, message: "codeId parameter is missing" },
        { status: 400 }
      );
    }
    const objectIdCodeId = new mongoose.Types.ObjectId(codeId);

    const data = await VotingModel.aggregate([
      {
        $match: {
          codeId: objectIdCodeId,
        },
      },
      {
        $group: {
          _id: "$codeId",
          totalVotes: { $sum: "$vote" },
        },
      },
      {
        $project: {
          _id: 0,
          codeId: "$_id",
          totalVotes: 1,
        },
      },
    ]);

    if (data.length === 0) {
      return Response.json(
        { success: false, message: "No votes found for the specified codeId" },
        { status: 200 }
      );
    }

    return Response.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.log("Error while retrieving total votes", error);
    return Response.json(
      { success: false, message: "Error finding total votes" },
      { status: 500 }
    );
  }
}
