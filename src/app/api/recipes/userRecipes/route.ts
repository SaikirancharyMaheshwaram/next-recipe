import { getDataFromToken } from "@/app/utils/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";
import Recipe from "@/models/recipeModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function GET(request: NextRequest) {
  try {
    const userFromHelper: any = getDataFromToken(request);
    const userId = userFromHelper.id;

    //sending the user id
    const recipes = await Recipe.find({ userOwner: userId });
    console.log(recipes);
    return NextResponse.json({ recipes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
