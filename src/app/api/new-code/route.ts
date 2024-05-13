import dbConnect from "@/lib/dbConnect";
import { CodeSnippetModel } from "@/model/Code";


export async function POST(request:Request){

    await dbConnect()

    try {
         
        const {title, keywords, code, dependencies, note, userId} = await request.json()
        if (!title || !keywords || !code || !dependencies || !note || !userId) {
             return Response.json( {
            success:false,
            message:"One or more required fields are missing.",
    
        },{
            status:400
        })
        }
        const codeSnippet = await CodeSnippetModel.create({
            title,
            code,
            dependencies,
            note,
            keywords,
            owner:userId
        })

       const newCodeSnippet = await codeSnippet.save()

       if(newCodeSnippet){
        return Response.json( {
            success:true,
            message:"snippet added successfully",
            data:newCodeSnippet
        },{
            status:200
        })
       }

        return Response.json( {
            success:false,
            message:"failed to create new snippet",

        },{
            status:400
        })

        
       

    } catch (error) {
        console.log('Error creating code snippet',error) 
       return Response.json(
        {
            success:false,
            message:"Error Creating code"
        },{
            status:500
        }
       )
        
    }
} 