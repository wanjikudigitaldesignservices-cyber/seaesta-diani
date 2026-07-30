import { MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function WhatsAppWidget() {
  const [isVisible, setIsVisible] = useState(false);

  // Show the widget after a slight delay so it doesn't pop in aggressively on load
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const phoneNumber = '254721141955';
  const message = encodeURIComponent("Hi Seaesta Studios! I'd like to make a booking inquiry.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 transition-all duration-500',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
      )}
    >
      <div className="relative group flex items-center">
        {/* Tooltip / Label */}
        <div className="absolute right-full mr-4 whitespace-nowrap rounded-lg bg-white px-3 py-2 text-sm font-semibold text-reef-deep shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 hidden md:block">
          Chat with us to book!
          {/* Small triangle arrow */}
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 border-y-4 border-l-4 border-y-transparent border-l-white"></div>
        </div>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 active:scale-95"
          aria-label="Book via WhatsApp"
        >
          <MessageSquare className="h-7 w-7" />
        </a>
      </div>
    </div>
  );
}
