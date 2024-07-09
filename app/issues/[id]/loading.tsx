import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function IssuePageLoading() {
  return (
    <>
      <Skeleton className="w-96 h-[40px]" />
      <div className="flex space-x-3 my-3">
        <Skeleton className="w-20 h-[25px]" />
        <Skeleton className="w-32 h-[25px]" />
      </div>
      <Card className="prose mt-4 p-5">
        <Skeleton className="w-80 h-[25px] mb-5" />
        <Skeleton className="w-80 h-[25px] mb-5" />
        <Skeleton className="w-80 h-[25px] mb-5" />
      </Card>
    </>
  );
}
