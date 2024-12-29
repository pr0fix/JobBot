import dedent from "dedent";
const createPrompt = (
  jobDescription: string,
  applicationText: string
) => dedent`
  Rewrite this application to match the job requirements.

  Job Description: ${jobDescription}

  Original Application: ${applicationText}

  Instructions:
  1. Use only the information from the original application. Do not add or invent any new details or skills.
  2. Write in a conversational but professional tone. Avoid jargon, complicated words, and overly formal phrases. For example, use "use" instead of "utilize" and "help" instead of "facilitate".
  3. Keep the overall structure (paragraphs/sections) the same as in the original.
  4. Do not add any technology or experience that is not already in the original.
  5. If important requirements are missing in the original, do not fabricate them.

  Format:
  - Return only the revised application text.
  - Preserve the original structure with no extra formatting changes.

  Output only revised text using actual details from the original application.
`;

export default createPrompt;
