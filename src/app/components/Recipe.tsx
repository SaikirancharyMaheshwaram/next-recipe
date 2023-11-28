"use client";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Slider,
  CardHeader,
  Code,
  CardFooter,
  Avatar,
} from "@nextui-org/react";
import Image from "next/image";
import moment from "moment";
import { HeartIcon } from "./HeartIcon";
import { RepeatOneIcon } from "./RepeatOneIcon";
import SingleUserAvator from "./SingleUserAvator";
import { IoEyeOutline } from "react-icons/io5";
import ReactCardFlip from "react-card-flip";
import SkeletonLoader from "./SkeletonLoader";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";
import { setPost } from "../redux/features/recipe-slice";
import RecipeBackSide from "./IngredientsList";
import IngredientsList from "./IngredientsList";
import { EyeSlashFilledIcon } from "../components/ui/EyeSlashFilledIcon";

export default function App({ item }: any) {
  // Redux setup
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useAppSelector((state) => state.userSlice.user);

  // Local state
  const [isFlipped, setIsFlipped] = React.useState(false);

  // Function to flip the card
  function FlipCard() {
    setIsFlipped(!isFlipped);
  }

  // Check if the current user has liked the post
  const isLiked = Boolean(item.likes[currentUser._id]);

  // Handle the like action
  const handleLike = async () => {
    try {
      // Send a request to the server to save the like
      const response = await axios.put("/api/recipes/save-recipe", {
        userId: currentUser._id,
        postId: item._id,
      });

      // Update the post in the Redux store
      const updatedPost = await response.data.updatedPost;
      dispatch(setPost({ post: updatedPost }));
      //console.log(typeof item.likes);
    } catch (error: any) {
      // Handle errors, e.g., display a toast
      toast.error(error.message);
    }
  };

  // Render the component
  return (
    <>
      {/* ReactCardFlip is used for creating a card with a flip effect */}
      <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
        {/* Front side of the card */}
        <Card className="py-4 my-4 min-w-[600px] ">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <div className="w-full">
              {/* Display user avatar */}
              <SingleUserAvator userId={item.userOwner} />
            </div>
            {item.isTweet ? (
              ""
            ) : (
              <h4 className="text-large my-2 mx-2">{item.name}</h4>
            )}
            <Code className="text-sm w-fit items-center my-2 mx-2">
              @ {item.des}
            </Code>
          </CardHeader>
          <CardBody className="overflow-visible py-2 items-center">
            {/* Display an image if it's not a tweet */}
            {item.isTweet ? (
              ""
            ) : (
              <Image
                alt="Card background"
                className="object-cover rounded-xl "
                src={item.imageUrl}
                width={560}
                height={0}
              />
            )}
          </CardBody>
          <CardBody className="flex overflow-visible">
            {/* Like, Repeat, and Eye (view) buttons */}
            <div className="flex">
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 "
                radius="full"
                variant="light"
                onClick={handleLike}
              >
                {/* Heart icon for liking */}
                <HeartIcon
                  className={isLiked ? "[&>path]:stroke-transparent" : ""}
                  fill={isLiked ? "currentColor" : "none"}
                  width={undefined}
                  height={undefined}
                />{" "}
                {typeof item.likes === "object" ? (
                  Object.keys(item.likes).length === 0 ? (
                    ""
                  ) : (
                    <p className="pl-1">{Object.keys(item.likes).length}</p>
                  )
                ) : (
                  ""
                )}
              </Button>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 "
                radius="full"
                variant="light"
              >
                {/* Repeat icon */}
                <RepeatOneIcon width={10} height={10} />
              </Button>
              {item.isTweet ? (
                ""
              ) : (
                <Button
                  isIconOnly
                  className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 "
                  radius="full"
                  variant="light"
                  onClick={FlipCard}
                >
                  {/* Eye (view) icon */}
                  <IoEyeOutline className="text-2xl" />
                </Button>
              )}
            </div>
            <div className=" text-default-400 text-small mx-4">
              {moment(item?.createdAt ?? "2023-05-20").fromNow()}
            </div>
          </CardBody>
        </Card>

        {/* Back side of the card */}
        <div>
          {/* Skeleton loader and an Eye (view) button */}
          <Card className="max-w-[600px] h-[500px] scrollbar-hide overflow-scroll">
            <CardHeader className="justify-between">
              <div className="w-full">
                <SingleUserAvator userId={item.userOwner} />
              </div>
            </CardHeader>
            <CardBody className="px-3 py-0  text-default-400 ">
              <h1>Recipe Name :{item.name}</h1>
              <h1>Description:</h1>
              <p>{item.des}</p>
              <br />

              <IngredientsList items={item.ingredients} />
              <br />
              <h1>Procedure :</h1>
              <br />
              <p>{item.instructions}</p>
            </CardBody>
            <CardFooter className="gap-3">
              <div className="flex gap-1">
                {/* <p className="font-semibold text-default-400 text-small">4</p> */}
              </div>
              <div className="flex gap-2">
                <Button
                  isIconOnly
                  className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 mr-2"
                  radius="full"
                  variant="light"
                  onClick={FlipCard}
                >
                  {/* Eye (view) icon */}
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                </Button>
                <p className=" text-default-400 text-small">
                  {moment(item?.createdAt ?? "2023-05-20").fromNow()}
                </p>
                <p className="font-semibold text-default-400 text-small">
                  {typeof item.likes === "object"
                    ? Object.keys(item.likes).length
                    : 0}
                </p>
                <p className="text-default-400 text-small">Likes</p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </ReactCardFlip>
    </>
  );
}
