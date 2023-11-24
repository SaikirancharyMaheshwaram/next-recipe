import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import SharingRecipe from "./SharingRecipe";
import axios from "axios";
import { AppDispatch, useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { setPosts } from "../redux/features/recipe-slice";

export default function DataPosting() {
  const currentUser = useAppSelector((state) => state.userSlice.user);
  const dispatch = useDispatch<AppDispatch>();
  const [isFollowed, setIsFollowed] = React.useState(false);
  const [recipe, setRecipe] = React.useState({
    name: "Thought...",
    ingredients: [],
    des: "",
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    isTweet: true,
    userOwner: currentUser._id,
  });
  const handleCreateRecipe = async () => {
    const response = await axios.post("/api/recipes/create-recipe", {
      name: recipe.name,
      des: recipe.des,
      ingredients: [],
      instructions: recipe.instructions,
      imageUrl: recipe.imageUrl,
      cookingTime: recipe.cookingTime,
      isTweet: recipe.isTweet,
      userOwner: currentUser._id,
    });
    console.log(response);
    dispatch(setPosts(response.data.posts));
    setRecipe({
      name: "Thought...",
      ingredients: [],
      des: "",
      instructions: "",
      imageUrl: "",
      cookingTime: 0,
      isTweet: true,
      userOwner: currentUser._id,
    });
  };

  return (
    <div className="max-md:max-w-[600px] my-4   top-16  max-sm:w-full">
      <Card className="md:max-w-[600px] my-4 max-sm:w-full">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src={currentUser.image}
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {currentUser.username}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                @{currentUser.location},{currentUser.occupation}
              </h5>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400 ">
          <Textarea
            className="text-small text-default-400"
            placeholder="What Happening.. Something On Mind"
            value={recipe.des}
            onChange={(e) => setRecipe({ ...recipe, des: e.target.value })}
          />
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <Button
              className={
                isFollowed
                  ? "bg-transparent text-foreground border-default-200"
                  : ""
              }
              color="primary"
              radius="full"
              size="sm"
              variant={isFollowed ? "bordered" : "solid"}
              onPress={() => setIsFollowed(!isFollowed)}
              onClick={handleCreateRecipe}
            >
              {isFollowed ? "share again" : "Share"}
            </Button>
            <SharingRecipe />
          </div>
          {/* <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Followers</p>
        </div> */}
        </CardFooter>
      </Card>
    </div>
  );
}
