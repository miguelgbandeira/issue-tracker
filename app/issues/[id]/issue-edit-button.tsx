import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";

export default function IssueEditButton({ issueId }: { issueId: string }) {
  return (
    <Link href={`/issues/${issueId}/edit`} passHref>
      <Button className="w-full">
        <SquarePen className="mr-2 h-4 min-w-4" />
        <div className="block sm:hidden">Edit</div>
        <div className="hidden sm:block">Edit Issue</div>
      </Button>
    </Link>
  );
}
