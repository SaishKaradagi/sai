import { Button } from "../ui/button";
import { PDFDocument, rgb } from "pdf-lib";
import { toPng } from "html-to-image";

export default function DownloadButton({ resumeRef }) {
  const downloadPDF = async () => {
    if (!resumeRef.current) return;

    try {
      // Convert the resume element to a PNG image
      const imgData = await toPng(resumeRef.current, { quality: 1.0 });

      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points

      // Embed the PNG image into the PDF
      const pngImage = await pdfDoc.embedPng(imgData);

      // Get image dimensions
      const imgWidth = pngImage.width;
      const imgHeight = pngImage.height;

      // Calculate scaling to fit the image on the page while maintaining aspect ratio
      const ratio = Math.min(
        page.getWidth() / imgWidth,
        page.getHeight() / imgHeight
      );
      const scaledWidth = imgWidth * ratio;
      const scaledHeight = imgHeight * ratio;

      // Center the image on the page
      const x = (page.getWidth() - scaledWidth) / 2;
      const y = (page.getHeight() - scaledHeight) / 2;

      page.drawImage(pngImage, {
        x,
        y,
        width: scaledWidth,
        height: scaledHeight,
      });

      // Serialize the PDF to bytes and create a download link
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "resume.pdf";
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating your PDF. Please try again.");
    }
  };

  return (
    <Button onClick={downloadPDF} className="flex items-center gap-2 hover:cursor-pointer bg-blue-600 hover:bg-blue-700">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
      Download Resume
    </Button>
  );
}
