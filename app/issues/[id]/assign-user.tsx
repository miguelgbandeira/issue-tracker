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
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function AssigneeSelect() {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const data = await fetch("/api/users");
      return data.json();
    },
    staleTime: 1000 * 60,
    retry: 3,
  });

  if (error) return null;

  if (isLoading) return <Skeleton className="w-48 h-[34px]" />;

  return (
    <>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Assign user" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Users</SelectLabel>
            {users?.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
