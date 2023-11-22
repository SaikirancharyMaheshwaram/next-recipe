import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt, { genSalt } from "bcrypt";

// connecting to the database
connect();
export async function POST(request: NextRequest) {
  try {
    //taking the data from request
    const body = await request.json();
    const { username, password, email, image, friends, location, occupation } =
      body;
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "User Already Exists" },
        { status: 400 }
      );
    }
    //hashing
    //creating the salt

    const salt = await genSalt(10);

    //creating the hashed password

    const hashedPassword = await bcrypt.hash(password, salt);

    //creating new user

    const newuser = new User({
      username,
      password: hashedPassword,
      email,
      image,
      location,
      occupation,
      friends,
      profileCount: Math.floor(Math.random() * 1000),
    });
    const newuserSaved = await newuser.save();
    console.log(newuserSaved);

    return NextResponse.json({
      message: "Register Successfully",
      success: true,
      newuserSaved,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "error",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
