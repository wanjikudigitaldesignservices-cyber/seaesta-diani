import { Link } from 'react-router-dom';
import { Shell, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-reef-deep text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="mb-4 flex items-center gap-2 no-underline text-white">
              <Shell className="h-6 w-6 text-seafoam" />
              <span className="font-display text-lg font-semibold">
                Seaesta Studios
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/60">
              Coastal aparthotel studios in Diani Beach, Ukunda, Galu Beach &
              Nairobi. Pool views, kitchenettes, and genuine Kenyan hospitality.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-seafoam">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/locations', label: 'All Locations' },
                { to: '/about', label: 'About Us' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/60 transition-colors hover:text-coral-sand no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-seafoam">
              Locations
            </h4>
            <ul className="space-y-2 text-sm">
              {['Diani Beach', 'Ukunda Town', 'Galu Beach', 'Nairobi'].map(
                (loc) => (
                  <li key={loc} className="flex items-center gap-2 text-white/60">
                    <MapPin className="h-3 w-3 text-seafoam" />
                    {loc}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-seafoam">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-seafoam" />
                +254 700 000 000
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-seafoam" />
                hello@seaesta.co.ke
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Seaesta Studios Diani. All rights
            reserved. •{' '}
            <Link to="/about" className="text-white/40 underline hover:text-coral-sand no-underline">
              Privacy Policy (Kenya DPA 2019)
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
