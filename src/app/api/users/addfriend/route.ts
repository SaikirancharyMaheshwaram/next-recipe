import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userOwner, userId } = body;
    const user = await User.findById(userId);
    const friend = await User.findById(userOwner);

    if (user.friendsList.includes(userOwner)) {
      // User is already a friend, remove from friends list
      user.friendsList = user.friendsList.filter((id: any) => id !== userOwner);
      friend.friendsList = friend.friendsList.filter(
        (id: any) => id !== userId
      );
    } else {
      // User is not a friend, add to friends list
      user.friendsList.push(userOwner);
      friend.friendsList.push(userId);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friendsList.map((id: any) => User.findById(id))
    );

    const formattedFriends = friends.map(
      ({ _id, username, occupation, location, image }) => {
        return { _id, username, occupation, location, image };
      }
    );

    return NextResponse.json(
      { message: "success", formattedFriends },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
