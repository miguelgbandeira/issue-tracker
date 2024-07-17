"use server";
import IssueBadge from "@/components/issue-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import db from "@/prisma/client";
import NextLink from "next/link";

export default async function LatestIssues() {
  const latestIssues = await db.issue.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: { assignedToUser: true },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Issues</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {latestIssues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>
                  <div className="flex justify-between">
                    <div className="flex flex-col items-start gap-2 font-medium">
                      <NextLink href={`/issues/${issue.id}`}>
                        {issue.title}
                      </NextLink>
                      <IssueBadge status={issue.status} />
                    </div>
                    {issue.assignedToUser && (
                      <Avatar>
                        <AvatarImage src={issue.assignedToUser?.image!} />
                        <AvatarFallback>?</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
