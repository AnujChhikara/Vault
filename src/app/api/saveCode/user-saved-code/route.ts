import dbConnect from "@/lib/dbConnect";
import { SavingModel } from "@/model/Save";
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

    const savedCode = await SavingModel.aggregate([
      {
        $match: {
          userId: objectIdUserId,
        },
      },

      {
        $lookup: {
          from: "codesnippets",
          localField: "codeId",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $group: {
          _id: "$userId",
          codes: { $push: "$result" },
        },
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          codes: {
            $reduce: {
              input: "$codes",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] },
            },
          },
        },
      },
    ]);
    if (!savedCode) {
      return Response.json(
        {
          success: false,
          message: "No Saved code snippets found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "user saved code fetch successfully",
        data: savedCode,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching user saved codes", error);
    return Response.json(
      { success: false, message: "Error fetching user saved codes" },
      { status: 500 }
    );
  }
}
