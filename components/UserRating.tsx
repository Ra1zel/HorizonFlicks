"use client";
import React from "react";
import { CircularProgress } from "@nextui-org/react";

interface Props {
  userRating: number;
}

const UserRating = ({ userRating }: Props) => {
  return (
    <div className="flex gap-2 items-center mt-3">
      <CircularProgress
        classNames={{
          svg: "w-20 h-20 drop-shadow-md",
          value: "text-lg",
        }}
        color="success"
        formatOptions={{ style: "percent" }}
        showValueLabel={true}
        size="lg"
        strokeWidth={4}
        value={Math.round((userRating / 10) * 100)}
      />
      <p className="text-lg">User Score</p>
    </div>
  );
};

export default UserRating;
