import React from "react";
import { Card, CardFooter, Button } from "@nextui-org/react";
import Image from "next/image";
import { useAppSelector } from "../redux/store";

export default function Profilepic() {
  const currentUser = useAppSelector((state) => state.userSlice.user);
  return (
    <Card isFooterBlurred radius="lg" className="border-none">
      <Image
        alt="Profile"
        className="object-cover"
        height={100}
        src={currentUser.image}
        width={100}
        
      />
      {/* <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        
        <Button
          className="text-tiny text-white bg-black/20"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
        >
          View
        </Button>
      </CardFooter> */}
    </Card>
  );
}
