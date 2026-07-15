// Central place to update the featured video and your "constellation" of sites.
// Editing this file is all that's needed to change what shows on the homepage.

export const youtube = {
  channelHandle: '@DansbeeDesigns',
  channelUrl: 'https://www.youtube.com/@DansbeeDesigns',
  // Swap this out whenever you want to feature a different video.
  // Just the 11-character ID from the YouTube URL (the part after ?v=).
  featuredVideoId: 'BcwzzNx5HjY',
  featuredVideoTitle: 'How to Get Lumber Ready to Build With Milling, Surfacing, and What Beginners Need to Know',
};

export interface ConstellationSite {
  name: string;
  url: string;
  tagline: string;
  // Path to a logo under /public, e.g. '/images/logos/knowyourwood.svg'.
  // Leave null to use a text-based placeholder card until a logo is provided.
  logo: string | null;
}

export const constellation: ConstellationSite[] = [
  {
    name: 'MyShopLayout.org',
    url: 'https://myshoplayout.org',
    tagline: 'Drag and drop layout tool for designing your next shop.',
    logo: '/images/logos/myshoplayout-logo.svg',
  },
  {
    name: 'KnowYourWood.org',
    url: 'https://knowyourwood.org',
    tagline: 'Every species. Every continent. No gatekeeping.',
    logo: '/images/logos/knowyourwood-logo.svg',
  },
  {
    name: 'WoodworkersNearMe.org',
    url: 'https://woodworkersnearme.org',
    tagline: 'Find and connect with local woodworkers.',
    logo: '/images/logos/woodworkersnearme-logo.svg',
  },
  {
    name: 'WoodFinish.org',
    url: 'https://woodfinish.org',
    tagline: 'Find the right finish for your project.',
    logo: '/images/logos/woodfinish-logo.svg',
  },
];
