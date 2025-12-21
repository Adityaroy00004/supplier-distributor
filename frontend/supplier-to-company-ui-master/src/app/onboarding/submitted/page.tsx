"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OnboardingSubmitted() {
  const [referenceId, setReferenceId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const refId = localStorage.getItem("onboarding.referenceId");
    if (refId) {
      setReferenceId(refId);
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-6">
      <div className="w-full max-w-2xl rounded-xl border bg-white p-8 shadow-sm">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mb-3 text-2xl font-semibold text-zinc-900">Application Submitted Successfully!</h1>
        <p className="mb-6 text-sm text-zinc-600">
          Your supplier registration has been received and is currently pending review.
          You will receive an email once your account is approved or if any revisions are needed.
        </p>
        
        {referenceId && (
          <div className="mb-6 rounded-lg bg-zinc-50 p-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-500">Reference ID</p>
            <p className="font-mono text-lg font-semibold text-zinc-900">{referenceId}</p>
            <p className="mt-2 text-xs text-zinc-500">
              Please save this reference ID for tracking your application status.
            </p>
          </div>
        )}

        <div className="space-y-3 border-t pt-6">
          <p className="text-sm text-zinc-600">
            <strong>What happens next?</strong>
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-zinc-600">
            <li>Our team will review your documents and information</li>
            <li>You'll receive an email notification within 2-3 business days</li>
            <li>Once approved, you can log in with your registered email and password</li>
          </ul>
        </div>

        <div className="mt-8 flex gap-3">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
          <a href="mailto:support@supplynest.com">
            <Button variant="ghost" className="text-zinc-600">
              Contact Support
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
