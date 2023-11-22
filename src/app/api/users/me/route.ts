import { getDataFromToken } from "@/app/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();
export async function GET(request: NextRequest) {
  try {
    const userFromHelper: any = getDataFromToken(request);
    const userID = userFromHelper.id;
    //console.log(userFromHelper.id);
    const user = await User.findOne({ _id: userID }).select("-password");
    return NextResponse.json({ message: "User Found", user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
