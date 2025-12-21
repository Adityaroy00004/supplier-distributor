"use client";
import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";

export default function ContactInfo() {
  const [form, setForm] = React.useState({
    primaryName: "",
    primaryEmail: "",
    phone: "",
    secondaryName: "",
    secondaryEmail: "",
  });

  React.useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("onboarding.contact") || "null");
    if (saved) setForm(saved);
  }, []);
  React.useEffect(() => {
    localStorage.setItem("onboarding.contact", JSON.stringify(form));
  }, [form]);

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Primary & Secondary Contacts</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Text label="Primary Contact Name" value={form.primaryName} onChange={onChange("primaryName")} />
        <Text label="Primary Email" value={form.primaryEmail} onChange={onChange("primaryEmail")} />
        <Text label="Phone Number" value={form.phone} onChange={onChange("phone")} />
        <Text label="Secondary Contact Name (optional)" value={form.secondaryName} onChange={onChange("secondaryName")} />
        <Text label="Secondary Email (optional)" value={form.secondaryEmail} onChange={onChange("secondaryEmail")} />
      </div>
      <div className="flex gap-2">
        <Link href="/onboarding/company"><Button variant="outline">Back</Button></Link>
        <Link href="/onboarding/business"><Button>Save & Continue</Button></Link>
      </div>
    </div>
  );
}

function Text({ label, value, onChange }: { label: string; value: string; onChange: any }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <input className="w-full rounded border border-zinc-300 p-2 text-sm" value={value} onChange={onChange} />
    </div>
  );
}
