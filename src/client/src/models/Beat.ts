export type LeaseType = 'basic' | 'premium' | 'unlimited' | 'exclusive';

export interface BeatTrack {
  id: string;
  slug: string;
  title: string;
  artist: string;
  description: string;
  genre: string;
  bpm: number;
  key: string;
  tags: string[];
  durationSeconds: number;
  previewFrequency: number;
  coverGradient: string;
}

export interface LeaseOption {
  id: LeaseType;
  name: string;
  price: string;
  includedFiles: string[];
  rights: string[];
  limitations: string[];
  recommended?: boolean;
  ctaLabel: string;
  type: 'lease' | 'exclusive';
}

