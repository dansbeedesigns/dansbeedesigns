export interface Guide {
  /** R2 object key — must exactly match the filename you uploaded to the bucket */
  key: string;
  title: string;
  description: string;
  /** Optional path to a cover image under /public/images/guides/ */
  coverImage?: string;
}

/**
 * Add one entry here for each PDF you upload to the R2 bucket.
 * The `key` must match the filename as stored in R2 exactly.
 */
export const guides: Guide[] = [
  {
    key: 'getting-started-woodworking.pdf',
    title: 'Getting Started with Woodworking',
    description:
      'The complete beginner\'s guide — what tools you actually need, how to set up a first shop, and the mistakes to avoid before you make them.',
  },
  // Add more guides here, e.g.:
  // {
  //   key: 'wood-finishing-guide.pdf',
  //   title: 'Wood Finishing for Beginners',
  //   description: 'Stains, oils, lacquers, and poly — when to use each and how to get a finish that lasts.',
  // },
];
