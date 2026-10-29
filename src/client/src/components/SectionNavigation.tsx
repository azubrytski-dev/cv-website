'use client';

import type { MouseEvent } from 'react';
import { pageSections } from '../lib/sections';
import type { SectionId } from '../lib/sections';

export interface SectionNavigationProps {
  activeSection: SectionId;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, id: SectionId) => void;
}

export function SectionLinks({ activeSection, onNavigate }: SectionNavigationProps) {
  return <>{pageSections.map(section => (
    <a
      key={section.id}
      href={`#${section.id}`}
      aria-current={activeSection === section.id ? 'location' : undefined}
      onClick={event => onNavigate(event, section.id)}
    >
      {section.label}
    </a>
  ))}</>;
}

export default function SectionNavigation(props: SectionNavigationProps) {
  return (
    <nav className="section-rail" aria-label="Page sections">
      <SectionLinks {...props} />
    </nav>
  );
}
