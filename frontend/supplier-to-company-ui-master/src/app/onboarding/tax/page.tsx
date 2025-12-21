"use client";
import Link from "next/link";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";

export default function TaxUpload() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Tax Information Upload</h1>
      <FileUpload label="GST Certificate" />
      <FileUpload label="PAN Card" />
      <FileUpload label="Business License / Incorporation" />
      <div className="flex gap-2">
        <Link href="/onboarding/business"><Button variant="outline">Back</Button></Link>
        <Link href="/onboarding/documents"><Button>Save & Continue</Button></Link>
      </div>
    </div>
  );
}
