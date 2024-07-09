import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/prisma/client";
import IssueBadge from "@/components/issue-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import Link from "./Link";
import NextLink from "next/link";

export default async function IssuesPage() {
  return (
    <>
      <div>
        <Button className="mb-5">
          <NextLink href={"/issues/new"}>New Issue</NextLink>
        </Button>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <TableSuspense />
      </Suspense>
    </>
  );
}

async function TableSuspense() {
  const issues = await db.issue.findMany();
  return (
    <>
      <Table>
        <TableCaption>A list of the issues.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Issue</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="hidden md:table-cell">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-medium">
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">{issue.status}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <IssueBadge status={issue.status} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

function TableSkeleton() {
  return (
    <>
      <Table>
        <TableCaption>A list of the issues.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Issue</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="hidden md:table-cell">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              <Skeleton className="w-96 h-[20px]" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="w-20 h-[20px]" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="w-60 h-[20px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              <Skeleton className="w-96  h-[20px]" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="w-20 h-[20px]" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="w-60 h-[20px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              <Skeleton className="w-96  h-[20px]" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="w-20 h-[20px]" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="w-60 h-[20px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              <Skeleton className="w-96  h-[20px]" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="w-20 h-[20px]" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="w-60 h-[20px]" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
