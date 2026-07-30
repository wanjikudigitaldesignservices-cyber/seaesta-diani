import type { AvailabilityBlock } from './types';

// Very lightweight iCal parser
// Specifically looks for VEVENT with DTSTART and DTEND
export function parseICalToBlocks(
  icalData: string,
  unitId: string
): Omit<AvailabilityBlock, 'id' | 'created_at'>[] {
  const lines = icalData.split(/\r?\n/);
  const blocks: Omit<AvailabilityBlock, 'id' | 'created_at'>[] = [];

  let inEvent = false;
  let startDate = '';
  let endDate = '';
  let uid = '';

  for (const line of lines) {
    if (line.startsWith('BEGIN:VEVENT')) {
      inEvent = true;
      startDate = '';
      endDate = '';
      uid = '';
    } else if (line.startsWith('END:VEVENT')) {
      inEvent = false;
      if (startDate && endDate) {
        blocks.push({
          unit_id: unitId,
          start_date: startDate,
          end_date: endDate,
          source: 'airbnb',
          external_uid: uid,
        });
      }
    } else if (inEvent) {
      if (line.startsWith('DTSTART')) {
        const val = line.split(':')[1];
        if (val) startDate = formatICalDate(val);
      } else if (line.startsWith('DTEND')) {
        const val = line.split(':')[1];
        if (val) endDate = formatICalDate(val);
      } else if (line.startsWith('UID:')) {
        uid = line.substring(4);
      }
    }
  }

  return blocks;
}

// Convert YYYYMMDD to YYYY-MM-DD
function formatICalDate(dateStr: string): string {
  const d = dateStr.replace(/[^0-9]/g, '');
  if (d.length >= 8) {
    return `${d.substring(0, 4)}-${d.substring(4, 6)}-${d.substring(6, 8)}`;
  }
  return dateStr;
}

// Generate an iCal string from blocks
export function generateICal(blocks: AvailabilityBlock[], unitName: string): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Seaesta Studios//NONSGML Calendar//EN',
    `X-WR-CALNAME:Seaesta - ${unitName}`,
    'CALSCALE:GREGORIAN',
  ];

  for (const block of blocks) {
    lines.push('BEGIN:VEVENT');
    lines.push(`DTSTART;VALUE=DATE:${block.start_date.replace(/-/g, '')}`);
    lines.push(`DTEND;VALUE=DATE:${block.end_date.replace(/-/g, '')}`);
    lines.push(`UID:${block.id}@seaesta-studios.com`);
    lines.push(`SUMMARY:Reserved (${block.source})`);
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}
