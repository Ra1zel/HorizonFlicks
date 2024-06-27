import React from "react";
import { Card } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/skeleton";

const DataCardSkeleton = () => {
  return (
    <Card className="w-[250px] h-[300px] space-y-5 p-4 rounded-none">
      <Skeleton className="rounded-none">
        <div className="h-[200px] rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-4/5 rounded-none">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-none">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>
  );
};

export default DataCardSkeleton;
