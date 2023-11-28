"use client";
import React, { useEffect } from "react";
import Nav from "@/app/components/Nav";
import UserProfile from "../components/UserProfile";
import { FriendsCard } from "../components/FriendsCard";
import Recipe from "@/app/components/Recipe";
import Three from "../components/Three";
import { AppDispatch, useAppSelector } from "../redux/store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/user-slice";

const MyPosts = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fechtingCurrentUser = async () => {
      const response = await axios.get("/api/users/me");
      console.log(response.data.user);
      dispatch(setUser(response.data.user));
    };
    const fechtingCurrentfriend=async()=>{
        const response=await axios.post("/api/users/singleUser",{
            email:"userid of friend from post"
        })

    }
    fechtingCurrentUser();
  }, []);

  const currentUser = useAppSelector((state) => state.userSlice.user);
  return (
    <main>
      <Nav />
      <div className="flex gap-6 max-sm:flex-col">
        <UserProfile />
        <Three isProfile={true} />
        <FriendsCard userId={currentUser._id} />
      </div>
    </main>
  );
};

export default MyPosts;
