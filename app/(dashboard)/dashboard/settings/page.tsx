"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

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
    <DashboardLayout>
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
    </DashboardLayout>
  );
}