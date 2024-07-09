import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export function IssueEditButton({ issueId }: { issueId: string }) {
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

export function IssueDeleteButton({ issueId }: { issueId: string }) {
  return (
    <Button variant={"destructive"}>
      <Trash2 className="mr-2 h-4 min-w-4" />
      <Link className="block sm:hidden" href={`/issues/${issueId}/edit`}>
        Delete Issue
      </Link>
      <Link className="hidden sm:block" href={`/issues/${issueId}/edit`}>
        Delete
      </Link>
    </Button>
  );
}
