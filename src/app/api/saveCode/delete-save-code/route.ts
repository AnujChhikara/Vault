import dbConnect from "@/lib/dbConnect";
import { SavingModel } from "@/model/Save";

export async function DELETE(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const codeId = searchParams.get("codeId");
    const userId = searchParams.get("userId");

    const deleteSavedCode = await SavingModel.findOneAndDelete({
      codeId: codeId,
      userId: userId,
    });

    if (!deleteSavedCode) {
      return Response.json(
        { success: true, message: "failed to delete saved code" },
        { status: 500 }
      );
    }
    return Response.json(
      { success: true, message: "Deleted Saved Code Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while deleting", error);
    return Response.json(
      { success: false, message: "Error deleting saved code" },
      { status: 500 }
    );
  }
}
