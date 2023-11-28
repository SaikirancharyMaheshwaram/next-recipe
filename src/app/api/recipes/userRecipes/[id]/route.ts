import { connect } from "@/dbConfig/dbConfig";
import Recipe from "@/models/recipeModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: any } }
) {
  try {
    console.log(params);

    //sending the user id
    const recipes = await Recipe.find({ userOwner: params.id });
    console.log(recipes);
    return NextResponse.json({ recipes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
