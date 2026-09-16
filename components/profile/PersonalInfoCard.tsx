"use client";

import {
  User,
  AtSign,
  Mail,
  Globe,
  FileText,
} from "lucide-react";

interface PersonalInfoCardProps {
  fullName: string;
  username: string;
  email: string;
  website?: string;
  bio?: string;

  isEditing: boolean;

  onFullNameChange: (value: string) => void;
  onUsernameChange: (value: string) => void;
  onWebsiteChange: (value: string) => void;
  onBioChange: (value: string) => void;
}

export default function PersonalInfoCard({
  fullName,
  username,
  email,
  website,
  bio,
  isEditing,
  onFullNameChange,
  onUsernameChange,
  onWebsiteChange,
  onBioChange,
}: PersonalInfoCardProps) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-[#0B1220] p-6 shadow-xl sm:p-8 transition ${
        isEditing ? "ring-1 ring-blue-500/20" : ""
      }`}
    >
      {/* Header */}
      <div className="mb-7">
        <h2 className="text-xl font-bold text-white">
          Personal Information
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          {isEditing
            ? "Edit your personal profile information."
            : "View your personal profile information."}
        </p>
      </div>

      {/* Information Grid */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Full Name */}
        <div
          className={`rounded-2xl border border-white/10 bg-[#050814] p-5 transition ${
            isEditing ? "focus-within:border-blue-500/50" : ""
          }`}
        >
          <div className="mb-3 flex items-center gap-2">
            <User size={16} className="text-blue-400" />

            <label
              htmlFor="fullName"
              className="text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Full Name
            </label>
          </div>

          {isEditing ? (
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => onFullNameChange(e.target.value)}
              placeholder="Enter your full name"
              className="w-full bg-transparent text-base font-semibold text-white outline-none placeholder:text-gray-600"
            />
          ) : (
            <p className="text-base font-semibold text-white">
              {fullName || "Not provided"}
            </p>
          )}
        </div>

        {/* Username */}
        <div
          className={`rounded-2xl border border-white/10 bg-[#050814] p-5 transition ${
            isEditing ? "focus-within:border-purple-500/50" : ""
          }`}
        >
          <div className="mb-3 flex items-center gap-2">
            <AtSign size={16} className="text-purple-400" />

            <label
              htmlFor="username"
              className="text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Username
            </label>
          </div>

          {isEditing ? (
            <div className="flex items-center">
              <span className="mr-1 text-base font-semibold text-gray-500">
                @
              </span>

              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) =>
                  onUsernameChange(
                    e.target.value.replace(/^@/, "")
                  )
                }
                placeholder="username"
                className="w-full bg-transparent text-base font-semibold text-white outline-none placeholder:text-gray-600"
              />
            </div>
          ) : (
            <p className="text-base font-semibold text-white">
              @{username || "creator"}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="rounded-2xl border border-white/10 bg-[#050814] p-5">
          <div className="mb-3 flex items-center gap-2">
            <Mail size={16} className="text-cyan-400" />

            <label
              htmlFor="email"
              className="text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Email
            </label>
          </div>

          <p className="truncate text-base font-semibold text-gray-400">
            {email || "Not provided"}
          </p>

          <p className="mt-2 text-xs text-gray-600">
            Email cannot be changed here.
          </p>
        </div>

        {/* Website */}
        <div
          className={`rounded-2xl border border-white/10 bg-[#050814] p-5 transition ${
            isEditing ? "focus-within:border-green-500/50" : ""
          }`}
        >
          <div className="mb-3 flex items-center gap-2">
            <Globe size={16} className="text-green-400" />

            <label
              htmlFor="website"
              className="text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Website
            </label>
          </div>

          {isEditing ? (
            <input
              id="website"
              type="url"
              value={website ?? ""}
              onChange={(e) => onWebsiteChange(e.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full bg-transparent text-base font-semibold text-white outline-none placeholder:text-gray-600"
            />
          ) : (
            <p className="truncate text-base font-semibold text-white">
              {website || "Not provided"}
            </p>
          )}
        </div>

        {/* Bio */}
        <div
          className={`rounded-2xl border border-white/10 bg-[#050814] p-5 transition md:col-span-2 ${
            isEditing ? "focus-within:border-pink-500/50" : ""
          }`}
        >
          <div className="mb-3 flex items-center gap-2">
            <FileText size={16} className="text-pink-400" />

            <label
              htmlFor="bio"
              className="text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Bio
            </label>
          </div>

          {isEditing ? (
            <>
              <textarea
                id="bio"
                rows={5}
                value={bio ?? ""}
                onChange={(e) => onBioChange(e.target.value)}
                placeholder="Tell us about yourself..."
                maxLength={300}
                className="w-full resize-none bg-transparent text-sm leading-6 text-gray-300 outline-none placeholder:text-gray-600"
              />

              <div className="mt-2 flex justify-end">
                <span className="text-xs text-gray-600">
                  {(bio ?? "").length}/300
                </span>
              </div>
            </>
          ) : (
            <p className="text-sm leading-6 text-gray-300">
              {bio || "No bio added yet."}
            </p>
          )}
        </div>
      </div>

      {/* Editing Indicator */}
      {isEditing && (
        <div className="mt-6 rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3">
          <p className="text-xs text-blue-400">
            You are currently editing your profile. Changes will
            be applied when you click Save Changes.
          </p>
        </div>
      )}
    </div>
  );
}