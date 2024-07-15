import IssueBadge from "@/components/issue-badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
import NextLink from "next/link";
import { Suspense } from "react";
import Link from "./Link";
import IssueStatusFilter from "./_components/issue-status-filter";
import { Status } from "@prisma/client";
import { stat } from "fs";

type IssuesPageProps = {
  searchParams?: { status?: Status };
};

export default async function IssuesPage({ searchParams }: IssuesPageProps) {
  return (
    <>
      <div className="flex justify-between">
        <IssueStatusFilter />
        <Button className="mb-5">
          <NextLink href={"/issues/new"}>New Issue</NextLink>
        </Button>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <TableSuspense searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function TableSuspense({ searchParams }: IssuesPageProps) {
  const statusList = Object.values(Status);

  const status =
    searchParams?.status && statusList.includes(searchParams.status)
      ? searchParams.status
      : undefined;
  const issues = await db.issue.findMany({
    where: {
      status: status,
    },
  });

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
                <div className="block md:hidden">
                  <IssueBadge status={issue.status} />
                </div>
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

export const dynamic = "force-dynamic";
