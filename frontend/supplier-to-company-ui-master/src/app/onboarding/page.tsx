import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OnboardingLanding() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Register as a Supplier on AutoSourcing</h1>
      <p className="text-zinc-600">Submit your company details to become an approved supplier.</p>
      <Link href="/onboarding/company">
        <Button>Start Registration</Button>
      </Link>
      <div className="mt-6 space-y-2 text-sm text-zinc-700">
        <h2 className="font-medium">FAQ / Help</h2>
        <ul className="list-disc pl-5">
          <li>Your progress is auto-saved as draft.</li>
          <li>You can upload documents in PDF/PNG/JPG.</li>
          <li>Contact support: support@autosourcing.com</li>
        </ul>
      </div>
    </div>
  );
}
