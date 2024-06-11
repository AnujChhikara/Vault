import dbConnect from "@/lib/dbConnect";
import { VotingModel } from "@/model/Vote";
import { UserModel } from "@/model/User";


export async function GET(request: Request) {
    await dbConnect();

    try {
      


        const data = await VotingModel.aggregate([
            
  {
    $group: {
      _id: "$userId",
      totalVotes: { $sum: "$vote" },
    },
  },
  {
    $lookup: {
      from: "users",
      localField: "_id", // Field from VotingModel
      foreignField: "_id", // Field from UserModel
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
        name:"$userInfo.username",
        _id:"$userInfo._id"
      },
    },
  },
]
        );

        if (data.length === 0) {
            return Response.json({ success: false, message: "No votes found for the any user" }, { status: 404 });
        }

        return Response.json({ success: true, data }, { status: 200 });

    } catch (error) {
        console.log('Error while retrieving total votes', error);
        return Response.json({ success: false, message: "Error finding total votes of any user" }, { status: 500 });
    }
}
