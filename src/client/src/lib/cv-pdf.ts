import PDFDocument from 'pdfkit';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { cvData } from '../data/cv';
import type { Experience } from '../models/Experience';

const MARGIN = 44;
const INK = '#17212B';
const MUTED = '#526170';
const ACCENT = '#25634F';
const RULE = '#DCE2E8';

interface PdfOptions {
  fontDirectory?: string;
}

/** Text-only A4 output. No viewport, browser, or website theme is involved. */
export async function createCvPdf(options: PdfOptions = {}): Promise<Buffer> {
  const fontDirectory = options.fontDirectory ?? path.join(process.cwd(), 'public', 'fonts');
  const regularFont = readFileSync(path.join(fontDirectory, 'Lato-Regular.ttf'));
  const boldFont = readFileSync(path.join(fontDirectory, 'Lato-Bold.ttf'));
  const doc = new PDFDocument({
    size: 'A4', margin: MARGIN, bufferPages: true,
    info: { Title: `${cvData.contact.name} - CV`, Author: cvData.contact.name, Subject: 'Senior Software Engineer CV' },
  });
  const chunks: Buffer[] = [];
  const result = new Promise<Buffer>((resolve, reject) => {
    doc.on('data', chunk => chunks.push(Buffer.from(chunk)));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
  });
  doc.registerFont('Body', regularFont);
  doc.registerFont('Bold', boldFont);
  const width = doc.page.width - MARGIN * 2;
  const limit = doc.page.height - MARGIN - 12;

  function text(value: string, size = 10.5, bold = false, color = INK, indent = 0) {
    doc.font(bold ? 'Bold' : 'Body').fontSize(size).fillColor(color);
    doc.text(value, MARGIN + indent, doc.y, { width: width - indent, lineGap: 2.5 });
    doc.x = MARGIN;
  }
  function height(value: string, size = 10.5, bold = false, indent = 0) {
    doc.font(bold ? 'Bold' : 'Body').fontSize(size);
    return doc.heightOfString(value, { width: width - indent, lineGap: 2.5 });
  }
  function ensureSpace(points: number) {
    if (doc.y + points > limit) doc.addPage();
  }
  function heading(value: string, openingHeight = 0) {
    ensureSpace(34 + openingHeight);
    doc.y += 10;
    text(value, 12, true, ACCENT);
    const y = doc.y + 3;
    doc.moveTo(MARGIN, y).lineTo(MARGIN + width, y).lineWidth(0.6).strokeColor(RULE).stroke();
    doc.y = y + 10;
  }
  function roleHeight(role: Experience, index: number) {
    const bullets = role.responsibilities.slice(0, index < 2 ? 3 : 2);
    return height(`${role.company} | ${role.role}`, 11, true)
      + height(`${role.startDate} - ${role.endDate}`, 9.5)
      + (index < 2 ? height(role.description) : 0)
      + bullets.reduce((total, bullet) => total + height(`- ${bullet}`, 10.5, false, 8) + 2, 0)
      + height(`Technologies: ${role.techStack}`, 9.2) + 18;
  }
  function role(role: Experience, index: number) {
    const required = roleHeight(role, index);
    if (doc.y + required > limit) {
      doc.addPage();
      heading('Professional experience (continued)', required);
    }
    text(`${role.company} | ${role.role}`, 11, true);
    text(`${role.startDate} - ${role.endDate}`, 9.5, false, MUTED);
    doc.y += 3;
    if (index < 2) {
      text(role.description);
      doc.y += 3;
    }
    for (const bullet of role.responsibilities.slice(0, index < 2 ? 3 : 2)) {
      text(`- ${bullet}`, 10.5, false, INK, 8);
      doc.y += 2;
    }
    text(`Technologies: ${role.techStack}`, 9.2, false, MUTED);
    doc.y += 12;
  }

  text(cvData.contact.name, 24, true);
  text(cvData.contact.title, 12.5, false, MUTED);
  text(cvData.contact.location, 10, false, MUTED);
  doc.y += 4;
  for (const [label, href] of [
    [cvData.contact.email, `mailto:${cvData.contact.email}`],
    [cvData.contact.github.replace('https://', ''), cvData.contact.github],
    [cvData.contact.linkedin.replace('https://', ''), cvData.contact.linkedin],
  ]) {
    doc.font('Body').fontSize(9.5).fillColor(ACCENT).text(label, MARGIN, doc.y, { link: href, lineGap: 1.5 });
  }
  heading('Professional summary', height(cvData.summary));
  text(cvData.summary);
  heading('Core technical skills');
  for (const group of cvData.skills) {
    text(`${group.title}${group.note ? ' (exploration)' : ''}: ${group.items.join(', ')}`, 9.8);
    doc.y += 1;
  }
  heading('Professional experience', roleHeight(cvData.experience[0], 0));
  cvData.experience.forEach((item, index) => role(item, index));

  const educationHeight = cvData.education.reduce((total, item) => total
    + height(`${item.degree} | ${item.graduatedYear}`, 10.5, true)
    + height(item.institution, 9.5) + 8, 0);
  heading('Education', educationHeight);
  for (const item of cvData.education) {
    text(`${item.degree} | ${item.graduatedYear}`, 10.5, true);
    text(item.institution, 9.5, false, MUTED);
    doc.y += 8;
  }

  const range = doc.bufferedPageRange();
  for (let index = range.start; index < range.start + range.count; index += 1) {
    doc.switchToPage(index);
    doc.font('Body').fontSize(8).fillColor(MUTED);
    doc.text(cvData.contact.name, MARGIN, doc.page.height - 28, { lineBreak: false });
    const label = `${index + 1} / ${range.count}`;
    doc.text(label, doc.page.width - MARGIN - doc.widthOfString(label), doc.page.height - 28, { lineBreak: false });
  }
  doc.end();
  return result;
}
