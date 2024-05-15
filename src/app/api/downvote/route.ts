import dbConnect from "@/lib/dbConnect";
import { CodeSnippetModel } from "@/model/Code";


export async function GET(request:Request){

    await dbConnect()

    try {
         
       const {searchParams} = new URL(request.url)
        const codeId= searchParams.get('codeId')
        const codeSnippet = await CodeSnippetModel.findByIdAndUpdate(codeId,
          { $inc: { upvotes: -1} }, 
          { new: true } 
        )
         if(!codeSnippet){
            return Response.json({success:false,message:"Failed to downvote"}, {status:404})
                                        
        }
         if(codeSnippet){
            return Response.json({success:true,message:"Code downvoted Successfully"}, {status:200})
                                        
        }
       
       

    } catch (error) {
        console.log('Error whiie downvoting',error) 
       return Response.json(
        {
            success:false,
            message:"Error downvoting code"
        },{
            status:500
        }
       )
        
    }
} 