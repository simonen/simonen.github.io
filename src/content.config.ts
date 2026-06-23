import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const postsCollection = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      published: z.coerce.date(),
      // updated: z.coerce.date().optional(),
      draft: z.boolean().optional().default(false),
      description: z.string().optional(),
      author: z.string().optional(),
      series: z.string().optional(),
      tags: z.array(z.string()).optional().default([]),
      coverImage: z
        .strictObject({
          src: image(),
          alt: z.string(),
        })
        .optional(),
      toc: z.boolean().optional().default(true),
    }),
})

const homeCollection = defineCollection({
  loader: glob({ pattern: ['home.md', 'home.mdx'], base: './src/content' }),
  schema: ({ image }) =>
    z.object({
      avatarImage: z
        .object({
          src: image(),
          alt: z.string().optional().default('My avatar'),
        })
        .optional(),
      githubCalendar: z.string().optional(), // GitHub username for calendar
    }),
})


const certCollection = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/certs' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      published: z.coerce.date(),
      draft: z.boolean().optional().default(false),
      description: z.string().optional(),
      status: z.string().optional(),
      certification: z.string().optional(),
      author: z.string().optional(),

      tags: z.array(z.string()).optional().default([]),

      issuer: z.string().optional(),
      credentialId: z.string().optional(),
      credentialUrl: z.string().url().optional(),

      badgeImage: z
        .object({
          src: image(),
          alt: z.string(),
        })
        .optional(),
    }),
})

const skillsCollection = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/skills' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
    category: z.string().optional(),
    subcategory: z.string().optional(), // Sub-category like "Cloud", "Containers"
    level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
    url: z.string().url().optional(),
    draft: z.boolean().optional().default(false),
  }),
})

export const collections = {
  posts: postsCollection,
  certs: certCollection,
  skills: skillsCollection,
  home: homeCollection,
}
