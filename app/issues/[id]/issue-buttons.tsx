import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>
          <Trash2 className="mr-2 h-4 min-w-4" />
          <div className="block sm:hidden">Delete Issue</div>
          <div className="hidden sm:block">Delete</div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            issue and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500 hover:bg-red-400">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
