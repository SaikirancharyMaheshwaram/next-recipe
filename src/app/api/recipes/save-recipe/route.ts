// api/recipes/[postId]/like.ts
import { connect } from "@/dbConfig/dbConfig";
import Recipe from "@/models/recipeModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PUT(request: NextRequest) {
  try {
    const { userId, postId } = await request.json();
    const post = await Recipe.findById(postId);

    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    //const updatedPost = await post.save();
    const updatedPost = await Recipe.findByIdAndUpdate(
      postId,
      { likes: post.likes },
      { new: true }
    );
    return NextResponse.json(
      { message: "Successfully saved", updatedPost },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
