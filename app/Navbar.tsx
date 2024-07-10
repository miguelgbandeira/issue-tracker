"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { AiFillBug } from "react-icons/ai";

export default function Navbar() {
  return (
    <nav className="mb-5 border-b px-5 py-3">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href={"/"}>
              <AiFillBug />
            </Link>
            <NavLinks />
          </div>
          <AuthStatus />
        </div>
      </div>
    </nav>
  );
}

function AuthStatus() {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton className="w-14 h-[20px]" />;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Sign In
      </Link>
    );

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="w-8 h-8 cursor-pointer">
            <AvatarImage src={session!.user!.image!} />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{session!.user!.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/api/auth/signout">Sign Out</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function NavLinks() {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={clsx("nav-link", {
                "!text-zinc-900": currentPath === link.href,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
