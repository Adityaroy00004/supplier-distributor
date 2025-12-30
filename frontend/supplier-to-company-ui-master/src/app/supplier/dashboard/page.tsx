export default function SupplierDashboard() {
  const status = [
    { label: "Email Verified", done: true },
    { label: "Company Information Submitted", done: true },
    { label: "Compliance Review", done: false },
    { label: "Financial Review", done: false },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Registration Status</h1>
        <p className="mt-2 text-zinc-600">Track your progress as we verify your company details.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge text="Draft" />
        <Badge text="Email Verified" variant="success" />
        <Badge text="Submitted" />
        <Badge text="Compliance Review" />
        <Badge text="Financial Review" />
        <Badge text="Additional Info Required" />
        <Badge text="Approved" />
        <Badge text="Rejected" variant="danger" />
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm font-semibold text-zinc-900">Overall Progress</div>
          <div className="text-sm font-medium text-emerald-600">40% Complete</div>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-100">
          <div className="h-full bg-emerald-600 transition-all duration-500" style={{ width: "40%" }} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Timeline */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-zinc-900 uppercase tracking-wider">Milestones</h3>
          <ul className="space-y-4">
            {status.map((s, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                {s.done ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-zinc-200 bg-white" />
                )}
                <span className={s.done ? "font-medium text-zinc-900" : "text-zinc-500"}>
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Items */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-zinc-900 uppercase tracking-wider">Next Steps</h3>
          <ul className="space-y-3">
            {[
              "Upload missing articles of incorporation",
              "Provide secondary contact person details",
              "Verify banking information via small deposit"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-700">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Help Section */}
      <div className="rounded-xl bg-zinc-900 p-8 text-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-bold">Need assistance?</h3>
            <p className="mt-1 text-zinc-400">Our sourcing team is here to help you through the process.</p>
          </div>
          <a
            href="mailto:support@supplynest.com"
            className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}

function Badge({ text, variant }: { text: string; variant?: "success" | "danger" }) {
  const base = "inline-flex items-center rounded border px-2 py-0.5 text-xs";
  const cls =
    variant === "success"
      ? "border-green-600 text-green-700"
      : variant === "danger"
        ? "border-red-600 text-red-700"
        : "border-zinc-300 text-zinc-700";
  return <span className={`${base} ${cls}`}>{text}</span>;
}
