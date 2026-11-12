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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-[28px] border border-stone-200/90 bg-white p-7 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-900">
              <KeyRound className="h-4 w-4" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">Optional Gemini API Settings</h3>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 text-stone-400 hover:bg-stone-100">
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-stone-600">
          Your 2013–2026 PYQs, official UPSC keys, citations, and Error Registry work 100% locally in SQLite and Local Storage without any API key.
          Optionally add a Gemini API key here (stored securely in your browser&apos;s localStorage) to enable on-demand AI Trap Dissection.
        </p>

        <input
          type="password"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          placeholder="AIza..."
          className="mt-4 w-full rounded-2xl border border-stone-300 bg-[#F5F2EC] px-4 py-2.5 text-xs text-stone-900 focus:border-amber-700 focus:bg-white focus:outline-none"
        />

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-full border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSaveApiKey(inputKey.trim());
              onClose();
            }}
            className="rounded-full bg-stone-900 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-stone-800 active:scale-95"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
