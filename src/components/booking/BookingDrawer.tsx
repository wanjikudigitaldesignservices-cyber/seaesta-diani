import { useState } from 'react';
import { X, Phone, Mail, User, Users, MessageSquare, Check } from 'lucide-react';
import { differenceInDays, format } from 'date-fns';
import type { Unit } from '@/lib/types';
import { createBooking } from '@/lib/api';
import { cn } from '@/lib/utils';

interface BookingDrawerProps {
  unit: Unit;
  checkIn: Date | null;
  checkOut: Date | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingDrawer({
  unit,
  checkIn,
  checkOut,
  isOpen,
  onClose,
}: BookingDrawerProps) {
  const [formData, setFormData] = useState({
    guest_name: '',
    guest_email: '',
    guest_phone: '+254',
    num_guests: 1,
    special_requests: '',
    dpa_consent: false,
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const nights =
    checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const totalPrice = nights * unit.price_per_night;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIn || !checkOut || nights < 1) return;
    if (!formData.dpa_consent) {
      setErrorMsg('You must consent to data processing under the Kenya DPA 2019');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      await createBooking({
        unit_id: unit.id,
        guest_name: formData.guest_name,
        guest_email: formData.guest_email,
        guest_phone: formData.guest_phone,
        num_guests: formData.num_guests,
        special_requests: formData.special_requests || undefined,
        check_in: format(checkIn, 'yyyy-MM-dd'),
        check_out: format(checkOut, 'yyyy-MM-dd'),
        dpa_consent: formData.dpa_consent,
      });
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Booking failed. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl md:bottom-auto md:right-0 md:left-auto md:top-0 md:h-full md:max-h-full md:w-[480px] md:rounded-l-3xl md:rounded-t-none">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-seafoam/20 bg-white px-6 py-4">
          <div>
            <h3 className="font-display text-lg font-bold text-reef-deep">
              Book {unit.name}
            </h3>
            {checkIn && checkOut && (
              <p className="text-sm text-reef-deep/60">
                {format(checkIn, 'MMM d')} – {format(checkOut, 'MMM d, yyyy')}{' '}
                · {nights} night{nights !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 transition-colors hover:bg-seafoam/10"
          >
            <X className="h-5 w-5 text-reef-deep" />
          </button>
        </div>

        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-seafoam/20">
              <Check className="h-8 w-8 text-seafoam" />
            </div>
            <h4 className="font-display text-xl font-bold text-reef-deep">
              Booking Confirmed!
            </h4>
            <p className="text-sm text-reef-deep/60">
              Demo mode — in production, you'd receive an M-Pesa STK push to
              confirm payment. A confirmation email would be sent to{' '}
              {formData.guest_email}.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 rounded-xl bg-reef-deep px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-reef-deep/90"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 p-6">
            {/* Price summary */}
            <div className="rounded-xl bg-coral-sand/50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-reef-deep/70">
                  KES {unit.price_per_night.toLocaleString()} × {nights} night
                  {nights !== 1 ? 's' : ''}
                </span>
                <span className="font-display text-lg font-bold text-reef-deep">
                  KES {totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Guest name */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-reef-deep">
                <User className="h-4 w-4 text-seafoam" />
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.guest_name}
                onChange={(e) =>
                  setFormData({ ...formData, guest_name: e.target.value })
                }
                className="w-full rounded-lg border border-seafoam/30 bg-white px-4 py-2.5 text-sm text-reef-deep outline-none transition-colors focus:border-seafoam focus:ring-2 focus:ring-seafoam/20"
                placeholder="Jane Muthoni"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-reef-deep">
                <Phone className="h-4 w-4 text-seafoam" />
                Phone (M-Pesa)
              </label>
              <input
                type="tel"
                required
                value={formData.guest_phone}
                onChange={(e) =>
                  setFormData({ ...formData, guest_phone: e.target.value })
                }
                className="w-full rounded-lg border border-seafoam/30 bg-white px-4 py-2.5 text-sm text-reef-deep outline-none transition-colors focus:border-seafoam focus:ring-2 focus:ring-seafoam/20"
                placeholder="+254712345678"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-reef-deep">
                <Mail className="h-4 w-4 text-seafoam" />
                Email
              </label>
              <input
                type="email"
                required
                value={formData.guest_email}
                onChange={(e) =>
                  setFormData({ ...formData, guest_email: e.target.value })
                }
                className="w-full rounded-lg border border-seafoam/30 bg-white px-4 py-2.5 text-sm text-reef-deep outline-none transition-colors focus:border-seafoam focus:ring-2 focus:ring-seafoam/20"
                placeholder="jane@example.com"
              />
            </div>

            {/* Guests */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-reef-deep">
                <Users className="h-4 w-4 text-seafoam" />
                Number of Guests
              </label>
              <select
                value={formData.num_guests}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    num_guests: Number(e.target.value),
                  })
                }
                className="w-full rounded-lg border border-seafoam/30 bg-white px-4 py-2.5 text-sm text-reef-deep outline-none transition-colors focus:border-seafoam focus:ring-2 focus:ring-seafoam/20"
              >
                {Array.from({ length: unit.capacity }, (_, i) => i + 1).map(
                  (n) => (
                    <option key={n} value={n}>
                      {n} guest{n > 1 ? 's' : ''}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Special requests */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-reef-deep">
                <MessageSquare className="h-4 w-4 text-seafoam" />
                Special Requests
              </label>
              <textarea
                value={formData.special_requests}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    special_requests: e.target.value,
                  })
                }
                rows={3}
                className="w-full rounded-lg border border-seafoam/30 bg-white px-4 py-2.5 text-sm text-reef-deep outline-none transition-colors focus:border-seafoam focus:ring-2 focus:ring-seafoam/20"
                placeholder="Early check-in, extra towels, airport pickup..."
              />
            </div>

            {/* DPA Consent */}
            <label className="flex items-start gap-3 rounded-lg border border-seafoam/20 bg-coral-sand/20 p-3">
              <input
                type="checkbox"
                checked={formData.dpa_consent}
                onChange={(e) =>
                  setFormData({ ...formData, dpa_consent: e.target.checked })
                }
                className="mt-0.5 h-4 w-4 rounded border-seafoam text-seafoam focus:ring-seafoam"
              />
              <span className="text-xs leading-relaxed text-reef-deep/70">
                I consent to the processing of my personal data (name, phone,
                email) for this booking, in accordance with the{' '}
                <strong>Kenya Data Protection Act 2019</strong>. My data will be
                retained only for the duration of the stay + 30 days.
              </span>
            </label>

            {errorMsg && (
              <p className="text-sm font-medium text-red-500">{errorMsg}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'submitting' || nights < 1}
              className={cn(
                'w-full rounded-xl py-3.5 text-sm font-bold transition-all',
                status === 'submitting'
                  ? 'cursor-wait bg-seafoam/50 text-white'
                  : 'bg-baobab-coral text-white shadow-lg hover:bg-baobab-coral/90 hover:shadow-xl'
              )}
            >
              {status === 'submitting'
                ? 'Sending M-Pesa push...'
                : `Pay KES ${totalPrice.toLocaleString()} via M-Pesa`}
            </button>

            <p className="text-center text-xs text-reef-deep/40">
              🔒 Sandbox mode — no real payment will be processed
            </p>
          </form>
        )}
      </div>
    </>
  );
}
