import { Skeleton } from "@/components/ui/skeleton";

export default function IssueFormSkeleton() {
  return (
    <div>
      <Skeleton className="max-w-xl h-[40px] mb-8 mt-10" />
      <Skeleton className="max-w-xl h-96 mb-10 mt-10" />
      <Skeleton className="h-10 px-4 py-2 w-32 mt-15" />
    </div>
  );
}
