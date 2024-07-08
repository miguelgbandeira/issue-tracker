"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AiFillBug } from "react-icons/ai";
import clsx from "clsx";

export default function Navbar() {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 h-14 items-center mb-5 border-b px-5">
      <Link href={"/"}>
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className={clsx("hover:text-zinc-800 transition-colors", {
              "text-zinc-900": currentPath === link.href,
              "text-zinc-500": currentPath !== link.href,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
