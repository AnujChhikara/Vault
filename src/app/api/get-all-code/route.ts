import dbConnect from "@/lib/dbConnect";
import { CodeSnippetModel } from "@/model/Code";


export async function GET(request:Request){
    await dbConnect()

    try {
      
        
        const code = await CodeSnippetModel.find()
        if(!code){
            return Response.json({success:false,message:"No such code snippet exist"}, {status:404})
                                        
        }
        if(code){
            return Response.json({success:true,data:code,message:"Code Snippets details fetch successfully"}, {status:200})
        }

    } catch (error) {
        console.log('Error finding code snippets',error) 
       return Response.json(
        {
            success:false,
            message:"Error finding code"
        },{
            status:500
        }
       )
        
    }
} 