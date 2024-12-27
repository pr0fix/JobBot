import { NextFunction, Request, Response } from "express";
import multer from "multer";

export const fileUploadHandler = () => {
  return multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
  }).single("file");
};

const VALID_MIME_TYPES = [
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { jobDescription } = req.body;
  const application = req.file;

  if (!jobDescription || !application) {
    res.status(400).json({
      error: "Job description and application file are required.",
    });
    return;
  }

  if (!VALID_MIME_TYPES.includes(application.mimetype)) {
    res.status(400).json({
      error: "Unsupported file type. Only .pdf, .docx, .txt are supported.",
    });
    return;
  }

  next();
};
