import dbConnect from "@/lib/dbConnect";
import { VotingModel } from "@/model/Vote";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return Response.json(
        { success: false, message: "userId parameter is missing" },
        { status: 400 }
      );
    }
    const objectIdUserId = new mongoose.Types.ObjectId(userId);

    const data = await VotingModel.aggregate([
      {
        $match: {
          userId: objectIdUserId,
        },
      },

      {
        $group: {
          _id: "$userId",
          totalVotes: { $sum: "$vote" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $project: {
          _id: 0,
          totalVotes: 1,
          user: {
            name: "$userInfo.username",
            _id: "$userInfo._id",
          },
        },
      },
    ]);

    if (data.length === 0) {
      return Response.json(
        { success: false, message: "No votes found for the specified user" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.log("Error while retrieving total votes", error);
    return Response.json(
      { success: false, message: "Error finding total votes of this user" },
      { status: 500 }
    );
  }
}
