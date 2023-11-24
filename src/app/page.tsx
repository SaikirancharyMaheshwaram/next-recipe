"use client";
import Image from "next/image";
import Nav from "@/app/components/Nav";
import UserProfile from "./components/UserProfile";
import FriendsCard from "./components/FriendsCard";
import Recipe from "@/app/components/Recipe";
import Three from "./components/Three";
import { useEffect, useState } from "react";
import axios from "axios";
import { setUser } from "./redux/features/user-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "./redux/store";
export default function Home() {
  const currentUser = useAppSelector((state) => state.userSlice.user);
  const dispatch = useDispatch<AppDispatch>();
  const fetchingUser = async () => {
    const timestamp = new Date().getTime(); // Add a timestamp to the URL
    const response = await fetch(`/api/users/me`, { cache: "no-store" });
    const data = await response.json();
    //console.log(data.user);
    dispatch(setUser(data.user));
  };
  useEffect(() => {
    fetchingUser();
  }, []);
  return (
    <main className="w-full">
      <Nav />
      <div className="flex gap-6  max-sm:flex-col p-4 justify-around">
        <UserProfile />
        <Three isProfile={true} />
        <FriendsCard userId={currentUser._id} />
      </div>
    </main>
  );
}
