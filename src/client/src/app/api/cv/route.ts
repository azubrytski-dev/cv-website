import { createCvPdf } from '../../../lib/cv-pdf';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const pdf = createCvPdf();

  return new Response(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="andrei-zubrytski-cv.pdf"',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
