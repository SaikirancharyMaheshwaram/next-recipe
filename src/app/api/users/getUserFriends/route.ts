import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt, { genSalt } from "bcrypt";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;
    //console.log(body);
    const user = await User.findById({ _id: email });
    const friends = await Promise.all(
      user.friendsList.map((id: any) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, username, occupation, location, image }) => {
        return { _id, username, occupation, location, image };
      }
    );
    if (!user) {
      return NextResponse.json(
        { message: "User Doesn't Exists Please Register" },
        { status: 400 }
      );
    }

    // creating a respone for setting up the cookie from the server

    const response = NextResponse.json(
      { user, formattedFriends },
      { status: 200 }
    );

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
