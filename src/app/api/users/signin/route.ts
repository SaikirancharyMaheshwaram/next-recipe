import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt, { genSalt } from "bcrypt";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User Doesn't Exists Please Register" },
        { status: 400 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Username Or Password Incorrect" },
        { status: 400 }
      );
    }
    //sigining the jwt token and sending to frontend and set up as cookie

    //create a data token

    const tokendata = {
      id: user._id,
      username: user.username,
      email: user.email,
      image: user.image,
      occupation: user.occupation,
      location: user.location,
    };
    //creating the token
    const token = await jwt.sign(tokendata, process.env.SECRET_TOKEN!, {
      expiresIn: "1d",
    });

    // creating a respone for setting up the cookie from the server

    const response = NextResponse.json(
      { message: "Sign In Successfully", success: true },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
