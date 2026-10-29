import { render, screen, within } from '@testing-library/react';
import App from '../App';
import { getContactInfodmation, getExperienceInformation } from '../services/portfolio.service';

it('leads with the introduction and experience, followed by skills, education and contact', () => {
  render(<App />);
  const sections = [
    screen.getByRole('region', { name: 'Andrei Zubrytski' }),
    screen.getByRole('region', { name: 'Professional Experience' }),
    screen.getByRole('region', { name: 'Skills' }),
    screen.getByRole('region', { name: 'Education' }),
    screen.getByRole('contentinfo', { name: 'Contact' }),
  ];
  for (let index = 1; index < sections.length; index += 1) {
    expect(sections[index - 1].compareDocumentPosition(sections[index]) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  }
  expect(screen.getByRole('main')).not.toContainElement(screen.getByRole('contentinfo', { name: 'Contact' }));
  expect(document.querySelector('a[href^="tel:"]')).toBeNull();
  expect(screen.getByRole('link', { name: 'Download CV' })).toHaveAttribute('href', '/api/cv');
  expect(screen.getByRole('link', { name: 'Email me' })).toHaveAttribute('href', `mailto:${getContactInfodmation().email}`);
});

it('shows the current role and contributions before opening its details', () => {
  render(<App />);
  const experience = screen.getByRole('region', { name: 'Professional Experience' });
  const roles = within(experience).getAllByRole('article');
  const current = getExperienceInformation()[0];
  expect(roles).toHaveLength(getExperienceInformation().length);
  expect(within(roles[0]).getByText(current.company)).toBeInTheDocument();
  expect(within(roles[0]).getByText('Current')).toBeInTheDocument();
  for (const contribution of current.responsibilities.slice(0, 2)) {
    expect(within(roles[0]).getByText(contribution)).toBeInTheDocument();
  }
  expect(within(roles[0]).getByRole('button', { name: /^View role details:/ })).toHaveAttribute('aria-haspopup', 'dialog');
  const education = screen.getByRole('region', { name: 'Education' });
  expect(within(education).queryByText(/One of the leading technical universities/)).not.toBeInTheDocument();
});
