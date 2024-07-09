import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <div>
      <Skeleton className="max-w-xl h-[40px] mb-8" />
      <Skeleton className="max-w-xl h-96 mb-10" />
      <Skeleton className="h-10 px-4 py-2 w-32" />
    </div>
  );
}
