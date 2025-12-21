"use client";
import * as React from "react";

export function FileUpload({ label, onFiles }: { label: string; onFiles?: (files: File[]) => void }) {
  const [files, setFiles] = React.useState<File[]>([]);
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-700">{label}</label>
      <input
        type="file"
        multiple
        onChange={(e) => {
          const list = Array.from(e.target.files || []);
          setFiles(list);
          onFiles?.(list);
        }}
        className="block w-full cursor-pointer rounded border border-zinc-300 bg-white p-2 text-sm"
      />
      {files.length > 0 && (
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {files.map((f, idx) => (
            <li key={idx} className="rounded border border-zinc-200 p-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="truncate" title={f.name}>
                  {f.name}
                </span>
                <button
                  className="text-xs text-red-600 hover:underline"
                  onClick={() => setFiles((prev) => prev.filter((_, i) => i !== idx))}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
