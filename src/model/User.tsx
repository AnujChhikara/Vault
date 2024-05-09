import mongoose, {Schema, Document} from "mongoose";


export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    codeCred: number;
}




const UserSchema:Schema<User> = new Schema({
    username:{
        type:String,
        required:[true, 'Username is required'],
        unique:true,
        trim:true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        match: [/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/, 'Please use a valid email address']
    },
    password:{
        type:String,
        required:[true, 'Password is required']
    },
    verifyCode:{
        type:String,
        required:[true, 'Verify code is required']
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true, 'verify code expiry is required']
    },
    isVerified:{
        type:Boolean,
        default:false
    },

    codeCred:{
        type:Number,
        default:0
    }
   
   
})

const UserModel = (mongoose.models.User as mongoose.
    Model<User>) || mongoose.model<User>("User", UserSchema)

export {UserModel, UserSchema}