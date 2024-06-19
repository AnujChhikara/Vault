import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { userId } = await request.json();

    const user = await UserModel.updateOne(
      { _id: userId },
      [
        {
          $set: {
            bookmarkedStatus: {
              $cond: { if: "$bookmarkedStatus", then: false, else: true },
            },
          },
        },
      ],
      { new: true }
    ).select("-password");

    if (user) {
      return Response.json(
        {
          success: true,
          data: user,
          message: "Bookmark toggled successfully",
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: false,

        message: "Failed to toggle bookmark status",
      },
      { status: 404 }
    );
  } catch (error) {
    console.log("Error toggleing bookmark", error);
    return Response.json(
      {
        success: false,
        message: "Error toggleing bookmark",
        data: error,
      },
      {
        status: 500,
      }
    );
  }
}
