"use client";
import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";

const businessTypes = ["Manufacturer","Distributor","Service Provider","Trader","Retailer"];

const categories = [
  { label: "IT & Electronics", children: ["Laptops","Servers"] },
  { label: "Raw Materials", children: ["Metals","Plastics"] },
  { label: "Office Supplies", children: ["Stationery","Furniture"] },
];

export default function BusinessSelection() {
  const [type, setType] = React.useState<string>("");
  const [selected, setSelected] = React.useState<string[]>([]);

  React.useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("onboarding.business") || "null");
    if (saved) { setType(saved.type || ""); setSelected(saved.selected || []); }
  }, []);
  React.useEffect(() => {
    localStorage.setItem("onboarding.business", JSON.stringify({ type, selected }));
  }, [type, selected]);

  function toggleCategory(cat: string) {
    setSelected((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Business Type & Categories</h1>

      <div className="space-y-2">
        <label className="text-sm font-medium">Business Type</label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {businessTypes.map((t) => (
            <button
              key={t}
              className={`rounded border p-2 text-sm ${type === t ? "border-blue-600 bg-blue-50" : "border-zinc-300"}`}
              onClick={() => setType(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Categories</label>
        <div className="space-y-3">
          {categories.map((group) => (
            <div key={group.label} className="rounded border border-zinc-200 p-3">
              <div className="font-medium">{group.label}</div>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {group.children.map((c) => (
                  <label key={c} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={selected.includes(c)} onChange={() => toggleCategory(c)} />
                    {c}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Link href="/onboarding/contact"><Button variant="outline">Back</Button></Link>
        <Link href="/onboarding/tax"><Button>Save & Continue</Button></Link>
      </div>
    </div>
  );
}
