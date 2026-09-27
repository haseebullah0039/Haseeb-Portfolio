/**
 * Client testimonials — REAL feedback only, shared with the client's permission.
 *
 * The Testimonials section stays hidden while this list is empty and appears
 * automatically as soon as you add the first entry (up to ~10 work well).
 *
 * How to add one — copy this block into the list below:
 *
 *   {
 *     id: "client-name-project",           // any unique id
 *     name: "Client Full Name",
 *     role: "Owner, Company Name",          // role and/or company
 *     quote: "What they said, in their own words (2–3 sentences).",
 *     projectType: "Software Development",  // or "Digital Marketing", "Graphic Design", …
 *     avatar: "/images/testimonials/client-name.webp", // optional — only with permission
 *   },
 *
 * Photos: put them in /public/images/testimonials/ (square, ~200×200).
 * Without a photo, a neat initials avatar is shown instead.
 */

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  projectType?: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  // Add real testimonials here.
];

/** True once at least one real testimonial has been added. */
export const hasTestimonials = testimonials.length > 0;
