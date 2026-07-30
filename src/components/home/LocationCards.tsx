import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { fetchLocations, fetchUnits } from '@/lib/api';
import type { Location, Unit } from '@/lib/types';

// Gradient backgrounds per location for visual variety
const LOCATION_GRADIENTS = [
  'from-seafoam/30 to-reef-deep/80',
  'from-baobab-coral/20 to-reef-deep/80',
  'from-seafoam/20 to-reef-deep/90',
  'from-coral-sand/20 to-reef-deep/80',
];

export function LocationCards() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);

  useEffect(() => {
    Promise.all([fetchLocations(), fetchUnits()]).then(([locs, us]) => {
      setLocations(locs);
      setUnits(us);
    });
  }, []);

  function unitsAtLocation(locId: string) {
    return units.filter((u) => u.location_id === locId);
  }

  function minPrice(locId: string) {
    const locUnits = unitsAtLocation(locId);
    if (locUnits.length === 0) return 0;
    return Math.min(...locUnits.map((u) => u.price_per_night));
  }

  return (
    <section className="bg-coral-sand py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-2 text-center font-display text-sm font-semibold uppercase tracking-widest text-seafoam">
          Our Locations
        </h2>
        <p className="mb-12 text-center font-display text-3xl font-bold text-reef-deep md:text-4xl">
          4 Locations, 9 Studios
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {locations.map((loc, i) => (
            <Link
              key={loc.id}
              to={`/locations?location=${loc.slug}`}
              className="group relative overflow-hidden rounded-2xl no-underline transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Card bg */}
              <img
                src={loc.image_url || '/images/hero_bg.png'}
                alt={loc.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/hero_bg.png';
                }}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${LOCATION_GRADIENTS[i % LOCATION_GRADIENTS.length]}`}
              />
              <div className="relative p-6 pb-8">
                <div className="mb-3 flex items-center gap-1.5 text-seafoam">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {loc.name}
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-white/70">
                  {loc.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-white/50">
                      {unitsAtLocation(loc.id).length} unit
                      {unitsAtLocation(loc.id).length !== 1 ? 's' : ''} ·
                      From{' '}
                    </span>
                    <span className="font-display text-lg font-bold text-coral-sand">
                      KES {minPrice(loc.id).toLocaleString()}
                    </span>
                    <span className="text-xs text-white/50"> /night</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-seafoam transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
