import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import Link from "next/link";

export default function IssueEditButton({ issueId }: { issueId: string }) {
  return (
    <Button>
      <SquarePen className="mr-2 h-4 min-w-4" />
      <Link className="block sm:hidden" href={`/issues/${issueId}/edit`}>
        Edit Issue
      </Link>
      <Link className="hidden sm:block" href={`/issues/${issueId}/edit`}>
        Edit
      </Link>
    </Button>
  );
}
