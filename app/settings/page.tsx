import { SettingsForm } from '@/components/SettingsForm';

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Settings</h1>
      <SettingsForm />
    </div>
  );
}
