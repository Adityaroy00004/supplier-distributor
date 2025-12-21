import Link from "next/link";
import { Stepper, type Step } from "@/components/stepper";
import { SidebarNav } from "@/components/sidebar-nav";
import "@/app/globals.css";

const steps: Step[] = [
  { label: "Landing", href: "/onboarding" },
  { label: "Company", href: "/onboarding/company" },
  { label: "Contact", href: "/onboarding/contact" },
  { label: "Business", href: "/onboarding/business" },
  { label: "Tax", href: "/onboarding/tax" },
  { label: "Documents", href: "/onboarding/documents" },
  { label: "Review", href: "/onboarding/review" },
];

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold">
            AutoSourcing
          </Link>
          <nav className="text-sm text-zinc-600">
            Need help? <a href="mailto:support@autosourcing.com" className="text-blue-600">support@autosourcing.com</a>
          </nav>
        </div>
      </header>
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-6 md:grid-cols-12">
        <aside className="md:col-span-3">
          <SidebarNav
            items={steps.map((s) => ({ label: s.label, href: s.href }))}
          />
        </aside>
        <section className="md:col-span-9">
          <div className="mb-6">
            <Stepper steps={steps} />
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-sm">{children}</div>
        </section>
      </main>
    </div>
  );
}
