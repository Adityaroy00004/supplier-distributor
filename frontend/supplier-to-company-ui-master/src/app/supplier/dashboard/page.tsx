export default function SupplierDashboard() {
  const status = [
    { label: "Email Verified", done: true },
    { label: "Company Information Submitted", done: true },
    { label: "Compliance Review", done: false },
    { label: "Financial Review", done: false },
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Registration Status</h1>
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
      <div>
        <div className="mb-2 text-sm font-medium">Progress</div>
        <div className="h-2 w-full overflow-hidden rounded bg-zinc-200">
          <div className="h-full bg-blue-600" style={{ width: "40%" }} />
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium">Timeline</div>
        <ul className="space-y-1 text-sm">
          {status.map((s, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className={`inline-block h-2 w-2 rounded-full ${s.done ? "bg-green-600" : "bg-zinc-400"}`} />
              {s.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium">Action Items</div>
        <ul className="list-disc pl-5 text-sm text-zinc-700">
          <li>Upload missing documents</li>
          <li>Respond to queries</li>
          <li>Contact support if needed: support@autosourcing.com</li>
        </ul>
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
