export interface Plan {
  /** R2 object key (filename in the bucket) */
  key: string;
  title: string;
  description: string;
  /** Optional path to a cover image under /public/images/plans/ */
  coverImage?: string;
  /** Full YouTube video URL this plan accompanies */
  youtubeUrl?: string;
  /** YouTube video ID — used to build a thumbnail URL */
  youtubeId?: string;
}

export const plans: Plan[] = [
  {
    key: 'Knotty Alder Utility Shelf.pdf',
    title: 'Knotty Alder Utility Shelf',
    description:
      'Full cut list, dimensions, and assembly notes for the knotty alder utility shelf built on YouTube. Everything you need to build your own.',
    // youtubeUrl: 'https://www.youtube.com/watch?v=XXXXXXX',
    // youtubeId: 'XXXXXXX',
  },
];
