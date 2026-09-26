/**
 * Testimonials.
 *
 * IMPORTANT: These are PLACEHOLDERS, not real client feedback.
 * Replace each entry with a real testimonial (with the client's permission)
 * and set `placeholder: false`. Add an avatar in /public/images/testimonials/
 * or leave `avatar` empty to show initials.
 */

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  projectType?: string;
  avatar?: string;
  placeholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    name: "[Client Name]",
    role: "[Role, Company]",
    quote:
      "[ADD REAL TESTIMONIAL HERE] — Share what it was like to work together on a software project and the value it brought.",
    projectType: "Software Development",
    placeholder: true,
  },
  {
    id: "placeholder-2",
    name: "[Client Name]",
    role: "[Role, Company]",
    quote:
      "[ADD REAL TESTIMONIAL HERE] — Feedback from a digital marketing or SEO engagement.",
    projectType: "Digital Marketing",
    placeholder: true,
  },
  {
    id: "placeholder-3",
    name: "[Client Name]",
    role: "[Role, Company]",
    quote:
      "[ADD REAL TESTIMONIAL HERE] — Feedback from a branding or graphic design project.",
    projectType: "Graphic Design",
    placeholder: true,
  },
];
