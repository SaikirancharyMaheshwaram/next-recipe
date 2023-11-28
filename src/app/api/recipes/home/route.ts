import { connect } from "@/dbConfig/dbConfig";
import Recipe from "@/models/recipeModel";
import { NextRequest, NextResponse } from "next/server";
connect();
export async function GET(request: NextRequest) {
  try {
    const recipes = await Recipe.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ recipes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
