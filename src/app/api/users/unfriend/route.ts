import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import Friend from "@/models/friendModel";
import { connect } from "@/dbConfig/dbConfig";
connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userOwner, userId } = body;
    //userOwner is friend ID
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json(
        { message: "User Doesn't Exists Please Register" },
        { status: 400 }
      );
    }

    user.friendsList = user.friendsList.filter(
      (item: any) => item._id != userOwner
    );

    const response = await user.save();

    return NextResponse.json({ message: "success", response });
  } catch (error: any) {
    NextResponse.json({ error: error }, { status: 501 });
  }
}
