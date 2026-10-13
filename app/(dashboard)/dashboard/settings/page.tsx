"use client";


import SettingsHeader from "@/components/settings/SettingsHeader";
import ProfileSettings from "@/components/settings/ProfileSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import AISettings from "@/components/settings/AISettings";
import BillingSettings from "@/components/settings/BillingSettings";
import StorageSettings from "@/components/settings/StorageSettings";
import DangerZone from "@/components/settings/DangerZone";

export default function SettingsPage() {
  return (
      <div className="space-y-8">

        <SettingsHeader />

        <ProfileSettings />

        <SecuritySettings />

        <AppearanceSettings />

        <NotificationSettings />

        <AISettings />

        <BillingSettings />

        <StorageSettings />

        <DangerZone />

      </div>
  );
}