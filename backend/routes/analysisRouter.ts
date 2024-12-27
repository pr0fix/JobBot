import express, { Request, Response } from "express";
import { fileUploadHandler, validateRequest } from "../utils/middleware";
import analyzeApplication from "../ai/model";

const router = express.Router();

router.post(
  "/analyze",
  fileUploadHandler(),
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const { jobDescription } = req.body;
      const application = req.file!;

      const tailoredApplication = await analyzeApplication(
        jobDescription,
        application
      );

      res.json({ tailoredApplication });
    } catch (error) {
      console.error("Error processing the application:", error);
      res
        .status(500)
        .send("An error occurred while processing the application.");
    }
  }
);

export default router;
