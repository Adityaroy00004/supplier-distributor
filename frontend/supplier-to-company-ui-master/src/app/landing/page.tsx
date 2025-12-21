import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <main className="w-full max-w-3xl rounded-lg border bg-white p-10 shadow-sm">
        <h1 className="text-3xl font-semibold">Welcome to AutoSourcing</h1>
        <p className="mt-2 text-zinc-700">
          Streamline procurement across Supplier → Company → Distributor → Shopkeeper → Customer.
        </p>
        <div className="mt-6">
          <h2 className="text-xl font-medium">Register as a Supplier</h2>
          <p className="mt-1 text-zinc-600">
            Submit your company details to become an approved supplier.
          </p>
          <Link href="/onboarding">
            <Button className="mt-4">Start Supplier Onboarding</Button>
          </Link>
        </div>

        <div className="mt-10 space-y-2 text-sm text-zinc-700">
          <h3 className="font-medium">FAQ / Help</h3>
          <ul className="list-disc pl-5">
            <li>Onboarding is a multi-step process with draft auto-save.</li>
            <li>Supported documents: PDF, PNG, JPG.</li>
            <li>Need assistance? Email support@autosourcing.com</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
