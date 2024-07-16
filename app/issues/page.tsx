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
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { Suspense } from "react";
import Link from "./Link";
import IssueStatusFilter from "./_components/issue-status-filter";
import { ArrowUp } from "lucide-react";
import Pagination from "@/components/Pagination";

type IssuesPageProps = {
  searchParams?: { status?: Status; orderBy?: keyof Issue; page?: string };
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

type TableProps = {
  searchParams?: { status?: Status; orderBy?: keyof Issue; page?: string };
  itemCount: number;
  pageSize: number;
};

async function TableSuspense({ searchParams }: IssuesPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = 10;
  const statusList = Object.values(Status);

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const status =
    searchParams?.status && statusList.includes(searchParams.status)
      ? searchParams.status
      : undefined;

  const validOrderBy = (value: any): value is keyof Issue => {
    return columns.map((column) => column.value).includes(value);
  };

  const orderBy = validOrderBy(searchParams?.orderBy)
    ? { [searchParams.orderBy]: "asc" as const }
    : undefined;

  const where = {
    status: status,
  };

  const issues = await db.issue.findMany({
    where,
    orderBy: orderBy ? [orderBy] : undefined,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const totalPages = await db.issue.count({ where });

  return (
    <>
      <Table>
        <TableCaption>A list of the issues.</TableCaption>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead className={column.className} key={column.value}>
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams?.orderBy && (
                  <ArrowUp className="inline w-4 ml-1" />
                )}
              </TableHead>
            ))}
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
              <TableCell>
                <IssueBadge status={issue.status} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination pageSize={pageSize} itemCount={totalPages} />
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
