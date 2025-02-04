"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Issue, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { toast, Toaster } from "react-hot-toast";

export default function AssigneeSelect({ issue }: { issue: Issue }) {
  const { data: users, error, isLoading } = useUsers();

  async function assignUser(userId: string) {
    try {
      const response = await fetch(`/api/issues/${issue.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          assignedToUserId: userId === "unassigned" ? null : userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      } else {
        toast.success("User assigned successfully");
      }
    } catch (error) {
      toast.error("Changes could not be saved. Please try again.");
    }
  }

  if (error) return null;

  if (isLoading) return <Skeleton className="w-48 h-[34px]" />;

  return (
    <>
      <Select
        onValueChange={(userId) => assignUser(userId)}
        defaultValue={issue.assignedToUserId || "unassigned"}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Assign user" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Users</SelectLabel>
            <SelectItem value="unassigned">Unassigned</SelectItem>
            {users?.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Toaster />
    </>
  );

  function useUsers() {
    return useQuery<User[]>({
      queryKey: ["users"],
      queryFn: async () => {
        const data = await fetch("/api/users");
        return data.json();
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 3,
    });
  }
}
