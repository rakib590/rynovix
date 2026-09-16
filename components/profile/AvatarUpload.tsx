"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AvatarUploadProps {
  uid: string;
  avatarUrl: string | null;
  isEditing?: boolean;
  onUpload: (url: string) => void;
}

export default function AvatarUpload({
  uid,
  avatarUrl,
  isEditing = false,
  onUpload,
}: AvatarUploadProps) {
  const supabase = createClient();

  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function uploadAvatar(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file || !uid || !isEditing) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return;
    }

    setUploading(true);

    try {
      const fileExt =
        file.name.split(".").pop()?.toLowerCase() || "jpg";

      const fileName = `${uid}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, {
          upsert: true,
          cacheControl: "3600",
          contentType: file.type,
        });

      if (uploadError) {
        console.error(uploadError);
        alert(uploadError.message);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      const updatedUrl = `${publicUrl}?t=${Date.now()}`;

      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          avatar_url: updatedUrl,
        })
        .eq("id", uid);

      if (profileError) {
        console.error(profileError);
        alert(profileError.message);
        return;
      }

      onUpload(updatedUrl);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while uploading your avatar.");
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Avatar */}
      <div className="relative">
        <Image
          src={avatarUrl || "/default-avatar.png"}
          alt="Profile Avatar"
          width={112}
          height={112}
          className="h-28 w-28 rounded-full border-4 border-blue-500 object-cover shadow-lg"
        />

        {isEditing && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploading ? (
              <Loader2
                size={18}
                className="animate-spin"
              />
            ) : (
              <Camera size={18} />
            )}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/png,image/jpeg,image/jpg,image/webp"
        disabled={!isEditing || uploading}
        onChange={uploadAvatar}
      />

      {uploading ? (
        <p className="text-sm text-blue-400">
          Uploading avatar...
        </p>
      ) : (
        isEditing && (
          <p className="text-xs text-gray-500">
            JPG, PNG or WebP • Max 5MB
          </p>
        )
      )}
    </div>
  );
}