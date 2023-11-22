import React from "react";
import { Button } from "@nextui-org/react";
import { HeartIcon } from "../HeartIcon";

export default function HeartButton() {
  return (
    <div className="flex gap-4 items-center">
      <Button isIconOnly color="danger" aria-label="Like" className="h-[40px] w-[40px]">
        <HeartIcon />
      </Button>
    </div>
  );
}
