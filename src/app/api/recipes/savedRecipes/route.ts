import { connect } from "@/dbConfig/dbConfig";
import Recipe from "@/models/recipeModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;
    const allrecipes = await Recipe.find({}).sort({ createdAt: -1 });
    const savedRecipes = allrecipes.filter((post) => {
      const isLiked = post.likes.get(userId);
      if (isLiked) {
        return post;
      }
    });
    //sending the user id
    console.log(savedRecipes);
    return NextResponse.json({ recipes: savedRecipes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
