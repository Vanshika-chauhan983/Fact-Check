const { PdfReader } = require('pdfreader');

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    let text = "";
    new PdfReader().parseBuffer(buffer, (err: any, item: any) => {
      if (err) {
        console.error('PDF READER ERROR:', err);
        reject(new Error(`Failed to extract text from PDF: ${err.message || 'Unknown error'}`));
      } else if (!item) {
        // End of file
        resolve(text);
      } else if (item.text) {
        text += item.text + " ";
      }
    });
  });
}
