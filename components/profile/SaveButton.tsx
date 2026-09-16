"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, Check } from "lucide-react";

interface SaveButtonProps {
  onSave: () => Promise<void> | void;
  disabled?: boolean;
}

export default function SaveButton({
  onSave,
  disabled = false,
}: SaveButtonProps) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return;

    const timer = setTimeout(() => {
      setSaved(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [saved]);

  async function handleSave() {
    if (saving || disabled) return;

    try {
      setSaving(true);
      setSaved(false);

      await onSave();

      setSaved(true);
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
      {/* Success Message */}
      <div className="h-5">
        {saved && (
          <div className="flex items-center gap-2 text-sm font-medium text-green-400">
            <Check size={16} />
            Changes saved successfully.
          </div>
        )}
      </div>

      {/* Save Button */}
      <button
        type="button"
        onClick={handleSave}
        disabled={saving || disabled}
        className={`inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ${
          saving || disabled
            ? "cursor-not-allowed bg-blue-600/50"
            : saved
            ? "bg-green-600 hover:bg-green-500"
            : "bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
        }`}
      >
        {saving ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Saving...
          </>
        ) : saved ? (
          <>
            <Check size={18} />
            Saved
          </>
        ) : (
          <>
            <Save size={18} />
            Save Changes
          </>
        )}
      </button>
    </div>
  );
}