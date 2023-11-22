"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ModeToggle } from "./ui/toggle-mode";

import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { AppDispatch, useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { setPosts } from "../redux/features/recipe-slice";

export default function Nav() {
  const router = useRouter();
  const currentUser = useAppSelector((state) => state.userSlice.user);
  const recipes = useAppSelector((state) => state.recipeSlice.posts);
  const dispatch = useDispatch<AppDispatch>();
  const onLogout = async () => {
    const logout = await axios.get("/api/users/logout");
    console.log(logout);
    router.push("/signin");
  };
  const handleMyPosts = async () => {
    const userRecipes = recipes.filter(
      (recipe: any) => recipe.userOwner === currentUser._id
    );
    dispatch(setPosts(userRecipes));
  };
  return (
    <Navbar isBordered maxWidth="full" className="max-sm:w-full">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Image
            src={
              "https://utfs.io/f/c2ba7de7-0bac-4a55-a85b-4d3314ab2e0d-ijo1qv.jpg"
            }
            alt="Logo"
            height={40}
            width={70}
            className="rounded-md mx-4"
          />
          <Link href="/">
            <p className="hidden sm:block font-bold text-inherit">RecipeGram</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem>
            <Link color="foreground" href={"/myposts"}>
              Myposts
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page" color="foreground">
              SavedPosts
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<CiSearch size={18} />}
          type="search"
        />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={currentUser?.image}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{currentUser?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={onLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <ModeToggle />
      </NavbarContent>
    </Navbar>
  );
}
