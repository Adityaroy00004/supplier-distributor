"use client";
import Link from "next/link";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";

export default function OptionalDocuments() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Optional Documents</h1>
      <FileUpload label="ISO Certification" />
      <FileUpload label="MSME Certificate" />
      <FileUpload label="Insurance Papers" />
      <div className="flex gap-2">
        <Link href="/onboarding/tax"><Button variant="outline">Back</Button></Link>
        <Link href="/onboarding/review"><Button>Save & Continue</Button></Link>
      </div>
    </div>
  );
}
