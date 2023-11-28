"use client";
import React, { useEffect, useState } from "react";
import { CiTwitter } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaSuitcase } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import Profilepic from "./Profilepic";
import { setUser } from "../redux/features/user-slice";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";

export default function UserProfile() {
  const currentUser = useAppSelector((state) => state.userSlice.user);
  const currentRandomUser=useAppSelector((state)=>state.userSlice.randomUser)
  //console.log(currentUser);
  return (
    <Card className="max-w-[320px] h-fit my-4 sticky top-16 max-sm:w-full max-sm:static">
      <CardHeader className="flex gap-3 justify-evenly">
        <Profilepic />

        <div className="flex flex-col">
          <p className="text-md">{currentUser.username}</p>
          <p className="text-small text-default-500 flex items-center">
            {currentUser.occupation}&nbsp;
            <FaSuitcase />
          </p>
          <p className="text-small text-default-500 flex items-center">
            {currentUser.location} &nbsp;
            <FaMapLocationDot />
          </p>
          <p className="text-small text-default-500 flex items-center">
            Add Friend
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Friends:{currentUser.friendsList.length}</p>
        <p>Profile Count:{currentUser.profileCount}</p>
      </CardBody>

      <Divider />
      <CardBody>
        Description: Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Alias, porro.
      </CardBody>

      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          GitHub.
          <FaGithub />
        </Link>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
          className="px-3"
        >
          Twitter.
          <CiTwitter />
        </Link>
      </CardFooter>
    </Card>
  );
}
