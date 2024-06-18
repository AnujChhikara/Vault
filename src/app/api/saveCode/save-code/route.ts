import dbConnect from "@/lib/dbConnect";
import { SavingModel } from "@/model/Save";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { userId, codeId } = await request.json();

    const bookmarkdCode = await SavingModel.findOne({
      userId,
      codeId,
    });
    if (bookmarkdCode) {
      return Response.json(
        { success: false, message: "Code is Already bookmarkd" },
        { status: 400 }
      );
    }

    const newbookmark = await SavingModel.create({ userId, codeId });
    await newbookmark.save();
    if (!newbookmark) {
      return Response.json(
        { success: false, message: "failed to bookmark the code" },
        { status: 502 }
      );
    }
    return Response.json(
      { success: true, message: "Code bookmarkd Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while saving", error);
    return Response.json(
      { success: false, message: "Error saving code" },
      { status: 500 }
    );
  }
}
