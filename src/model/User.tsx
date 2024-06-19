import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  _id: Schema.Types.ObjectId;
  username: string;
  email: string;
  password?: string;
  verifyCode?: string;
  verifyCodeExpiry?: Date;
  bio?: string;
  social?: {
    github?: string;
    linkedin?: string;
    website?: string;
    twitter?: string;
  };
  bookmarkedStatus: boolean;
  isVerified: boolean;
  codeCred?: number;
}

const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [
      /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
      "Please use a valid email address",
    ],
  },
  password: {
    type: String,
  },
  verifyCode: {
    type: String,
  },
  verifyCodeExpiry: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },

  codeCred: {
    type: Number,
    default: 0,
  },
  bio: {
    type: String,
  },
  social: {
    github: { type: String },
    linkedin: { type: String },
    website: { type: String },
    twitter: { type: String },
  },
  bookmarkedStatus: {
    type: Boolean,
    default: true,
  },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export { UserModel, UserSchema };
