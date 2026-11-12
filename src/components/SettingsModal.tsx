"use client";

import React, { useState } from "react";
import { KeyRound, X } from "lucide-react";

interface SettingsModalProps {
  open: boolean;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
  onClose: () => void;
}

export default function SettingsModal({ open, apiKey, onSaveApiKey, onClose }: SettingsModalProps) {
  const [inputKey, setInputKey] = useState(apiKey);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl border border-stone-200 bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-amber-700" />
            <h3 className="font-serif text-lg font-bold text-stone-900">Optional Gemini API Settings</h3>
          </div>
          <button onClick={onClose} className="rounded p-1 text-stone-400 hover:bg-stone-100">
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-2 text-xs leading-relaxed text-stone-600">
          Your PYQs, official UPSC keys, citations, and Error Registry work 100% locally in SQLite without any API key.
          Optionally add a Gemini API key here (stored in your browser&apos;s localStorage) or set{" "}
          <code className="rounded bg-stone-100 px-1 py-0.5">GEMINI_API_KEY</code> in{" "}
          <code className="rounded bg-stone-100 px-1 py-0.5">.env.local</code> to enable on-demand AI Trap Dissection.
        </p>

        <input
          type="password"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          placeholder="AIza..."
          className="mt-4 w-full rounded-lg border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-900 focus:border-amber-600 focus:outline-none"
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-700"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSaveApiKey(inputKey.trim());
              onClose();
            }}
            className="rounded-lg bg-stone-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
