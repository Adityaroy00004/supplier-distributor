"use client";
import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";

export default function ReviewSubmit() {
  const [data, setData] = React.useState<any>(null);
  React.useEffect(() => {
    const email = JSON.parse(localStorage.getItem("onboarding.email") || "null");
    const company = JSON.parse(localStorage.getItem("onboarding.company") || "null");
    const contact = JSON.parse(localStorage.getItem("onboarding.contact") || "null");
    const business = JSON.parse(localStorage.getItem("onboarding.business") || "null");
    setData({ email, company, contact, business });
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Review & Submit</h1>
      <div className="space-y-3 text-sm">
        <Section title="Company Info"><pre className="whitespace-pre-wrap">{JSON.stringify(data?.company, null, 2)}</pre></Section>
        <Section title="Contacts"><pre className="whitespace-pre-wrap">{JSON.stringify(data?.contact, null, 2)}</pre></Section>
        <Section title="Categories"><pre className="whitespace-pre-wrap">{JSON.stringify(data?.business, null, 2)}</pre></Section>
        <Section title="Documents">Uploaded files will be processed on submit.</Section>
      </div>
      <div className="flex gap-2">
        <Link href="/onboarding/documents"><Button variant="outline">Edit</Button></Link>
        <Link href="/supplier/dashboard"><Button>Submit Registration</Button></Link>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded border border-zinc-200 p-3">
      <div className="mb-2 font-medium">{title}</div>
      {children}
    </div>
  );
}
