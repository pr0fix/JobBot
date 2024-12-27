import Ollama from "ollama";
import { extractTextFromBuffer } from "../utils/extractTextFromBuffer";
import { Application } from "../utils/types";
import createPrompt from "./prompts";

const analyzeApplication = async (
  jobDescription: string,
  application: Application
) => {
  const applicationText = await extractTextFromBuffer(application);

  const prompt = createPrompt(jobDescription, applicationText);

  const response = await Ollama.generate({
    model: "wizardlm2",
    prompt: prompt,
  });

  return response.response;
};

export default analyzeApplication;
