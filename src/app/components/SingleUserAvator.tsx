import React, { useEffect, useState } from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { HiOutlineUserRemove } from "react-icons/hi";
import { GiLaurelCrown } from "react-icons/gi";
import { User } from "@nextui-org/react";
import axios from "axios";
import {
  Card,
  CardBody,
  Image,
  Button,
  Slider,
  CardHeader,
} from "@nextui-org/react";
import { AppDispatch, useAppSelector } from "../redux/store";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setFriends } from "../redux/features/user-slice";

export default function SingleUserAvator({ userId }: any) {
  const currentUser = useAppSelector((state) => state.userSlice.user);
  const dispatch = useDispatch<AppDispatch>();
  const friends = currentUser.friendsList;
  //checking the posts owner with current user friendlist item
  const isFriend = friends.find((friend: any) => friend._id === userId);
  const [user, setUser] = useState({
    username: "",
    image: "",
    location: "",
  });
  useEffect(() => {
    const fetchingUser = async () => {
      const res = await axios.post("/api/users/singleUser", {
        email: userId,
      });
      setUser(res.data.user);
    };
    fetchingUser();
  },[dispatch]);
  const handleAddFriend = async () => {
    const response = await axios.put("/api/users/addfriend", {
      userOwner: userId,
      userId: currentUser._id,
    });
    //toast.success(response.data);
    dispatch(setFriends(response.data.formattedFriends));
  };
  const isCurrentUser = currentUser._id === userId;

  return (
    <div className="flex justify-between  w-full">
      <User
        name={user.username}
        description={user.location}
        avatarProps={{
          src: user.image,
        }}
      />
      {isCurrentUser ? (
        <Button
          isIconOnly
          className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 relative top-2  "
          radius="full"
          variant="light"
          isDisabled
        >
          <GiLaurelCrown className="text-2xl" />
        </Button>
      ) : isFriend ? (
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
}
