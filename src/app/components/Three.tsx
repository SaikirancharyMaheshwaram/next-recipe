import Recipe from "@/app/components/Recipe";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SkeletonLoader from "./SkeletonLoader";
import DataPosting from "./DataPosting";
import { AppDispatch, useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { setCount, setPosts } from "../redux/features/recipe-slice";

const Three = ({ isProfile }: any) => {
  const sessionUser = useAppSelector((state) => state.userSlice.randomUser);
  const changedUser = useAppSelector((state) => state.userSlice.user);
  const recipeList = useAppSelector((state) => state.recipeSlice.posts);
  const currentUser = useAppSelector((state) => state.userSlice.user);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const fetchingRecipes = async () => {
      const res = await axios.get("/api/recipes/home");
      dispatch(setPosts(res.data.recipes));
      setLoading(!isLoading);
    };
    const fetchUserRecipes = async () => {
      const res = await axios.get(`api/recipes/userRecipes`);
      dispatch(setPosts(res.data.recipes));
      setLoading(!isLoading);
    };

    if (isProfile === true) {
      fetchUserRecipes();
    } else {
      fetchingRecipes();
    }
  }, []);
  return (
    <div className="max-sm:w-full">
      {sessionUser === changedUser ? "" : <DataPosting />}

      {isLoading ? (
        recipeList?.map((item) => <Recipe item={item} key={item._id} />)
      ) : (
        <div>
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          
        </div>
      )}
    </div>
  );
};
export default Three;
