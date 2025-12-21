"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type Step = {
  label: string;
  href: string;
};

export function Stepper({ steps }: { steps: Step[] }) {
  const pathname = usePathname();
  return (
    <ol className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      {steps.map((s, i) => {
        const active = pathname === s.href;
        const completed = steps.findIndex((st) => st.href === pathname) > i;
        return (
          <li key={s.href} className="flex items-center gap-2">
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                completed && "bg-green-600 text-white",
                active && !completed && "bg-blue-600 text-white",
                !active && !completed && "bg-zinc-200 text-zinc-700"
              )}
            >
              {i + 1}
            </span>
            <Link
              href={s.href}
              className={cn(
                "text-sm",
                active ? "text-blue-700 font-medium" : "text-zinc-600 hover:text-zinc-900"
              )}
            >
              {s.label}
            </Link>
            {i !== steps.length - 1 && (
              <span className="mx-2 hidden h-px flex-1 bg-zinc-200 sm:block" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
