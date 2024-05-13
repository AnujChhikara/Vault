import dbConnect from "@/lib/dbConnect";
import { CodeSnippetModel } from "@/model/Code";


export async function GET(request:Request){
    await dbConnect()

    try {
        const {searchParams} = new URL(request.url)
        const userId= searchParams.get('userId')
        
        
        const codeSnipptes = await CodeSnippetModel.find({owner:userId})
        if(!codeSnipptes){
            return Response.json({success:false,message:"No code snippets found with this user"}, {status:404})
                                        
        }
        if(codeSnipptes){
            return Response.json({success:true,data:codeSnipptes,message:"User code snippets fetch successfully"}, {status:200})
        }

    } catch (error) {
        console.log('Error finding user code snippets',error) 
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