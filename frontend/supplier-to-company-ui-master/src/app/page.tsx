import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <nav className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-600">
                <span className="text-lg font-bold text-white">S</span>
              </div>
              <span className="text-xl font-semibold text-zinc-900">supplyNest</span>
            </div>
            <div className="hidden items-center gap-6 text-sm md:flex">
              <a href="#solutions" className="text-zinc-600 hover:text-zinc-900">
                Solutions
              </a>
              <a href="#platform" className="text-zinc-600 hover:text-zinc-900">
                Platform
              </a>
              <a href="#resources" className="text-zinc-600 hover:text-zinc-900">
                Resources
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-zinc-700">
                Sign in
              </Button>
            </Link>
            <Link href="/onboarding/playbook">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                Register as supplier
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="border-b border-zinc-100 bg-gradient-to-b from-zinc-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Enterprise supplier onboarding portal
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
                One unified hub for
                <span className="block text-emerald-600">supplier registration & compliance</span>
              </h1>
              <p className="text-lg leading-relaxed text-zinc-600">
                Streamline how suppliers engage with your organization. Collect company, tax, banking, and document
                details in a single, guided experience built for procurement teams.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/onboarding/playbook">
                  <Button size="lg" className="bg-emerald-600 px-8 hover:bg-emerald-700">
                    Start registration
                    <svg
                      className="ml-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-zinc-300 px-8 text-zinc-800">
                  Talk to sales
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-8 pt-4 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-semibold text-emerald-700">
                    ISO
                  </span>
                  <span>Enterprise-grade security</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-semibold text-emerald-700">
                    24/7
                  </span>
                  <span>Global supplier access</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-emerald-100 to-sky-100 opacity-60 blur-2xl" />
              <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl">
                <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3">
                  <div className="flex items-center gap-2 text-xs text-zinc-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Supplier registration overview
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between text-xs text-zinc-600">
                    <span className="font-medium text-zinc-900">Registration progress</span>
                    <span>5 of 7 steps completed</span>
                  </div>
                  <div className="mb-5 h-2 overflow-hidden rounded-full bg-zinc-100">
                    <div className="h-full w-[72%] bg-emerald-600" />
                  </div>
                  <div className="space-y-2 text-xs">
                    {[
                      { name: "Account setup", status: "complete" },
                      { name: "Company information", status: "complete" },
                      { name: "Contact details", status: "complete" },
                      { name: "Business profile", status: "complete" },
                      { name: "Banking details", status: "complete" },
                      { name: "Documents", status: "active" },
                      { name: "Review & submit", status: "pending" },
                    ].map((step) => (
                      <div
                        key={step.name}
                        className="flex items-center gap-3 rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2"
                      >
                        {step.status === "complete" && (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600">
                            <svg
                              className="h-3 w-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                        {step.status === "active" && (
                          <div className="h-5 w-5 rounded-full border-2 border-emerald-600 bg-white" />
                        )}
                        {step.status === "pending" && (
                          <div className="h-5 w-5 rounded-full border-2 border-zinc-300 bg-white" />
                        )}
                        <span
                          className={`text-xs font-medium ${
                            step.status === "pending" ? "text-zinc-400" : "text-zinc-700"
                          }`}
                        >
                          {step.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-zinc-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div>
              <div className="text-3xl font-bold text-emerald-600">10K+</div>
              <div className="mt-1 text-sm text-zinc-600">Active suppliers onboarded</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">98%</div>
              <div className="mt-1 text-sm text-zinc-600">Approval success rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">24 hrs</div>
              <div className="mt-1 text-sm text-zinc-600">Average review time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">150+</div>
              <div className="mt-1 text-sm text-zinc-600">Enterprise clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Solutions */}
      <section id="solutions" className="bg-zinc-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-zinc-900">Built for modern procurement teams</h2>
            <p className="mt-3 text-lg text-zinc-600">
              From supplier onboarding to ongoing compliance, manage every step in one portal.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-zinc-900">Guided onboarding playbooks</h3>
              <p className="text-sm text-zinc-600">
                Standardize supplier registration with configurable steps for company, tax, banking, and documents
                in a single guided experience.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-zinc-900">Compliance & risk control</h3>
              <p className="text-sm text-zinc-600">
                Capture GST, PAN, banking proofs, and certifications with clear review workflows before activation of
                any supplier account.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-zinc-900">Single source of truth</h3>
              <p className="text-sm text-zinc-600">
                Keep all supplier data, contacts, and documents in one place, ready to integrate with your ERP or
                sourcing systems.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-zinc-900">Review-first access</h3>
              <p className="text-sm text-zinc-600">
                Every registration lands in a pending review state so sourcing and compliance teams stay fully in
                control before granting access.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-zinc-900">Audit-ready history</h3>
              <p className="text-sm text-zinc-600">
                Maintain a clear trail of submissions, approvals, and document versions for audits and internal
                reviews.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-zinc-900">Supplier-friendly experience</h3>
              <p className="text-sm text-zinc-600">
                A clean, modern interface that makes it easy for suppliers to complete registrations without training
                or support calls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center text-white">
          <h2 className="text-3xl font-bold">Ready to onboard your next strategic supplier?</h2>
          <p className="mt-4 text-lg text-emerald-50">
            Share a single, secure link with suppliers and centralize everything your team needs to approve them.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/onboarding/playbook">
              <Button size="lg" className="bg-white px-8 text-emerald-700 hover:bg-zinc-50">
                Register as supplier
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white px-8 text-white hover:bg-emerald-600 hover:text-white"
            >
              Contact sourcing team
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50 py-10 text-sm text-zinc-500">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 md:flex-row md:items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-zinc-800">
              <span className="text-sm font-semibold">supplyNest</span>
              <span className="text-xs text-zinc-400">Supplier Portal</span>
            </div>
            <p>© {new Date().getFullYear()} supplyNest. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="hover:text-zinc-800">
              Privacy
            </a>
            <a href="#" className="hover:text-zinc-800">
              Terms
            </a>
            <a href="mailto:support@supplynest.com" className="hover:text-zinc-800">
              Contact support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
