import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function IssueEditButton({ issueId }: { issueId: string }) {
  return (
    <Button>
      <SquarePen className="mr-2 h-4 w-4" />
      <Link href={`/issues/${issueId}/edit`}>Edit</Link>
    </Button>
  );
}
