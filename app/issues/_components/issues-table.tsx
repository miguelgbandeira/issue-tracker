import IssueBadge from "@/components/issue-badge";
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
import { Issue, Status } from "@prisma/client";
import { ArrowUp } from "lucide-react";
import NextLink from "next/link";
import Link from "../Link";

type IssuesPageProps = {
  searchParams?: IssueQuery;
  issues: Issue[];
};

export function IssuesTable({ searchParams, issues }: IssuesPageProps) {
  return (
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
              {new Date(issue.createdAt).toDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function TableSkeleton() {
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

export type IssueQuery = {
  status?: Status;
  orderBy?: keyof Issue;
  page?: string;
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);
