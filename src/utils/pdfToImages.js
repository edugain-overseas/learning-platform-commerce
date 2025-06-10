// @ts-ignore
import workerSrc from "pdfjs-dist/legacy/build/pdf.worker.entry";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export async function pdfUrlToImages(url, scale = 2) {
  const pdf = await pdfjsLib.getDocument(url).promise;

  const images = [];
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale });

    // Create a canvas
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: canvas.getContext("2d"),
      viewport,
    }).promise;

    images.push(canvas.toDataURL("image/png")); // base64
  }
  return images;
}
