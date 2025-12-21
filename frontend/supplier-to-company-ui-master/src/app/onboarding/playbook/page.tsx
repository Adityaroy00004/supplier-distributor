"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PlaybookOnboarding() {
  const router = useRouter();
  const [activeSection, setActiveSection] = React.useState("account");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Form state
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [company, setCompany] = React.useState({
    name: "",
    gstNumber: "",
    panNumber: "",
    address: "",
    country: "",
    yearOfEstablishment: "",
    numberOfEmployees: "",
    industryCategory: "",
    businessType: "",
  });

  const [contact, setContact] = React.useState({
    contactPersonName: "",
    contactEmail: "",
    contactPhone: "",
    secondaryName: "",
    secondaryEmail: "",
  });

  const [business, setBusiness] = React.useState({
    type: "",
    selected: [] as string[],
    shippingCapabilities: "",
    paymentTerms: "",
    annualRevenueRange: "",
  });

  const [banking, setBanking] = React.useState({
    bankAccountNumber: "",
    ifscOrSwift: "",
    bankName: "",
    branchAddress: "",
  });

  // Document files state
  const [files, setFiles] = React.useState({
    gstCertificate: null as File | null,
    panCard: null as File | null,
    businessLicense: null as File | null,
    isoCertificate: null as File | null,
    msmeCertificate: null as File | null,
    insurancePapers: null as File | null,
  });

  // Load from localStorage on mount
  React.useEffect(() => {
    try {
      const savedEmail = JSON.parse(localStorage.getItem("onboarding.email") || "null");
      if (typeof savedEmail === "string") setEmail(savedEmail);
      else if (savedEmail?.email) setEmail(savedEmail.email);

      const savedPassword = JSON.parse(localStorage.getItem("onboarding.password") || "null");
      if (savedPassword?.password) setPassword(savedPassword.password);

      const savedCompany = JSON.parse(localStorage.getItem("onboarding.company") || "null");
      if (savedCompany) setCompany(savedCompany);

      const savedContact = JSON.parse(localStorage.getItem("onboarding.contact") || "null");
      if (savedContact) setContact(savedContact);

      const savedBusiness = JSON.parse(localStorage.getItem("onboarding.business") || "null");
      if (savedBusiness) setBusiness(savedBusiness);

      const savedBanking = JSON.parse(localStorage.getItem("onboarding.banking") || "null");
      if (savedBanking) setBanking(savedBanking);
    } catch {}
  }, []);

  // Auto-save to localStorage
  React.useEffect(() => {
    localStorage.setItem("onboarding.email", JSON.stringify(email));
  }, [email]);

  React.useEffect(() => {
    if (password) localStorage.setItem("onboarding.password", JSON.stringify({ password }));
  }, [password]);

  React.useEffect(() => {
    localStorage.setItem("onboarding.company", JSON.stringify(company));
  }, [company]);

  React.useEffect(() => {
    localStorage.setItem("onboarding.contact", JSON.stringify(contact));
  }, [contact]);

  React.useEffect(() => {
    localStorage.setItem("onboarding.business", JSON.stringify(business));
  }, [business]);

  React.useEffect(() => {
    localStorage.setItem("onboarding.banking", JSON.stringify(banking));
  }, [banking]);

  // Scroll spy
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = ["account", "company", "contact", "business", "banking", "documents", "review"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  async function handleSubmit() {
    setError(null);
    setSubmitting(true);
    try {
      // Prepare supplier information DTO
      const supplierInfo = {
        name: company.name,
        gstNumber: company.gstNumber,
        panNumber: company.panNumber,
        address: company.address,
        contactPersonName: contact.contactPersonName,
        contactEmail: contact.contactEmail,
        contactPhone: contact.contactPhone,
        country: company.country,
        password: password,
        industryCategory: company.industryCategory,
        businessType: company.businessType,
        yearOfEstablishment: company.yearOfEstablishment ? parseInt(company.yearOfEstablishment) : null,
        numberOfEmployees: company.numberOfEmployees ? parseInt(company.numberOfEmployees.split("-")[0]) : null,
        bankAccountNumber: "", // Add banking fields if needed
        ifscOrSwift: "",
        bankName: "",
        branchAddress: "",
        shippingCapabilities: business.shippingCapabilities,
        paymentTerms: business.paymentTerms,
        annualRevenueRange: business.annualRevenueRange,
      };

      // Create FormData for multipart request
      const formData = new FormData();
      
      // Append files (required)
      if (!files.gstCertificate || !files.panCard || !files.businessLicense) {
        throw new Error("Please upload all required documents (GST Certificate, PAN Card, and Business License)");
      }
      
      formData.append("gstCertificate", files.gstCertificate);
      formData.append("panCard", files.panCard);
      formData.append("businessLicense", files.businessLicense);
      
      // Append optional files (create empty blobs if not provided)
      formData.append("isoCertificate", files.isoCertificate || new Blob());
      formData.append("msmeCertificate", files.msmeCertificate || new Blob());
      formData.append("insurancePapers", files.insurancePapers || new Blob());
      
      // Append supplier information as JSON string
      formData.append("supplierInformation", JSON.stringify(supplierInfo));

      const res = await fetch("http://localhost:8080/s2c/api/v1/supplier/start-registration", {
        method: "POST",
        body: formData,
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to submit registration");
      }
      
      const result = await res.json();
      // Store reference ID for confirmation page
      localStorage.setItem("onboarding.referenceId", result.referenceId);
      router.push("/onboarding/submitted");
    } catch (e: any) {
      setError(e?.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  // Check completion status
  const isAccountComplete = email && password && password === confirmPassword && password.length >= 8;
  const isCompanyComplete = company.name && company.gstNumber && company.panNumber && company.country;
  const isContactComplete = contact.contactPersonName && contact.contactEmail && contact.contactPhone;
  const isBusinessComplete = business.type && business.shippingCapabilities;
  const isBankingComplete = banking.bankAccountNumber && banking.ifscOrSwift && banking.bankName;
  const isDocumentsComplete = !!(files.gstCertificate && files.panCard && files.businessLicense);

  const sections = [
    { id: "account", label: "Account Setup", complete: isAccountComplete },
    { id: "company", label: "Company Information", complete: isCompanyComplete },
    { id: "contact", label: "Contact Details", complete: isContactComplete },
    { id: "business", label: "Business Profile", complete: isBusinessComplete },
    { id: "banking", label: "Banking Details", complete: isBankingComplete },
    { id: "documents", label: "Documents", complete: isDocumentsComplete },
    { id: "review", label: "Review & Submit", complete: false },
  ];

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="text-lg font-semibold">
            supplyNest
          </a>
          <span className="text-sm text-zinc-600">Supplier Onboarding</span>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-8">
        {/* Sticky sidebar progress */}
        <aside className="hidden w-64 lg:block">
          <div className="sticky top-24 space-y-2">
            <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500">Playbook Progress</p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-200">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{
                    width: `${(sections.filter((s) => s.complete).length / (sections.length - 1)) * 100}%`,
                  }}
                />
              </div>
              <p className="mt-2 text-xs text-zinc-600">
                {sections.filter((s) => s.complete).length} of {sections.length - 1} completed
              </p>
            </div>
            {sections.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                  activeSection === section.id
                    ? "bg-emerald-50 shadow-sm ring-1 ring-emerald-200"
                    : "hover:bg-zinc-50"
                }`}
              >
                <div
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    section.complete
                      ? "bg-emerald-500 text-white"
                      : activeSection === section.id
                      ? "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500"
                      : "bg-zinc-200 text-zinc-600"
                  }`}
                >
                  {section.complete ? "✓" : idx + 1}
                </div>
                <div className="flex-1">
                  <div
                    className={`text-sm font-medium ${
                      activeSection === section.id ? "text-emerald-700" : "text-zinc-700"
                    }`}
                  >
                    {section.label}
                  </div>
                  {section.complete && (
                    <div className="text-xs text-emerald-600">Complete</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 space-y-12">
          {/* Account Setup Section */}
          <section id="account" className="scroll-mt-24 rounded-xl border bg-white shadow-sm">
            <div className="border-b bg-zinc-50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">Account Setup</h2>
                  <p className="mt-0.5 text-sm text-zinc-600">Create your login credentials</p>
                </div>
                {isAccountComplete && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Complete
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-5 p-6">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="you@company.com"
                />
                <p className="mt-1.5 text-xs text-zinc-500">This will be your login username</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    placeholder="At least 8 characters"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    placeholder="Re-enter password"
                  />
                </div>
              </div>
              {password && password !== confirmPassword && (
                <p className="text-xs text-red-600">Passwords do not match</p>
              )}
              {password && password.length < 8 && (
                <p className="text-xs text-amber-600">Password must be at least 8 characters</p>
              )}
            </div>
          </section>

          {/* Company Section */}
          <section id="company" className="scroll-mt-24 rounded-xl border bg-white shadow-sm">
            <div className="border-b bg-zinc-50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">Company Information</h2>
                  <p className="mt-0.5 text-sm text-zinc-600">Tell us about your organization</p>
                </div>
                {isCompanyComplete && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Complete
                  </span>
                )}
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">Legal Business Name</label>
                  <input
                    value={company.name}
                    onChange={(e) => setCompany({ ...company, name: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">GST Number</label>
                <input
                  value={company.gstNumber}
                  onChange={(e) => setCompany({ ...company, gstNumber: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">PAN Number</label>
                <input
                  value={company.panNumber}
                  onChange={(e) => setCompany({ ...company, panNumber: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Country</label>
                <select
                  value={company.country}
                  onChange={(e) => setCompany({ ...company, country: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="">Select...</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium">Registered Address</label>
                <input
                  value={company.address}
                  onChange={(e) => setCompany({ ...company, address: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Year of Establishment</label>
                <select
                  value={company.yearOfEstablishment}
                  onChange={(e) => setCompany({ ...company, yearOfEstablishment: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="">Select...</option>
                  {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Number of Employees</label>
                <select
                  value={company.numberOfEmployees}
                  onChange={(e) => setCompany({ ...company, numberOfEmployees: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="">Select...</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="500+">500+</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Industry Category</label>
                <input
                  value={company.industryCategory}
                  onChange={(e) => setCompany({ ...company, industryCategory: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Business Type</label>
                <input
                  value={company.businessType}
                  onChange={(e) => setCompany({ ...company, businessType: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="scroll-mt-24 rounded-xl border bg-white shadow-sm">
            <div className="border-b bg-zinc-50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">Contact Details</h2>
                  <p className="mt-0.5 text-sm text-zinc-600">Primary and secondary contacts</p>
                </div>
                {isContactComplete && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Complete
                  </span>
                )}
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">Primary Contact Name</label>
                <input
                  value={contact.contactPersonName}
                  onChange={(e) => setContact({ ...contact, contactPersonName: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Primary Email</label>
                <input
                  type="email"
                  value={contact.contactEmail}
                  onChange={(e) => setContact({ ...contact, contactEmail: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Phone Number</label>
                <input
                  value={contact.contactPhone}
                  onChange={(e) => setContact({ ...contact, contactPhone: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Secondary Contact Name (optional)</label>
                <input
                  value={contact.secondaryName}
                  onChange={(e) => setContact({ ...contact, secondaryName: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Secondary Email (optional)</label>
                <input
                  type="email"
                  value={contact.secondaryEmail}
                  onChange={(e) => setContact({ ...contact, secondaryEmail: e.target.value })}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                </div>
              </div>
            </div>
          </section>

          {/* Business Section */}
          <section id="business" className="scroll-mt-24 rounded-xl border bg-white shadow-sm">
            <div className="border-b bg-zinc-50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">Business Profile</h2>
                  <p className="mt-0.5 text-sm text-zinc-600">Business type and capabilities</p>
                </div>
                {isBusinessComplete && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Complete
                  </span>
                )}
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700">Business Type</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {["Manufacturer", "Distributor", "Service Provider", "Trader", "Retailer"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setBusiness({ ...business, type })}
                      className={`rounded-lg border px-3 py-2 text-sm transition ${
                        business.type === type
                          ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                          : "border-zinc-300 hover:border-zinc-400"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">Shipping Capabilities</label>
                  <input
                    value={business.shippingCapabilities}
                    onChange={(e) => setBusiness({ ...business, shippingCapabilities: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="Domestic, international, express, etc."
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Payment Terms</label>
                  <input
                    value={business.paymentTerms}
                    onChange={(e) => setBusiness({ ...business, paymentTerms: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="Net 30, advance, etc."
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Annual Revenue Range</label>
                  <input
                    value={business.annualRevenueRange}
                    onChange={(e) => setBusiness({ ...business, annualRevenueRange: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="e.g. $1M - $5M"
                  />
                </div>
                </div>
              </div>
            </div>
          </section>

          {/* Banking Section */}
          <section id="banking" className="scroll-mt-24 rounded-xl border bg-white shadow-sm">
            <div className="border-b bg-zinc-50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">Banking Details</h2>
                  <p className="mt-0.5 text-sm text-zinc-600">Bank account information for payments</p>
                </div>
                {isBankingComplete && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Complete
                  </span>
                )}
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">Bank Account Number</label>
                  <input
                    value={banking.bankAccountNumber}
                    onChange={(e) => setBanking({ ...banking, bankAccountNumber: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    placeholder="Enter account number"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">IFSC / SWIFT Code</label>
                  <input
                    value={banking.ifscOrSwift}
                    onChange={(e) => setBanking({ ...banking, ifscOrSwift: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    placeholder="IFSC or SWIFT code"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">Bank Name</label>
                  <input
                    value={banking.bankName}
                    onChange={(e) => setBanking({ ...banking, bankName: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    placeholder="Name of the bank"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-700">Branch Address</label>
                  <input
                    value={banking.branchAddress}
                    onChange={(e) => setBanking({ ...banking, branchAddress: e.target.value })}
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    placeholder="Bank branch location"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Documents Section */}
          <section id="documents" className="scroll-mt-24 rounded-xl border bg-white shadow-sm">
            <div className="border-b bg-zinc-50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">Documents</h2>
                  <p className="mt-0.5 text-sm text-zinc-600">Upload required compliance documents</p>
                </div>
                {isDocumentsComplete && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Complete
                  </span>
                )}
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="rounded-lg border border-zinc-200 p-4">
                  <label className="mb-2 block text-sm font-medium text-zinc-700">
                    GST Certificate <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFiles({ ...files, gstCertificate: e.target.files?.[0] || null })}
                    className="w-full text-sm text-zinc-600 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-emerald-700 hover:file:bg-emerald-100"
                  />
                  {files.gstCertificate && (
                    <p className="mt-1.5 text-xs text-emerald-600">✓ {files.gstCertificate.name}</p>
                  )}
                  <p className="mt-1.5 text-xs text-zinc-500">PDF, JPG, or PNG (max 5MB)</p>
                </div>
                <div className="rounded-lg border border-zinc-200 p-4">
                  <label className="mb-2 block text-sm font-medium text-zinc-700">
                    PAN Card <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFiles({ ...files, panCard: e.target.files?.[0] || null })}
                    className="w-full text-sm text-zinc-600 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-emerald-700 hover:file:bg-emerald-100"
                  />
                  {files.panCard && (
                    <p className="mt-1.5 text-xs text-emerald-600">✓ {files.panCard.name}</p>
                  )}
                  <p className="mt-1.5 text-xs text-zinc-500">PDF, JPG, or PNG (max 5MB)</p>
                </div>
                <div className="rounded-lg border border-zinc-200 p-4">
                  <label className="mb-2 block text-sm font-medium text-zinc-700">
                    Business License / Incorporation Certificate <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFiles({ ...files, businessLicense: e.target.files?.[0] || null })}
                    className="w-full text-sm text-zinc-600 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-emerald-700 hover:file:bg-emerald-100"
                  />
                  {files.businessLicense && (
                    <p className="mt-1.5 text-xs text-emerald-600">✓ {files.businessLicense.name}</p>
                  )}
                  <p className="mt-1.5 text-xs text-zinc-500">PDF, JPG, or PNG (max 5MB)</p>
                </div>
                <div className="rounded-lg border border-zinc-200 p-4">
                  <label className="mb-2 block text-sm font-medium text-zinc-700">ISO Certificate (optional)</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFiles({ ...files, isoCertificate: e.target.files?.[0] || null })}
                    className="w-full text-sm text-zinc-600 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-emerald-700 hover:file:bg-emerald-100"
                  />
                  {files.isoCertificate && (
                    <p className="mt-1.5 text-xs text-emerald-600">✓ {files.isoCertificate.name}</p>
                  )}
                  <p className="mt-1.5 text-xs text-zinc-500">PDF, JPG, or PNG (max 5MB)</p>
                </div>
                <div className="rounded-lg border border-zinc-200 p-4">
                  <label className="mb-2 block text-sm font-medium text-zinc-700">MSME Certificate (optional)</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFiles({ ...files, msmeCertificate: e.target.files?.[0] || null })}
                    className="w-full text-sm text-zinc-600 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-emerald-700 hover:file:bg-emerald-100"
                  />
                  {files.msmeCertificate && (
                    <p className="mt-1.5 text-xs text-emerald-600">✓ {files.msmeCertificate.name}</p>
                  )}
                  <p className="mt-1.5 text-xs text-zinc-500">PDF, JPG, or PNG (max 5MB)</p>
                </div>
                <div className="rounded-lg border border-zinc-200 p-4">
                  <label className="mb-2 block text-sm font-medium text-zinc-700">Insurance Papers (optional)</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFiles({ ...files, insurancePapers: e.target.files?.[0] || null })}
                    className="w-full text-sm text-zinc-600 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-emerald-700 hover:file:bg-emerald-100"
                  />
                  {files.insurancePapers && (
                    <p className="mt-1.5 text-xs text-emerald-600">✓ {files.insurancePapers.name}</p>
                  )}
                  <p className="mt-1.5 text-xs text-zinc-500">PDF, JPG, or PNG (max 5MB)</p>
                </div>
              </div>
            </div>
          </section>

          {/* Review Section */}
          <section id="review" className="scroll-mt-24 rounded-xl border bg-white shadow-sm">
            <div className="border-b bg-zinc-50 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900">Review & Submit</h2>
                <p className="mt-0.5 text-sm text-zinc-600">Verify your information before submitting</p>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
              <div className="rounded-lg bg-zinc-50 p-4">
                <h3 className="mb-2 text-sm font-semibold">Email</h3>
                <p className="text-sm text-zinc-700">{email || "Not provided"}</p>
              </div>
              <div className="rounded-lg bg-zinc-50 p-4">
                <h3 className="mb-2 text-sm font-semibold">Company</h3>
                <p className="text-sm text-zinc-700">{company.name || "Not provided"}</p>
              </div>
              <div className="rounded-lg bg-zinc-50 p-4">
                <h3 className="mb-2 text-sm font-semibold">Primary Contact</h3>
                <p className="text-sm text-zinc-700">
                  {contact.contactPersonName || "Not provided"} • {contact.contactEmail || "Not provided"}
                </p>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 sm:w-auto"
              >
                {submitting ? "Submitting..." : "Submit Registration"}
              </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
