import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { userId, github, linkedin, website, twitter } = await request.json();
    const updateFields: any = {};
    if (github) updateFields["social.github"] = github;
    if (linkedin) updateFields["social.linkedin"] = linkedin;
    if (website) updateFields["social.website"] = website;
    if (twitter) updateFields["social.twitter"] = twitter;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: updateFields,
      },
      { new: true }
    ).select("-password");

    if (user) {
      return Response.json(
        {
          success: true,
          data: user,
          message: "User Social Updated successfully",
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: false,

        message: "Failed to update user social",
      },
      { status: 404 }
    );
  } catch (error) {
    console.log("Error updating user social", error);
    return Response.json(
      {
        success: false,
        message: "Error Updating user social",
        data: error,
      },
      {
        status: 500,
      }
    );
  }
}
