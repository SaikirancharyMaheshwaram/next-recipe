"use client";
import React, { useState } from "react";
import { Card, CardBody, Button, Slider, CardHeader } from "@nextui-org/react";
import Image from "next/image";

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

export default function App({ item }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useAppSelector((state) => state.userSlice.user);
  const [isFlipped, setIsFlipped] = React.useState(false);
  function FlipCard() {
    setIsFlipped(!isFlipped);
  }
  const isLiked = Boolean(item.likes[currentUser._id]);
  const handleLike = async () => {
    const response = await axios.put("/api/recipes/save-recipe", {
      userId: currentUser._id,
      postId: item._id,
    });
    const updatedPost = await response.data.updatedPost;
    dispatch(setPost({ post: updatedPost }));
  };
  console.log(item);

  return (
    <>
      <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
        <Card className="py-4 my-4  min-w-[600px] ">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <div className="w-full">
              <SingleUserAvator userId={item.userOwner} />
            </div>

            {/* <p className="text-tiny uppercase font-bold ">Daily Mix</p>
      <small className="text-default-500">12 Tracks</small> */}
            <h4 className="font-bold text-large my-2">{item.name}</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2 items-center">
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
            <div className="flex">
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 "
                radius="full"
                variant="light"
                //onPress={() => setLiked((v) => !v)}
                onClick={handleLike}
              >
                <HeartIcon
                  className={isLiked ? "[&>path]:stroke-transparent" : ""}
                  fill={isLiked ? "currentColor" : "none"}
                  width={undefined}
                  height={undefined}
                />
              </Button>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 "
                radius="full"
                variant="light"
              >
                <RepeatOneIcon width={undefined} height={undefined} />
              </Button>
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 "
                radius="full"
                variant="light"
                onClick={FlipCard}
              >
                <IoEyeOutline className="text-2xl" />
              </Button>
            </div>
          </CardBody>
        </Card>
        <div>
          <SkeletonLoader />
          <Button
            isIconOnly
            className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 "
            radius="full"
            variant="light"
            onClick={FlipCard}
          >
            <IoEyeOutline className="text-2xl" />
          </Button>
        </div>
      </ReactCardFlip>
    </>
  );
}

// <Card
//   isBlurred
//   className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] py-4 my-4 "
//   shadow="sm"
// >
//   Card
//   {/* <CardBody>
//     <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
//       <div className="relative col-span-6 md:col-span-4">
//         <Image
//           alt="Album cover"
//           className="object-cover"
//           height={200}
//           shadow="md"
//           src="https://nextui.org/images/hero-card-complete.jpeg"
//           width="100%"
//         />
//       </div>

//       <div className="flex flex-col col-span-6 md:col-span-8">
//         <div className="flex justify-between items-start">
//           <div className="flex flex-col gap-0">
//             <h3 className="font-semibold text-foreground/90">Daily Mix</h3>
//             <p className="text-small text-foreground/80">12 Tracks</p>
//             <h1 className="text-large font-medium mt-2">Frontend Radio</h1>
//           </div>
//           <Button
//             isIconOnly
//             className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
//             radius="full"
//             variant="light"
//             onPress={() => setLiked((v) => !v)}
//           >
//             <HeartIcon
//               className={liked ? "[&>path]:stroke-transparent" : ""}
//               fill={liked ? "currentColor" : "none"}
//             />
//           </Button>
//         </div>

//         <div className="flex flex-col mt-3 gap-1">
//           <Slider
//             aria-label="Music progress"
//             classNames={{
//               track: "bg-default-500/30",
//               thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
//             }}
//             color="foreground"
//             defaultValue={33}
//             size="sm"
//           />
//           <div className="flex justify-between">
//             <p className="text-small">1:23</p>
//             <p className="text-small text-foreground/50">4:32</p>
//           </div>
//         </div>

//         <div className="flex w-full items-center justify-center">
//           <Button
//             isIconOnly
//             className="data-[hover]:bg-foreground/10"
//             radius="full"
//             variant="light"
//           >
//             <RepeatOneIcon className="text-foreground/80" />
//           </Button>
//           <Button
//             isIconOnly
//             className="data-[hover]:bg-foreground/10"
//             radius="full"
//             variant="light"
//           >
//             <PreviousIcon />
//           </Button>
//           <Button
//             isIconOnly
//             className="w-auto h-auto data-[hover]:bg-foreground/10"
//             radius="full"
//             variant="light"
//           >
//             <PauseCircleIcon size={54} />
//           </Button>
//           <Button
//             isIconOnly
//             className="data-[hover]:bg-foreground/10"
//             radius="full"
//             variant="light"
//           >
//             <NextIcon />
//           </Button>
//           <Button
//             isIconOnly
//             className="data-[hover]:bg-foreground/10"
//             radius="full"
//             variant="light"
//           >
//             <ShuffleIcon className="text-foreground/80" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   </CardBody> */}
// </Card>
