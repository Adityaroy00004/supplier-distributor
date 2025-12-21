"use client";
import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";

export default function CompanyInfo() {
  const [form, setForm] = React.useState({
    legalName: "",
    tradeName: "",
    regNo: "",
    country: "",
    state: "",
    addr1: "",
    addr2: "",
    city: "",
    pincode: "",
    year: "",
    size: "",
  });

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  React.useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("onboarding.company") || "null");
    if (saved) setForm(saved);
  }, []);
  React.useEffect(() => {
    localStorage.setItem("onboarding.company", JSON.stringify(form));
  }, [form]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Company Information</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Text label="Legal Business Name" value={form.legalName} onChange={onChange("legalName")} />
        <Text label="Trade Name" value={form.tradeName} onChange={onChange("tradeName")} />
        <Text label="Business Registration Number" value={form.regNo} onChange={onChange("regNo")} />
        <Select label="Country" value={form.country} onChange={onChange("country")} options={["India","USA","UK","Singapore"]} />
        <Text label="State/Province" value={form.state} onChange={onChange("state")} />
        <Text label="Address Line 1" value={form.addr1} onChange={onChange("addr1")} />
        <Text label="Address Line 2" value={form.addr2} onChange={onChange("addr2")} />
        <Text label="City" value={form.city} onChange={onChange("city")} />
        <Text label="Pincode" value={form.pincode} onChange={onChange("pincode")} />
        <Select label="Year of Establishment" value={form.year} onChange={onChange("year")} options={Array.from({length: 100}, (_,i)=> `${new Date().getFullYear()-i}`)} />
        <Select label="Company Size" value={form.size} onChange={onChange("size")} options={["1-10","10-50","50-200","200+"]} />
      </div>
      <div className="flex gap-2">
        <Link href="/onboarding/email"><Button variant="outline">Back</Button></Link>
        <Link href="/onboarding/contact"><Button>Save & Continue</Button></Link>
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

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: any; options: string[] }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <select className="w-full rounded border border-zinc-300 p-2 text-sm" value={value} onChange={onChange}>
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
