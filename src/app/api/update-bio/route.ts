import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { userId, bio } = await request.json();

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          bio: bio,
        },
      },
      { new: true }
    ).select("-password");

    if (user) {
      return Response.json(
        {
          success: true,
          data: user,
          message: "User Bio Updated successfully",
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: false,

        message: "Failed to update user bio",
      },
      { status: 404 }
    );
  } catch (error) {
    console.log("Error updating bio", error);
    return Response.json(
      {
        success: false,
        message: "Error Updating user bio",
        data: error,
      },
      {
        status: 500,
      }
    );
  }
}
