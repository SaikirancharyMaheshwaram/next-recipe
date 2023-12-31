"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import SingleFriendRow from "./SingleFriendRow";
import SketetonForUser from "./SkeletonForUser";
import { setFriends } from "../redux/features/user-slice";
import { useAppSelector, AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";

interface Friend {
  _id: string;
  username: string;
  image: string;
  occupation: string;
  location: string;
  // Add other properties as needed
}

interface ApiResponse {
  user: {
    friendsList: Friend[];
    // Add other properties as needed
  };
  formattedFriends: Friend[];
}

export function FriendsCard({ userId }: any): JSX.Element {
  const currentUser = useAppSelector((state) => state.userSlice.user);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        //console.log("here");
        //console.log(userId);
        const response = await axios.post("/api/users/getUserFriends", {
          email: currentUser._id,
        });
        // console.log(response.data);
        //console.log("here");

        dispatch(setFriends(response.data.formattedFriends));
      } catch (error: any) {
        console.log("helre", error.message);
        console.error("Error fetching friends:", error);
      } finally {
        // Set isLoading to true once the data is loaded or an error occurs
        setIsLoading(true);
      }
    };

    // Call fetchFriends only once on mount
    fetchFriends();
  }, [userId]);

  const filteredFriends = currentUser.friendsList.filter((friend: any) => {
    console.log(friend);
    // Use return to actually filter the friends based on the username
    return friend.username?.toLowerCase().includes(searchTerm.toLowerCase());
  });
  //console.log(currentUser.friendsList);

  return (
    <Card className="h-fit my-4 sticky top-16 min-w-[217px] w-fit py-4    max-sm:w-full">
      <CardHeader>
        <CardTitle>Friends</CardTitle>
        <CardDescription>Anyone with the link can view.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="secondary" className="shrink-0">
            <CiSearch />
          </Button>
        </div>
        <Separator className="my-4" />
        <div className="space-y-4">
          <h4 className="text-sm font-medium">People of Username</h4>
          <div className="grid gap-6">
            {isLoading ? (
              filteredFriends.map((friend: any) => (
                <SingleFriendRow key={friend._id} item={friend} />
              ))
            ) : (
              <SketetonForUser />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default FriendsCard;
