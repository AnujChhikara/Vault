import dbConnect from "@/lib/dbConnect";
import { ApiResponse } from "@/types/ApiResponse";
import { CodeSnippetModel } from "@/model/Code";

export async function GET(request:Request){

    await dbConnect()
    try {
        const {searchParams} = new URL(request.url)
        const queryParam = {
            query:searchParams.get('query')
        }

        const searchTerms = queryParam.query?.split(' ');

    // Construct the query
    const query = {
      $or: [
        { title: { $in: searchTerms?.map(term => new RegExp(term, 'i')) } },
        { keywords: { $in: searchTerms?.map(term => new RegExp(term, 'i')) } },
      ]
    };

    // Execute the search
    const results = await CodeSnippetModel.find(query);
    if(!results){
        return Response.json({
            success:false,
            message:'Error finding code snippets'
            },
        {status:404})
    }

    return Response.json({
            success:true,
            message:'Successfully get search result',
            data: results
            },
        {status:200})
 
    } catch (error) {
        console.log("Error finding codes", error)
        return Response.json({
            success:false,
            message:'Error finding code'
            },
        {status:500})
    }
}