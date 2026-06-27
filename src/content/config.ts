import { defineCollection, z } from "astro:content";

const news = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      category: z.string().default("Baustelle"),
      cover: z.string(),
      coverAlt: z.string().optional(),
      coverContain: z.boolean().default(false),
      project: z.string().optional(),
      draft: z.boolean().default(false),
      instagram: z.string().url().optional(),
    }),
});

export const collections = { news };
