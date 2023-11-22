import { connect } from "@/dbConfig/dbConfig";
import Recipe from "@/models/recipeModel"
import { NextRequest, NextResponse } from "next/server";
connect()

export async function GET(){

   try {
    const recipes=await Recipe.find({});
    return NextResponse.json({recipes});
    
   } catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
    
   }

}
