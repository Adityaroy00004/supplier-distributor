"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthGuard from "@/components/auth-guard";
import { SidebarNav } from "@/components/sidebar-nav";
import { Button } from "@/components/ui/button";

const navItems = [
    { label: "Dashboard", href: "/supplier/dashboard" },
    { label: "Company Profile", href: "/supplier/profile" },
    { label: "Documents", href: "/supplier/documents" },
    { label: "Settings", href: "/supplier/settings" },
];

export default function SupplierLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    return (
        <AuthGuard>
            <div className="flex min-h-screen bg-zinc-50">
                {/* Sidebar */}
                <aside className="fixed inset-y-0 left-0 w-64 border-r border-zinc-200 bg-white">
                    <div className="flex h-full flex-col">
                        {/* Sidebar Header */}
                        <div className="flex h-16 items-center border-b border-zinc-100 px-6">
                            <Link href="/supplier/dashboard" className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-600">
                                    <span className="text-lg font-bold text-white">S</span>
                                </div>
                                <span className="text-xl font-semibold text-zinc-900">supplyNest</span>
                            </Link>
                        </div>

                        {/* Navigation */}
                        <div className="flex-1 overflow-y-auto p-4">
                            <SidebarNav items={navItems} />
                        </div>

                        {/* Sidebar Footer */}
                        <div className="border-t border-zinc-100 p-4">
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-zinc-600 hover:text-zinc-900"
                                onClick={handleLogout}
                            >
                                <svg
                                    className="mr-2 h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                Sign out
                            </Button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="pl-64 flex-1">
                    {/* Top Bar */}
                    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/80 px-8 backdrop-blur-md">
                        <div>
                            <h2 className="text-sm font-medium text-zinc-500">Supplier Panel</h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700">
                                JD
                            </div>
                        </div>
                    </header>

                    <div className="p-8">
                        {children}
                    </div>
                </main>
            </div>
        </AuthGuard>
    );
}
