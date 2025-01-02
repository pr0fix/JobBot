import dedent from "dedent";
const createPrompt = (
  jobDescription: string,
  applicationText: string
) => dedent`
  Rewrite this application to match the job requirements.

  Job Description: ${jobDescription}

  Original Application: ${applicationText}

  Instructions:
  1. Use only factual information from the original application
  2. Match skills and experiences directly to job requirements
  3. Prioritize most relevant experience first
  4. Remove any details not relevant to this specific role
  5. Keep length between 250-400 words

  Tone Guidelines:
  - Professional but approachable
  - Action-oriented and specific
  - Emphasize achievements over responsibilities
  - Use active voice and strong verbs

  Format:
  - No formatting or markdown
  - Focus on concrete examples and metrics
  - Use short, clear sentences

   Output the revised application focusing only on the most relevant qualifications for this specific role.
`;

export default createPrompt;
