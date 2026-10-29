export const pageSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
] as const;

export type SectionId = typeof pageSections[number]['id'];
