"use client";

import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AvatarUploadProps {
  uid: string;
  avatarUrl: string | null;
  onUpload: (url: string) => void;
}

export default function AvatarUpload({
  uid,
  avatarUrl,
  onUpload,
}: AvatarUploadProps) {
  const supabase = createClient();

  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  async function uploadAvatar(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const fileName = `${uid}/avatar.${fileExt}`;

    console.log("UID:", uid);
console.log("File Name:", fileName);

const {
  data: { user },
} = await supabase.auth.getUser();

console.log("Logged User:", user);

    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, {
        upsert: true,
      });

    if (error) {
      alert(error.message);
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);
      await supabase
  .from("profiles")
  .update({
    avatar_url: publicUrl,
  })
  .eq("id", uid);

    onUpload(publicUrl);

    setUploading(false);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <img
          src={avatarUrl || "/default-avatar.png"}
          alt="Avatar"
          className="h-28 w-28 rounded-full border-4 border-blue-500 object-cover"
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white transition hover:bg-blue-700"
        >
          <Camera size={18} />
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={uploadAvatar}
      />

      {uploading && (
        <p className="text-sm text-gray-400">
          Uploading...
        </p>
      )}
    </div>
  );
}