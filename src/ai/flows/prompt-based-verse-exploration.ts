// src/ai/flows/prompt-based-verse-exploration.ts
'use server';

/**
 * @fileOverview A Quranic verse exploration AI agent that finds relevant verses based on a user prompt.
 *
 * - promptBasedVerseExploration - A function that handles the verse exploration process.
 * - PromptBasedVerseExplorationInput - The input type for the promptBasedVerseExploration function.
 * - PromptBasedVerseExplorationOutput - The return type for the promptBasedVerseExploration function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const PromptBasedVerseExplorationInputSchema = z.object({
  prompt: z.string().describe('The user prompt or question related to a specific topic.'),
});
export type PromptBasedVerseExplorationInput = z.infer<typeof PromptBasedVerseExplorationInputSchema>;

const PromptBasedVerseExplorationOutputSchema = z.object({
  verses: z.array(
    z.object({
      verse: z.string().describe('The Quranic verse.'),
      translation: z.string().describe('The translated verse.'),
      commentary: z.string().describe('The commentary on the verse.'),
      hadiths: z.array(z.string()).describe('Relevant Hadiths for the verse.'),
    })
  ).describe('The relevant Quranic verses and their translations with context.'),
});
export type PromptBasedVerseExplorationOutput = z.infer<typeof PromptBasedVerseExplorationOutputSchema>;

export async function promptBasedVerseExploration(input: PromptBasedVerseExplorationInput): Promise<PromptBasedVerseExplorationOutput> {
  return promptBasedVerseExplorationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'promptBasedVerseExplorationPrompt',
  input: {
    schema: z.object({
      prompt: z.string().describe('The user prompt or question.'),
    }),
  },
  output: {
    schema: z.object({
      verses: z.array(
        z.object({
          verse: z.string().describe('The Quranic verse.'),
          translation: z.string().describe('The translated verse.'),
          commentary: z.string().describe('The commentary on the verse.'),
          hadiths: z.array(z.string()).describe('Relevant Hadiths for the verse.'),
        })
      ).describe('The relevant Quranic verses and their translations with context.'),
    }),
  },
  prompt: `You are an AI assistant specialized in exploring the Quran based on user prompts.
  Given the following user prompt, identify relevant Quranic verses and their translations within the context of commentaries and Hadiths.
  Return an array of verses, each including the verse itself, its translation, relevant commentary, and relevant Hadiths.

  Prompt: {{{prompt}}}
  `,
});

const promptBasedVerseExplorationFlow = ai.defineFlow<
  typeof PromptBasedVerseExplorationInputSchema,
  typeof PromptBasedVerseExplorationOutputSchema
>({
  name: 'promptBasedVerseExplorationFlow',
  inputSchema: PromptBasedVerseExplorationInputSchema,
  outputSchema: PromptBasedVerseExplorationOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
