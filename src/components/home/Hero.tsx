import { Link } from 'react-router-dom';
import { Star, ChevronRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-reef-deep">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero_bg.png"
          alt="Coastal retreat with pool"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-reef-deep/80 via-reef-deep/70 to-seafoam/50" />
        {/* Animated wave decoration */}
        <svg
          className="absolute bottom-0 left-0 right-0 h-32 text-coral-sand"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            fill="currentColor"
            opacity="0.6"
          >
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="
                M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z;
                M0,80 C240,20 480,100 720,40 C960,80 1200,20 1440,80 L1440,120 L0,120 Z;
                M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z
              "
            />
          </path>
          <path
            d="M0,80 C360,40 720,100 1080,60 C1260,40 1380,80 1440,80 L1440,120 L0,120 Z"
            fill="currentColor"
            opacity="0.3"
          >
            <animate
              attributeName="d"
              dur="6s"
              repeatCount="indefinite"
              values="
                M0,80 C360,40 720,100 1080,60 C1260,40 1380,80 1440,80 L1440,120 L0,120 Z;
                M0,60 C360,100 720,40 1080,80 C1260,60 1380,40 1440,60 L1440,120 L0,120 Z;
                M0,80 C360,40 720,100 1080,60 C1260,40 1380,80 1440,80 L1440,120 L0,120 Z
              "
            />
          </path>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        {/* Trust badge */}
        <div className="mb-8 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-baobab-coral text-baobab-coral"
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-coral-sand">
            4.9★ from 34+ Google Reviews
          </span>
        </div>

        <h1 className="mb-6 max-w-4xl font-display text-5xl font-bold leading-tight text-white md:text-7xl">
          Your Coastal
          <span className="block text-seafoam">Retreat Awaits</span>
        </h1>

        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-white/70">
          Pool-view studios with kitchenettes and balconies across Diani Beach,
          Galu, Ukunda & Nairobi. Book direct — no OTA commissions, best price
          guaranteed.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            to="/locations"
            className="inline-flex items-center gap-2 rounded-xl bg-baobab-coral px-8 py-4 text-base font-semibold text-white no-underline shadow-xl transition-all hover:bg-baobab-coral/90 hover:shadow-2xl hover:-translate-y-0.5"
          >
            Browse Studios
            <ChevronRight className="h-5 w-5" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-base font-semibold text-white no-underline backdrop-blur-sm transition-all hover:bg-white/10"
          >
            About Us
          </Link>
        </div>

        {/* Key stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
          {[
            { value: '9', label: 'Studio Units' },
            { value: '4', label: 'Locations' },
            { value: '4.9★', label: 'Guest Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl font-bold text-seafoam md:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-white/50 md:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
