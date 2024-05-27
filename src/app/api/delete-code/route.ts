import dbConnect from "@/lib/dbConnect";
import { CodeSnippetModel } from "@/model/Code";


export async function DELETE(request:Request){
    await dbConnect()

    try {
        const {searchParams} = new URL(request.url)
        const codeId = searchParams.get('codeId')
        
        const code = await CodeSnippetModel.findByIdAndDelete(codeId)
        if(!code){
            return Response.json({success:false,message:"No such code snippet exist"}, {status:404})
                                        
        }
        if(code){
            return Response.json({success:true,data:code,message:"Code Snippets deleted successfully"}, {status:200})
        }

    } catch (error) {
        console.log('Error finding code snippets',error) 
       return Response.json(
        {
            success:false,
            message:"failed to delete the code snippet"
        },{
            status:500
        }
       )
        
    }
} 