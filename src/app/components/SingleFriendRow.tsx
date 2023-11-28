"use client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IoPersonAddOutline } from "react-icons/io5";
import { HiOutlineUserRemove } from "react-icons/hi";
import { AppDispatch, useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { setFriends, setUser } from "../redux/features/user-slice";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { GiLaurelCrown } from "react-icons/gi";
import { setPosts } from "../redux/features/recipe-slice";
const SingleFriendRow = ({ item }: any) => {
  const sessionUser = useAppSelector((state) => state.userSlice.randomUser);
  const changedUser = useAppSelector((state) => state.userSlice.user);
  const proifleChange = () => {};
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
  const isFriend = friends.find((friend: any) => friend._id === item._id);

  const fetchRandomUser = async () => {
    const response = await axios.get(`api/recipes/userRecipes/${item._id}`);
    dispatch(setPosts(response.data.recipes));
    const res = await axios.post("/api/users/singleUser", {
      email: item._id,
    });
    dispatch(setUser(res.data.user));
  };

  //console.log(item.image);
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4">
        <Avatar
          onClick={fetchRandomUser}
          className="cursor-pointer hover:scale-105"
        >
          <AvatarImage src={item.image} onClick={proifleChange} />
          <AvatarFallback>PR</AvatarFallback>
        </Avatar>
        <div>
          <p
            className="text-sm font-medium leading-none cursor-pointer hover:scale-105"
            onClick={fetchRandomUser}
          >
            {item.username}
          </p>
          <p className="text-sm text-muted-foreground">{item.occupation}</p>
        </div>
      </div>
      {sessionUser._id !== changedUser._id ? (
        <GiLaurelCrown className="text-2xl" />
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
};

export default SingleFriendRow;
