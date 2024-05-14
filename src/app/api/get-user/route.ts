import dbConnect from "@/lib/dbConnect";
import {UserModel} from "@/model/User";


export async function GET(request:Request){
    await dbConnect()

    try {
        const {searchParams} = new URL(request.url)
        const username = searchParams.get('username') 
        const userId = searchParams.get('userId');

        if(username){
            const user = await UserModel.findOne({username:username, isVerified:true})
            
        if(!user){
            return Response.json({success:false,message:"No User found!"}, {status:404})
                                        
        }
        if(user){
            return Response.json({success:true,data:user,message:"User details fetch successfully"}, {status:200})
        }
        }
        if(userId){
              const user = await UserModel.findById(userId)
            
        if(!user){
            return Response.json({success:false,message:"No User found!"}, {status:404})
                                        
        }
        if(user){
            return Response.json({success:true,data:user,message:"User details fetch successfully"}, {status:200})
        }
        }
        

    } catch (error) {
        console.log('Error finding user profile',error) 
       return Response.json(
        {
            success:false,
            message:"Error finding user"
        },{
            status:500
        }
       )
        
    }
} 