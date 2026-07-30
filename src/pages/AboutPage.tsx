import { useState } from 'react';
import {
  MapPin,
  Plane,
  TreePalm,
  Mail,
  Phone,
  Send,
  Check,
} from 'lucide-react';
import { submitInquiry } from '@/lib/api';

export function AboutPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await submitInquiry(form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-coral-sand pt-24">
      <div className="mx-auto max-w-7xl px-6 pb-20">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-display text-4xl font-bold text-reef-deep md:text-5xl">
            About Seaesta Studios
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-reef-deep/60">
            A Kenyan coastal aparthotel brand born from a love of Diani's
            turquoise waters, warm hospitality, and the belief that guests
            deserve a better deal than OTA commissions allow.
          </p>
        </div>

        {/* Story section */}
        <div className="mb-20 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-reef-deep">
              Our Story
            </h2>
            <div className="space-y-4 text-reef-deep/70">
              <p>
                Seaesta Studios started with a single pool-view unit in Diani
                Beach — a studio designed for guests who wanted more than a hotel
                room but less fuss than a villa.
              </p>
              <p>
                Today we operate 9 studios across 4 locations: Diani Beach,
                Ukunda Town, Galu Beach, and Nairobi. Each unit features a
                kitchenette, balcony or garden access, and the kind of thoughtful
                touches — good coffee, fast WiFi, local art — that make a stay
                feel personal.
              </p>
              <p>
                With a 4.9-star rating from 34+ Google reviews, our guests keep
                coming back. Now we're making it easier to book direct — no
                Airbnb commissions, no Booking.com fees, just the best price
                guaranteed.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: MapPin,
                title: 'Diani Beach, Kenya',
                text: 'Located on Kenya\'s south coast, regularly voted Africa\'s best beach destination.',
              },
              {
                icon: Plane,
                title: 'Near Ukunda Airport',
                text: 'Just 15 minutes from Ukunda Airstrip (UKA), with daily flights from Nairobi.',
              },
              {
                icon: TreePalm,
                title: 'Coastal Living',
                text: 'Pool-view studios, tropical gardens, and the Indian Ocean a short walk away.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-seafoam/20">
                  <item.icon className="h-6 w-6 text-seafoam" />
                </div>
                <div>
                  <h3 className="mb-1 font-display text-base font-semibold text-reef-deep">
                    {item.title}
                  </h3>
                  <p className="text-sm text-reef-deep/60">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact section */}
        <div className="rounded-3xl bg-reef-deep p-10 md:p-16">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-4 font-display text-3xl font-bold text-white">
                Get In Touch
              </h2>
              <p className="mb-8 text-white/60">
                Questions about our studios, availability, or a custom stay?
                Drop us a message and we'll get back to you within 24 hours.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Phone className="h-5 w-5 text-seafoam" />
                  +254 700 000 000
                </div>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Mail className="h-5 w-5 text-seafoam" />
                  hello@seaesta.co.ke
                </div>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <MapPin className="h-5 w-5 text-seafoam" />
                  Diani Beach Road, Kwale County, Kenya
                </div>
              </div>
            </div>

            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-white/5 p-8 text-center backdrop-blur-sm">
                <Check className="mb-4 h-12 w-12 text-seafoam" />
                <h3 className="font-display text-xl font-bold text-white">
                  Message Sent!
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none backdrop-blur-sm focus:border-seafoam"
                />
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none backdrop-blur-sm focus:border-seafoam"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="Your message"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none backdrop-blur-sm focus:border-seafoam"
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 rounded-xl bg-baobab-coral px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-baobab-coral/90"
                >
                  <Send className="h-4 w-4" />
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
