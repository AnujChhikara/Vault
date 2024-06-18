import dbConnect from "@/lib/dbConnect";
import { SavingModel } from "@/model/Save";

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const codeId = searchParams.get("codeId");
    const userId = searchParams.get("userId");

    const isSaved = await SavingModel.findOne({ codeId, userId });
    if (isSaved) {
      return Response.json(
        {
          success: true,
          message: "Successfully fetch isSaved status",
          data: isSaved,
        },
        { status: 200 }
      );
    }
    return Response.json(
      { success: false, message: "Code is not saved" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while checking isSaved", error);
    return Response.json(
      { success: false, message: "Error finding isSaved status code" },
      { status: 500 }
    );
  }
}
