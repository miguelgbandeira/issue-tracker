"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import { useSession } from "next-auth/react";
import { AiFillBug } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const { status, data: session } = useSession();

  return (
    <nav className="mb-5 border-b px-5 py-3">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href={"/"}>
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={clsx("hover:text-zinc-800 transition-colors", {
                      "text-zinc-900": currentPath === link.href,
                      "text-zinc-500": currentPath !== link.href,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {status === "authenticated" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-8 h-8 cursor-pointer">
                    <AvatarImage src={session.user!.image!} />
                    <AvatarFallback>?</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>{session.user!.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/api/auth/signout">Sign Out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Sign In</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
