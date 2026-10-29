'use client';

import { Link } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { getContactInfodmation } from '../services/portfolio.service';

export default function ContactFooter() {
  const contact = getContactInfodmation();
  const names = contact.name.split(' ');
  const shortName = `${names[0]} ${names[names.length - 1][0]}.`;
  return (
    <footer className="contact-bar" id="contact" aria-label="Contact">
      <div className="contact-bar-inner cv-frame">
        <p className="contact-identity" title={`${contact.name} · ${contact.location}`}>
          <span className="contact-identity-long">{contact.name} · {contact.location}</span>
          <span className="contact-identity-short">{shortName} · {contact.location.split(',')[0]}</span>
        </p>
        <div className="contact-links">
          <Link className="contact-link" href={`mailto:${contact.email}`} aria-label={`Email ${contact.name}`} title={contact.email} underline="hover">
            <MailOutlineIcon fontSize="small" /><span className="contact-link-label">{contact.email}</span>
          </Link>
          <Link className="contact-link" href={contact.github} target="_blank" rel="noopener noreferrer" aria-label={`${contact.name} on GitHub`} title="GitHub" underline="hover">
            <GitHubIcon fontSize="small" /><span className="contact-link-label">GitHub</span>
          </Link>
          <Link className="contact-link" href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${contact.name} on LinkedIn`} title="LinkedIn" underline="hover">
            <LinkedInIcon fontSize="small" /><span className="contact-link-label">LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
