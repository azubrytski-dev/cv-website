/** @jest-environment node */
import path from 'node:path';
import { createCvPdf } from './cv-pdf';

it('generates a two-page PDF with embedded fonts and contact links', async () => {
  const pdf = await createCvPdf({ fontDirectory: path.join(process.cwd(), 'public', 'fonts') });
  const source = pdf.toString('latin1');
  expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
  expect(pdf.length).toBeGreaterThan(10000);
  expect(source.match(/\/Type\s*\/Page(?=\s|\/|>)/g)).toHaveLength(2);
  expect(source).toContain('/FontFile2');
  expect(source.match(/\/Subtype\s*\/Link/g)).toHaveLength(3);
});
