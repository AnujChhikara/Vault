import dbConnect from "@/lib/dbConnect";
import { VotingModel } from "@/model/Vote";

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const time = searchParams.get("time");
    const now = new Date();

    let filterDate = {};
    if (time === "week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      filterDate = { $gte: oneWeekAgo };
    } else if (time === "month") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(now.getMonth() - 1);
      filterDate = { $gte: oneMonthAgo };
    } else {
      filterDate = {};
    }

    const data = await VotingModel.aggregate([
      {
        $group: {
          _id: "$codeId",
          totalVotes: { $sum: "$vote" },
        },
      },
      {
        $lookup: {
          from: "codesnippets",
          localField: "_id",
          foreignField: "_id",
          as: "code",
        },
      },
      {
        $addFields: {
          code: { $arrayElemAt: ["$code", 0] },
        },
      },
      ...(time === "week" || time === "month"
        ? [
            {
              $match: {
                "code.createdAt": filterDate,
              },
            },
          ]
        : []),
    ]);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error while retrieving total votes:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error finding total votes" }),
      { status: 500 }
    );
  }
}
