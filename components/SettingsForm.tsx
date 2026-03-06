'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import { Loader2 } from 'lucide-react';

export function SettingsForm() {
  const router = useRouter();
  const getColumnSettings = useUserStore((state) => state.postPerRow);
  const getDateFormatSettings = useUserStore((state) => state.dateFormat);
  const setDateFormat = useUserStore((state) => state.setDateFormat);
  const setPostPerRow = useUserStore((state) => state.setPostPerRow);

  const [columnSettings, setColumnSettings] = useState(getColumnSettings);
  const [dateFormatSettings, setDateFormatSettings] = useState(getDateFormatSettings);
  const [status, setStatus] = useState<'idle' | 'pending' | 'success'>('idle');


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('pending');

    // Update store
    setDateFormat(dateFormatSettings);
    setPostPerRow(columnSettings);

    setStatus('success');
    router.push('/');
    router.refresh();
  }

  const isPending = status === 'pending';


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Date settings */}
      <div>
        <label htmlFor="date" className="mb-2 block text-sm font-semibold">
          Date format
        </label>
        <select
          id="dateFormatSettings"
          value={dateFormatSettings}
          onChange={(e) => setDateFormatSettings(e.target.value)}
          className="w-full resize-none rounded-lg border border-ig-border px-4 py-2.5 text-sm transition-colors focus:border-gray-400 focus:outline-none"
        >
          <option value="MMM dd, yyyy">MMM dd, yyyy</option>
          <option value="dd MMM yyyy">dd MMM yyyy</option>
          <option value="dd/MM/yyyy">dd/MM/yyyy</option>
          <option value="MM/dd/yyyy">MM/dd/yyyy</option>
        </select>
      </div>

      {/* Col in desktop */}
      <div>
        <label htmlFor="column" className="mb-2 block text-sm font-semibold">
          Column in desktop view
        </label>
        <select
          id="columnSettings"
          value={columnSettings}
          onChange={(e) => setColumnSettings(Number(e.target.value))}
          className="w-full resize-none rounded-lg border border-ig-border px-4 py-2.5 text-sm transition-colors focus:border-gray-400 focus:outline-none"
        >
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-ig-blue py-3 text-sm font-semibold text-white transition-colors hover:bg-ig-blue-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
          </>
        ) : (
          'Save'
        )}
      </button>
    </form>
  );
}
