import dedent from "dedent";
export const createPrompt = (
  jobDescription: string,
  applicationText: string
) => dedent`
  Analyze the job description and then modify and tailor the application to match the job description requirements.

  Job Description: ${jobDescription}

  Original Application: ${applicationText}

  Instructions:
  1. Use only the information from the original application. Do not add or invent any new details or skills.
  2. Write in a professional tone. Avoid jargon, complicated words, and overly formal phrases.
  3. Keep the overall structure (paragraphs/sections) the same as in the original.
  4. Do not add any technology or experience that is not already in the original.
  5. If important requirements are missing in the original, do not fabricate them.
  6. Do not add any explanations or reasonings for the text

  Format:
  - Return only the revised application text.
  - Preserve the original structure with no extra formatting changes.

  Output only the revised text using actual details from the original application.
`;

export const systemPrompt =
  "You are a professional at analyzing and refining job applications and resumes";
