import mongoose, { Schema, Document } from "mongoose";
import { User } from "./User";
import { CodeSnippet } from "./Code";

export interface Save extends Document {
  userId: Schema.Types.ObjectId | User["_id"];
  codeId: Schema.Types.ObjectId | CodeSnippet["_id"];
}

const SaveSchema: Schema<Save> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    codeId: {
      type: Schema.Types.ObjectId,
      ref: "CodeSnippet",
      required: true,
    },
  },
  { timestamps: true }
);

export const SavingModel =
  (mongoose.models.Save as mongoose.Model<Save>) ||
  mongoose.model<Save>("Save", SaveSchema);
