import { useState, useEffect } from 'react';
import { fetchUnits } from '@/lib/api';
import type { Unit } from '@/lib/types';
import { parseICalToBlocks } from '@/lib/ical';
import { MOCK_AVAILABILITY_BLOCKS } from '@/lib/mock-data';
import { CalendarSync, Save } from 'lucide-react';

export function AdminPage() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [selectedUnitId, setSelectedUnitId] = useState<string>('');
  const [icalText, setIcalText] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetchUnits().then((us) => {
      setUnits(us);
      if (us.length > 0) {
        setSelectedUnitId(us[0].id);
      }
    });
  }, []);

  const handleSync = () => {
    try {
      if (!icalText.trim()) {
        setStatus({ type: 'error', message: 'Please paste iCal data first.' });
        return;
      }
      
      const newBlocks = parseICalToBlocks(icalText, selectedUnitId);
      
      if (newBlocks.length === 0) {
        setStatus({ type: 'error', message: 'No valid events found in the provided iCal data.' });
        return;
      }

      // Add mock ID and created_at
      const formattedBlocks = newBlocks.map((b) => ({
        ...b,
        id: `blk-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        created_at: new Date().toISOString(),
      }));

      // Push to mock data array (in-memory for this session)
      MOCK_AVAILABILITY_BLOCKS.push(...formattedBlocks);
      
      setStatus({ 
        type: 'success', 
        message: `Successfully parsed and added ${newBlocks.length} availability blocks!` 
      });
      setIcalText('');
      
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Failed to parse iCal' });
    }
  };

  return (
    <div className="min-h-screen bg-coral-sand pt-24">
      <div className="mx-auto max-w-4xl px-6 pb-20">
        <div className="mb-10 text-center">
          <h1 className="mb-3 font-display text-4xl font-bold text-reef-deep md:text-5xl">
            Admin Dashboard
          </h1>
          <p className="text-reef-deep/60">
            Manage unit integrations and sync calendars.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md md:p-10">
          <div className="mb-8 flex items-center gap-3">
            <CalendarSync className="h-8 w-8 text-baobab-coral" />
            <h2 className="font-display text-2xl font-bold text-reef-deep">
              iCal Integration Testing
            </h2>
          </div>
          
          <p className="mb-8 text-sm text-reef-deep/70 leading-relaxed">
            Since the frontend cannot fetch external iCal links directly due to CORS restrictions, 
            you can paste the raw text of an `.ics` file here to test the parser. The blocks will be 
            added to the local mock data and instantly reflected on the unit's booking calendar.
          </p>

          <div className="grid gap-6">
            <div>
              <label htmlFor="unit" className="mb-2 block text-sm font-semibold text-reef-deep">
                Select Unit
              </label>
              <select
                id="unit"
                value={selectedUnitId}
                onChange={(e) => setSelectedUnitId(e.target.value)}
                className="w-full rounded-xl border border-reef-deep/10 bg-coral-sand/30 p-3 text-reef-deep focus:border-seafoam focus:outline-none focus:ring-1 focus:ring-seafoam"
              >
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.location?.name})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="ical" className="mb-2 block text-sm font-semibold text-reef-deep">
                iCal Data (Paste .ics content)
              </label>
              <textarea
                id="ical"
                rows={10}
                value={icalText}
                onChange={(e) => setIcalText(e.target.value)}
                placeholder="BEGIN:VCALENDAR&#10;VERSION:2.0&#10;..."
                className="w-full rounded-xl border border-reef-deep/10 bg-coral-sand/30 p-3 font-mono text-sm text-reef-deep focus:border-seafoam focus:outline-none focus:ring-1 focus:ring-seafoam"
              />
            </div>

            {status && (
              <div className={`rounded-xl p-4 text-sm font-semibold ${status.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-seafoam/10 text-reef-deep'}`}>
                {status.message}
              </div>
            )}

            <div>
              <button
                type="button"
                onClick={handleSync}
                className="flex items-center gap-2 rounded-xl bg-baobab-coral px-6 py-3 font-semibold text-white transition-all hover:bg-baobab-coral/90"
              >
                <Save className="h-5 w-5" />
                Sync Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
