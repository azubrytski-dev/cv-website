import { createRequire } from 'module';

const require = createRequire(import.meta.url);

interface ContactMock {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  skype: string;
  github: string;
  linkedin: string;
}

interface EducationMock {
  institution: string;
  degree: string;
  specialization: string;
  graduatedYear: number;
}

interface ExperienceMock {
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

interface SkillCategoryMock {
  key: string;
  skills: Array<{ title: string }>;
}

const { contactDataMock } = require('../models/Contact') as { contactDataMock: ContactMock };
const { educationDataMock } = require('../models/Education') as { educationDataMock: EducationMock[] };
const { experienceDataMock } = require('../models/Experience') as { experienceDataMock: ExperienceMock[] };
const { skillCategoriesDataMock } = require('../models/Skill') as { skillCategoriesDataMock: SkillCategoryMock[] };

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const LEFT_MARGIN = 38;
const RIGHT_MARGIN = 38;
const TOP_MARGIN = 36;
const BOTTOM_MARGIN = 36;
const CONTENT_WIDTH = PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN;

type FontName = 'regular' | 'bold';

interface TextOptions {
  x?: number;
  font?: FontName;
  size?: number;
  color?: [number, number, number];
}

interface RichTextSegment {
  text: string;
  font?: FontName;
}

interface LabeledLine {
  label: string;
  value: string;
}

interface ExperienceBlock {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibility: string;
}

const fontMap: Record<FontName, string> = {
  regular: 'F1',
  bold: 'F2',
};

function escapePdfText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function wrapText(value: string, maxChars: number): string[] {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (!normalized) {
    return [''];
  }

  const words = normalized.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;

    if (nextLine.length <= maxChars) {
      currentLine = nextLine;
      continue;
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    if (word.length <= maxChars) {
      currentLine = word;
      continue;
    }

    let chunk = '';
    for (const character of word) {
      const nextChunk = `${chunk}${character}`;
      if (nextChunk.length > maxChars) {
        lines.push(chunk);
        chunk = character;
      } else {
        chunk = nextChunk;
      }
    }
    currentLine = chunk;
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function createTextLine(
  text: string,
  y: number,
  { x = LEFT_MARGIN, font = 'regular', size = 10, color = [0.12, 0.12, 0.12] }: TextOptions = {},
): string {
  return [
    `${color[0]} ${color[1]} ${color[2]} rg`,
    `BT /${fontMap[font]} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapePdfText(text)}) Tj ET`,
  ].join('\n');
}

function estimateTextWidth(text: string, size: number, font: FontName): number {
  const fontFactor = font === 'bold' ? 0.58 : 0.48;
  return text.length * size * fontFactor;
}

function createRichTextLine(
  segments: RichTextSegment[],
  y: number,
  { x = LEFT_MARGIN, size = 10, color = [0.12, 0.12, 0.12] }: TextOptions = {},
): string {
  let cursorX = x;
  const commands = [`${color[0]} ${color[1]} ${color[2]} rg`, 'BT'];

  for (const segment of segments) {
    const font = segment.font ?? 'regular';
    commands.push(`/${fontMap[font]} ${size} Tf 1 0 0 1 ${cursorX} ${y} Tm (${escapePdfText(segment.text)}) Tj`);
    cursorX += estimateTextWidth(segment.text, size, font) + size * 0.1;
  }

  commands.push('ET');
  return commands.join('\n');
}

function createRule(y: number): string {
  return `0.75 0.78 0.82 RG\n1 w\n${LEFT_MARGIN} ${y} m ${PAGE_WIDTH - RIGHT_MARGIN} ${y} l S`;
}

function getSkillCategoryTitles(categoryKey: string): string[] {
  const category = skillCategoriesDataMock.find((item) => item.key === categoryKey);
  return category?.skills.map((skill) => skill.title) ?? [];
}

function buildSummary(): string {
  return `Full-stack, full-cycle software engineer with 7+ years of experience building backend-heavy products across FinTech, Healthcare, PLM, E-Commerce, and Insurance. I work from architecture and delivery planning through implementation and release, and I like blending practical engineering with AI tools, automation, and a product-minded approach.`;
}

function buildCoreSkills(): Array<{ label: string; value: string }> {
  const backend = getSkillCategoryTitles('backend').slice(0, 6).join(', ');
  const frontend = getSkillCategoryTitles('frontend').slice(0, 5).join(', ');
  const databases = getSkillCategoryTitles('databases').slice(0, 5).join(', ');
  const cloud = getSkillCategoryTitles('cloud').slice(0, 3).join(', ');

  return [
    { label: 'Backend', value: backend },
    { label: 'Frontend', value: frontend },
    { label: 'Databases', value: databases },
    { label: 'Cloud & DevOps', value: cloud },
  ];
}

function buildExperienceBlocks(): ExperienceBlock[] {
  return experienceDataMock.map((item) => ({
    company: item.company,
    role: item.role,
    startDate: item.startDate,
    endDate: item.endDate,
    description: item.description,
    responsibility: item.responsibilities[0] ?? '',
  }));
}

function buildEducationBlocks(): Array<{
  institution: string;
  degree: string;
  specialization: string;
  graduatedYear: number;
}> {
  return educationDataMock.map((item) => ({
    institution: item.institution,
    degree: item.degree,
    specialization: item.specialization,
    graduatedYear: item.graduatedYear,
  }));
}

function createInfoRow(label: string, value: string, x: number, y: number): string {
  return createRichTextLine(
    [
      { text: `${label}: `, font: 'bold' },
      { text: value },
    ],
    y,
    { x, size: 8.2, color: [0.22, 0.22, 0.22] },
  );
}

function buildContentStream(): Buffer {
  const commands: string[] = [];
  let y = PAGE_HEIGHT - TOP_MARGIN;

  const [firstName, ...lastNameParts] = contactDataMock.name.split(' ');
  const lastName = lastNameParts.join(' ');

  commands.push(createTextLine(`${firstName} ${lastName}`, y, { font: 'bold', size: 22, color: [0.08, 0.18, 0.28] }));
  y -= 22;
  commands.push(createTextLine(contactDataMock.title, y, { size: 11.2, color: [0.24, 0.28, 0.33] }));
  y -= 20;

  commands.push(createTextLine('Overall information', y, { font: 'bold', size: 12.5, color: [0.08, 0.18, 0.28] }));
  y -= 12;
  commands.push(createInfoRow('Title', contactDataMock.title, LEFT_MARGIN, y));
  commands.push(createInfoRow('Location', contactDataMock.location, LEFT_MARGIN + 250, y));
  y -= 9.2;
  commands.push(createInfoRow('Email', contactDataMock.email, LEFT_MARGIN, y));
  commands.push(createInfoRow('Phone', contactDataMock.phone, LEFT_MARGIN + 250, y));
  y -= 9.2;
  commands.push(createInfoRow('Skype', contactDataMock.skype, LEFT_MARGIN, y));
  commands.push(createInfoRow('GitHub', contactDataMock.github.replace(/^https?:\/\//, ''), LEFT_MARGIN + 250, y));
  y -= 9.2;
  commands.push(createInfoRow('LinkedIn', contactDataMock.linkedin.replace(/^https?:\/\//, ''), LEFT_MARGIN, y));
  y -= 7;

  commands.push(createRule(y));
  y -= 20;

  const sections = [
    {
      title: 'Summary',
      lines: [buildSummary()],
    },
    {
      title: 'Skills',
      lines: buildCoreSkills(),
    },
    {
      title: 'Experience',
      lines: buildExperienceBlocks(),
    },
    {
      title: 'Education',
      lines: buildEducationBlocks(),
    },
  ];

  for (const section of sections) {
    commands.push(createTextLine(section.title, y, { font: 'bold', size: 12.5, color: [0.08, 0.18, 0.28] }));
    y -= 13;

    if (section.title === 'Summary') {
      for (const line of section.lines as string[]) {
        const wrapped = wrapText(line, 98);
        for (const wrappedLine of wrapped) {
          commands.push(createTextLine(wrappedLine, y, { size: 8.8, color: [0.14, 0.14, 0.14] }));
          y -= 8.4;
        }
      }
    } else if (section.title === 'Skills') {
      for (const entry of section.lines as Array<{ label: string; value: string }>) {
        commands.push(
          createRichTextLine(
            [
              { text: `${entry.label}: `, font: 'bold' },
              { text: entry.value },
            ],
            y,
            { size: 8.2, color: [0.14, 0.14, 0.14] },
          ),
        );
        y -= 8.6;
      }
    } else if (section.title === 'Experience') {
      for (const block of section.lines as ExperienceBlock[]) {
        commands.push(
          createRichTextLine(
            [
              { text: 'Company: ', font: 'bold' },
              { text: block.company },
              { text: ' Role: ', font: 'bold' },
              { text: block.role },
            ],
            y,
            { size: 8.2, color: [0.14, 0.14, 0.14] },
          ),
        );
        y -= 8.4;
        commands.push(
          createRichTextLine(
            [
              { text: 'Dates: ', font: 'bold' },
              { text: `${block.startDate} - ${block.endDate}` },
            ],
            y,
            { size: 7.9, color: [0.14, 0.14, 0.14] },
          ),
        );
        y -= 7.6;
        const descriptionLines = wrapText(block.description, 95);
        for (const line of descriptionLines) {
          commands.push(createTextLine(line, y, { size: 7.9, color: [0.14, 0.14, 0.14] }));
          y -= 7.6;
        }
        if (block.responsibility) {
          const responsibilityLines = wrapText(block.responsibility, 95);
          for (const line of responsibilityLines) {
            commands.push(createTextLine(line, y, { size: 7.8, color: [0.14, 0.14, 0.14] }));
            y -= 7.4;
          }
        }
        y -= 4;
      }
    } else if (section.title === 'Education') {
      for (const entry of section.lines as Array<{ institution: string; degree: string; specialization: string; graduatedYear: number }>) {
        commands.push(
          createRichTextLine(
            [
              { text: 'Institution: ', font: 'bold' },
              { text: entry.institution },
            ],
            y,
            { size: 7.8, color: [0.14, 0.14, 0.14] },
          ),
        );
        y -= 7.8;
        commands.push(
          createRichTextLine(
            [
              { text: 'Degree: ', font: 'bold' },
              { text: entry.degree },
              { text: ' Spec: ', font: 'bold' },
              { text: entry.specialization },
              { text: ' Year: ', font: 'bold' },
              { text: String(entry.graduatedYear) },
            ],
            y,
            { size: 7.6, color: [0.14, 0.14, 0.14] },
          ),
        );
        y -= 8.4;
      }
    } else {
      for (const line of section.lines as string[]) {
        const wrapped = wrapText(line, 98);
        for (const wrappedLine of wrapped) {
          commands.push(createTextLine(wrappedLine, y, { size: 8.3, color: [0.14, 0.14, 0.14] }));
          y -= 8.0;
        }
      }
    }

    y -= section.title === 'Experience' ? 7 : 5;
    if (y < BOTTOM_MARGIN + 40) {
      break;
    }
  }

  return Buffer.from(commands.join('\n'), 'utf8');
}

export function createCvPdf(): Buffer {
  const contentStream = buildContentStream();

  const objects: string[] = [];
  const addObject = (body: string) => {
    objects.push(body);
    return objects.length;
  };

  const fontRegularId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  const fontBoldId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');
  const contentId = addObject(`<< /Length ${contentStream.length} >>\nstream\n${contentStream.toString('utf8')}\nendstream`);
  const pageId = addObject(`<< /Type /Page /Parent 5 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`);
  const pagesId = addObject(`<< /Type /Pages /Kids [${pageId} 0 R] /Count 1 >>`);
  const catalogId = addObject(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

  const objectBuffers = objects.map((object, index) =>
    Buffer.from(`${index + 1} 0 obj\n${object}\nendobj\n`, 'utf8'),
  );

  const header = Buffer.from('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n', 'binary');

  const offsets: number[] = [];
  let currentOffset = header.length;
  for (const objectBuffer of objectBuffers) {
    offsets.push(currentOffset);
    currentOffset += objectBuffer.length;
  }

  const body = Buffer.concat(objectBuffers);
  const xrefOffset = header.length + body.length;
  const xrefEntries = ['0000000000 65535 f '];
  for (const offset of offsets) {
    xrefEntries.push(`${offset.toString().padStart(10, '0')} 00000 n `);
  }

  const trailer = [
    'xref',
    `0 ${objects.length + 1}`,
    xrefEntries.join('\n'),
    'trailer',
    `<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>`,
    'startxref',
    `${xrefOffset}`,
    '%%EOF',
  ].join('\n');

  return Buffer.concat([header, body, Buffer.from(trailer, 'utf8')]);
}
