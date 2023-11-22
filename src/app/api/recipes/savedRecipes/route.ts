import { connect } from "@/dbConfig/dbConfig";
import Recipe from "@/models/recipeModel"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connect()

export async function POST(request:NextRequest){

   try {
    const body=await request.json();
    const {userId}=body;
    //sending the user id 
    const recipes=await User.find({userId});
    console.log(recipes);
    return NextResponse.json({recipes});
    
   } catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
    
   }

}