import React from "react";
import { Skeleton } from "@nextui-org/skeleton";
import Card from "@/app/_components/Card";

export default function loading() {
  return (
    <Card className="flex flex-row gap-10 rounded-none">
      <Skeleton className="w-[350px] h-[500px] rounded-none" />
      <div>
        <Skeleton className="w-[500px] h-[40px] mt-5" />
        <Skeleton className="w-[700px] h-[20px] mt-5" />

        <div className=" mt-8 flex gap-8 items-center">
          <Skeleton className="w-[60px] h-[60px] rounded-full" />

          <Skeleton className="w-[100px] h-[30px] rounded-none" />
        </div>
        <div className="mt-8">
          <Skeleton className="w-[200px] h-[40px] mt-5" />
          <Skeleton className="w-[700px] h-[20px] mt-5" />
          <Skeleton className="w-[700px] h-[20px] mt-5" />
          <Skeleton className="w-[400px] h-[20px] mt-5" />
        </div>
      </div>
    </Card>
  );
}
