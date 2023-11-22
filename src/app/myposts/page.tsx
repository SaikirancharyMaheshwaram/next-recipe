"use client"
import React from "react";
import Nav from "@/app/components/Nav";
import UserProfile from "../components/UserProfile";
import { FriendsCard } from "../components/FriendsCard";
import Recipe from "@/app/components/Recipe";
import Three from "../components/Three";


const MyPosts = () => {
  return (
    <main>
      <Nav />
      <div className="flex gap-6 max-sm:flex-col">
        <UserProfile />
        <Three isProfile={false}/>
        <FriendsCard />
      </div>
    </main>
  );
};

export default MyPosts;
