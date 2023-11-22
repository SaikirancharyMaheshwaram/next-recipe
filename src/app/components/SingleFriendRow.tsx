"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IoPersonAddOutline } from "react-icons/io5";
import { HiOutlineUserRemove } from "react-icons/hi";
import { AppDispatch, useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { setFriends } from "../redux/features/user-slice";
import { Button } from "@nextui-org/react";
import axios from "axios";
const SingleFriendRow = ({ item }: any) => {
  const proifleChange=()=>{
    
  }
  const handleAddFriend = async () => {
    const response = await axios.put("/api/users/addfriend", {
      userOwner: item._id,
      userId: currentUser._id,
    });
    //toast.success(response.data);
    dispatch(setFriends(response.data.formattedFriends));
  };
  const currentUser = useAppSelector((state) => state.userSlice.user);
  const dispatch = useDispatch<AppDispatch>();
  const friends = currentUser.friendsList;
  const isFriend = friends.find((friend) => friend._id === item._id);

  //console.log(item.image);
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={item.image} onClick={proifleChange}/>
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">{item.username}</p>
          <p className="text-sm text-muted-foreground">{item.occupation}</p>
        </div>
      </div>
      {isFriend ? (
        <Button
          isIconOnly
          className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 relative top-2  "
          radius="full"
          variant="light"
          onClick={handleAddFriend}
        >
          <HiOutlineUserRemove className="text-2xl" />
        </Button>
      ) : (
        <Button
          isIconOnly
          className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 relative top-2  "
          radius="full"
          variant="light"
          onClick={handleAddFriend}
        >
          <IoPersonAddOutline className="text-2xl" />
        </Button>
      )}
    </div>
  );
};

export default SingleFriendRow;
