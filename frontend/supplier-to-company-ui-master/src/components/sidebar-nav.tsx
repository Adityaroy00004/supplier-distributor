"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function SidebarNav({ items }: { items: { label: string; href: string }[] }) {
  const pathname = usePathname();
  return (
    <nav className="space-y-1">
      {items.map((i) => {
        const active = pathname === i.href;
        return (
          <Link
            key={i.href}
            href={i.href}
            className={cn(
              "block rounded-md px-3 py-2 text-sm",
              active ? "bg-blue-50 text-blue-700" : "text-zinc-700 hover:bg-zinc-50"
            )}
          >
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}
