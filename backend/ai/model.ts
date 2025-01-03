import Ollama from "ollama";
import { extractTextFromBuffer } from "../utils/extractTextFromBuffer";
import { Application } from "../utils/types";
import { createPrompt, systemPrompt } from "./prompts";
import { phi3 } from "../utils/models";

const analyzeApplication = async (
  jobDescription: string,
  application: Application
) => {
  const applicationText = await extractTextFromBuffer(application);

  const prompt = createPrompt(jobDescription, applicationText);

  const response = await Ollama.generate({
    model: phi3,
    prompt: prompt,
    system: systemPrompt,
    options: {
      temperature: 0.7
    }
  });

  return response.response;
};

export default analyzeApplication;
