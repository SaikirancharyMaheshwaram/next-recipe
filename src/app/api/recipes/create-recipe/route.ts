import { connect } from "@/dbConfig/dbConfig";
import Recipe from "@/models/recipeModel";
import { NextRequest, NextResponse } from "next/server";
connect();
interface Recipe {
  name: string;
  ingredients: object[];
  des: string;
  instructions: string;
  imageUrl: string;
  cookingTime: string;
  isTweet: boolean;
  userOwner: string;
}
export async function POST(request: NextRequest) {
  try {
    const body: Recipe = await request.json();
    console.log(body);
    const newRecipe = await new Recipe(body);
    // console.log(newRecipe);
    // console.log(newRecipe.ingredients);
    const response = await newRecipe.save();
    const posts = await Recipe.find().sort({ createdAt: -1 });
    if (response) {
      return NextResponse.json(
        { message: `${body.name} created successfully`, response, posts },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "problem" });
    }
  } catch (error: any) {
    console.log("here");
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//to delete a post by using postid
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, postId } = body;
    const post = await Recipe.findByIdAndDelete({ _id: postId });
    if (post) {
      return NextResponse.json(
        { message: "deleted Successfully" },
        { status: 200 }
      );
    }
    return NextResponse.json({ message: "something went wrong" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
//to update a post by using post id
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId } = body;
    const filter = { _id: postId };
    const update = {
      $set: {
        name: body.name,
        ingredients: body.ingredients,
        instructions: body.instructions,
        des: body.des,
        imageUrl: body.imageUrl,
        cookingTime: body.cookingTime,
      },
    };
    const result = await Recipe.updateOne(filter, update);
    if (result) {
      return NextResponse.json({ message: "updated Successfully" });
    }
    return NextResponse.json({ message: "something went wrong" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
