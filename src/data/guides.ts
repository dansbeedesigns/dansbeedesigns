export interface Guide {
  /** R2 object key for the primary (color/screen) version */
  key: string;
  /** R2 object key for the print-friendly version, if one exists */
  printKey?: string;
  title: string;
  description: string;
  /** Optional path to a cover image under /public/images/guides/ */
  coverImage?: string;
}

export const guides: Guide[] = [
  {
    key: 'dansbee_finishing_guide_color.pdf',
    printKey: 'dansbee_finishing_guide_print.pdf',
    title: 'Wood Finishing Guide',
    description:
      'Stains, oils, lacquers, and poly — when to use each, how to prep the surface, and how to get a finish that actually lasts.',
  },
  {
    key: 'dansbee_measuring_marking_checklist_print.pdf',
    title: 'Measuring & Marking Checklist',
    description:
      'The exact steps to measure and mark accurately before every cut — laminate it, pin it up, and never make an avoidable mistake again.',
  },
  {
    key: 'dansbee_sharpening_guide.pdf',
    printKey: 'dansbee_sharpening_guide_print.pdf',
    title: 'Tool Sharpening Guide',
    description:
      'Keep your chisels, hand planes, and carving tools razor-sharp. Covers stones, strops, angles, and the simple routine that makes sharpening fast.',
  },
];
