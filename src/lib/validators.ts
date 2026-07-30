import { z } from 'zod';

export const BookingFormSchema = z.object({
  guest_name: z.string().min(2, 'Name must be at least 2 characters'),
  guest_email: z.string().email('Please enter a valid email'),
  guest_phone: z
    .string()
    .regex(
      /^\+?254[17]\d{8}$/,
      'Please enter a valid Kenyan phone number (+254...)'
    ),
  num_guests: z.number().int().min(1, 'At least 1 guest').max(10, 'Maximum 10 guests'),
  special_requests: z.string().max(500).optional(),
  check_in: z.string().min(1, 'Check-in date is required'),
  check_out: z.string().min(1, 'Check-out date is required'),
  unit_id: z.string().uuid(),
  dpa_consent: z.literal(true, {
    errorMap: () => ({
      message: 'You must consent to data processing under the Kenya DPA 2019',
    }),
  }),
});

export type BookingFormValues = z.infer<typeof BookingFormSchema>;

export const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be under 2000 characters'),
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;
