import { useMemo, useState, useCallback } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isBefore,
  startOfDay,
  addMonths,
  subMonths,
  getDay,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { AvailabilityBlock } from '@/lib/types';
import { isDateBlocked } from '@/lib/api';
import { cn } from '@/lib/utils';

interface TideCalendarProps {
  blocks: AvailabilityBlock[];
  selectedCheckIn: Date | null;
  selectedCheckOut: Date | null;
  onSelectRange: (checkIn: Date, checkOut: Date | null) => void;
}

const SOURCE_COLORS: Record<string, string> = {
  airbnb: 'bg-blue-400/60',
  direct: 'bg-baobab-coral/60',
  manual: 'bg-gray-400/60',
};

const SOURCE_LABELS: Record<string, string> = {
  airbnb: 'Airbnb',
  direct: 'Direct',
  manual: 'Manual',
};

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function TideCalendar({
  blocks,
  selectedCheckIn,
  selectedCheckOut,
  onSelectRange,
}: TideCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfDay(new Date());

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  // Leading empty cells for alignment
  const leadingBlanks = useMemo(() => {
    return getDay(startOfMonth(currentMonth));
  }, [currentMonth]);

  const handleDayClick = useCallback(
    (day: Date) => {
      if (isBefore(day, today)) return;
      if (isDateBlocked(day, blocks)) return;

      if (!selectedCheckIn || selectedCheckOut) {
        // Start new selection
        onSelectRange(day, null);
      } else {
        // Complete selection
        if (isBefore(day, selectedCheckIn)) {
          onSelectRange(day, null);
        } else {
          onSelectRange(selectedCheckIn, day);
        }
      }
    },
    [blocks, selectedCheckIn, selectedCheckOut, onSelectRange, today]
  );

  const isInSelection = useCallback(
    (day: Date) => {
      if (!selectedCheckIn) return false;
      if (!selectedCheckOut) return day.getTime() === selectedCheckIn.getTime();
      return day >= selectedCheckIn && day <= selectedCheckOut;
    },
    [selectedCheckIn, selectedCheckOut]
  );

  return (
    <div className="rounded-2xl border border-seafoam/30 bg-white p-6 shadow-lg">
      {/* Month nav */}
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="rounded-lg p-2 transition-colors hover:bg-seafoam/10"
        >
          <ChevronLeft className="h-5 w-5 text-reef-deep" />
        </button>
        <h3 className="font-display text-lg font-semibold text-reef-deep">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <button
          type="button"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="rounded-lg p-2 transition-colors hover:bg-seafoam/10"
        >
          <ChevronRight className="h-5 w-5 text-reef-deep" />
        </button>
      </div>

      {/* Animated wave decoration */}
      <div className="relative mb-4 h-8 overflow-hidden rounded-lg">
        <svg
          className="h-full w-full text-seafoam/20"
          viewBox="0 0 400 32"
          preserveAspectRatio="none"
        >
          <path
            d="M0,16 Q50,0 100,16 Q150,32 200,16 Q250,0 300,16 Q350,32 400,16 L400,32 L0,32 Z"
            fill="currentColor"
          >
            <animate
              attributeName="d"
              dur="4s"
              repeatCount="indefinite"
              values="
                M0,16 Q50,0 100,16 Q150,32 200,16 Q250,0 300,16 Q350,32 400,16 L400,32 L0,32 Z;
                M0,20 Q50,32 100,20 Q150,8 200,20 Q250,32 300,20 Q350,8 400,20 L400,32 L0,32 Z;
                M0,16 Q50,0 100,16 Q150,32 200,16 Q250,0 300,16 Q350,32 400,16 L400,32 L0,32 Z
              "
            />
          </path>
        </svg>
      </div>

      {/* Weekday headers */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((wd) => (
          <div
            key={wd}
            className="py-1 text-center text-xs font-semibold uppercase tracking-wider text-reef-deep/50"
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Leading blanks */}
        {Array.from({ length: leadingBlanks }).map((_, i) => (
          <div key={`blank-${i}`} className="aspect-square" />
        ))}

        {days.map((day) => {
          const isPast = isBefore(day, today);
          const block = isDateBlocked(day, blocks);
          const inMonth = isSameMonth(day, currentMonth);
          const inRange = isInSelection(day);
          const isCheckIn =
            selectedCheckIn &&
            day.getTime() === selectedCheckIn.getTime();
          const isCheckOut =
            selectedCheckOut &&
            day.getTime() === selectedCheckOut.getTime();

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={isPast || !!block}
              onClick={() => handleDayClick(day)}
              className={cn(
                'relative aspect-square rounded-lg text-sm font-medium transition-all',
                !inMonth && 'opacity-30',
                isPast && 'cursor-not-allowed opacity-30',
                block && SOURCE_COLORS[block.source],
                block && 'cursor-not-allowed',
                !block && !isPast && 'hover:bg-seafoam/20 cursor-pointer',
                inRange && !block && 'bg-seafoam/30 text-reef-deep',
                (isCheckIn || isCheckOut) &&
                  'bg-baobab-coral text-white font-bold shadow-md',
              )}
            >
              <span className="relative z-10">{format(day, 'd')}</span>
              {/* Wave swell for booked dates */}
              {block && (
                <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-lg">
                  <svg
                    className="h-full w-full"
                    viewBox="0 0 40 4"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,2 Q10,0 20,2 Q30,4 40,2 L40,4 L0,4 Z"
                      fill={
                        block.source === 'airbnb'
                          ? '#60a5fa'
                          : block.source === 'direct'
                            ? '#DB5A3C'
                            : '#9ca3af'
                      }
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-seafoam/20 pt-4">
        {Object.entries(SOURCE_COLORS).map(([source, color]) => (
          <div key={source} className="flex items-center gap-1.5">
            <div className={cn('h-3 w-3 rounded', color)} />
            <span className="text-xs text-reef-deep/60">
              {SOURCE_LABELS[source]}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-seafoam/30" />
          <span className="text-xs text-reef-deep/60">Selected</span>
        </div>
      </div>
    </div>
  );
}
