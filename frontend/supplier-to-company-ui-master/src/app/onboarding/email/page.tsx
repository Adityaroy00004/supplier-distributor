"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";

export default function EmailVerification() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<string | null>(null);

  function handleVerify() {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus("Invalid Email");
      return;
    }
    if (email.toLowerCase().includes("used")) {
      setStatus("Email Already Used");
      return;
    }
    setStatus("Verification Link Sent");
    try { localStorage.setItem("onboarding.email", JSON.stringify(email)); } catch {}
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Email Verification</h1>
      <div className="space-y-2">
        <label className="text-sm font-medium">Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="w-full rounded border border-zinc-300 p-2 text-sm"
          placeholder="you@company.com"
        />
      </div>
      <Button onClick={handleVerify}>Verify</Button>
      {status && <p className="text-sm text-zinc-700">{status}</p>}
    </div>
  );
}
