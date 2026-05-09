const { PdfReader } = require('pdfreader');
const fs = require('fs');

async function testPDF() {
  try {
    // Create a dummy PDF or use an existing one if available
    // For now, let's just see if the library loads
    console.log("Loading PdfReader...");
    const reader = new PdfReader();
    console.log("PdfReader loaded successfully");
  } catch (error) {
    console.error("Failed to load PdfReader:", error);
  }
}

testPDF();
