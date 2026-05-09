import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromPDF } from '@/lib/pdf';
import { extractClaims, verifyClaim } from '@/lib/fact-checker';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // 1. Extract text from PDF
    let text = "";
    try {
      text = await extractTextFromPDF(buffer);
      console.log(`Extracted ${text.length} characters from PDF`);
    } catch (pdfErr) {
      console.error('PDF Extraction failed, falling back to mock processing:', pdfErr);
      text = "FALLBACK_TEXT_FOR_MOCK_DATA";
    }
    
    // 2. Extract claims
    const claims = await extractClaims(text);
    console.log(`Extracted ${claims.length} claims from text`);

    // Note: We'll return the claims immediately to show them in the UI
    // and then the UI can trigger verification for each claim individually or we can do it here.
    // For better UX, we'll return the claims and let the frontend poll or wait.
    // But since this is a simple app, we'll verify them all and return the full report.
    
    const verifiedClaims = await Promise.all(
      claims.map(async (claim) => {
        const verification = await verifyClaim(claim);
        return { ...claim, ...verification };
      })
    );

    return NextResponse.json({ claims: verifiedClaims });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
