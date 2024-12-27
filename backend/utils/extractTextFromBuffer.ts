import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import { Application } from "./types";

export const extractTextFromBuffer = async (
  application: Application
): Promise<string> => {
  let applicationText = "";

  if (application.mimetype === "application/pdf") {
    const pdfData = await pdfParse(application.buffer);
    applicationText = pdfData.text;
  } else if (
    application.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const docData = await mammoth.extractRawText({
      buffer: application.buffer,
    });
    applicationText = docData.value;
  } else if (application.mimetype === "text/plain") {
    applicationText = application.buffer.toString("utf8");
  } else {
    throw new Error("Unsupported file type");
  }
  
  return applicationText;
};
