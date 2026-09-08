/* eslint-env node */
import QRCode from 'qrcode';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { PRODUCTS } from './src/productsData.js';

const dir = path.join(process.cwd(), 'qr cods');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const generatePDF = async (product) => {
  const slug = product.brand;
  const url = `https://neweqrctyp.vercel.app/${slug}`;
  // Sanitize the display name to remove any invalid filename characters
  const safeName = product.displayName.replace(/[<>:"/\\|?*]/g, '_');
  
  try {
    const qrDataUrl = await QRCode.toDataURL(url, { width: 300, margin: 2 });
    const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, "");
    const imgBuffer = Buffer.from(base64Data, 'base64');

    const doc = new PDFDocument({ size: 'A4' });
    const pdfPath = path.join(dir, `${safeName}.pdf`);
    doc.pipe(fs.createWriteStream(pdfPath));

    // Move down a bit before title
    doc.moveDown(4);
    doc.fontSize(30).text(product.displayName, { align: 'center' });
    doc.moveDown(2);
    
    // Add image centered
    const imgWidth = 300;
    const x = (doc.page.width - imgWidth) / 2;
    doc.image(imgBuffer, x, doc.y, { width: imgWidth });
    
    // Also add the url below
    doc.moveDown(12);
    doc.fontSize(12).fillColor('blue').text(url, { align: 'center', link: url });

    doc.end();
    console.log(`Created PDF for ${safeName}`);
  } catch (err) {
    console.error(`Error for ${product.displayName}:`, err);
  }
};

async function main() {
  console.log('Generating QR code PDFs...');
  for (const product of PRODUCTS) {
    await generatePDF(product);
  }
  console.log('Done!');
}

main();