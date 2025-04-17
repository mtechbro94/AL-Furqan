'use server';
/**
 * @fileOverview Translates Quranic verses with context from commentaries and Hadiths.
 *
 * - contextualTranslation - A function that translates a Quranic verse with context.
 * - ContextualTranslationInput - The input type for the contextualTranslation function.
 * - ContextualTranslationOutput - The return type for the contextualTranslation function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ContextualTranslationInputSchema = z.object({
  verse: z.string().describe('The Quranic verse to translate.'),
  commentary: z.string().describe('The selected commentary to provide context.'),
  hadith: z.string().describe('Relevant Hadiths for deeper understanding.'),
});
export type ContextualTranslationInput = z.infer<typeof ContextualTranslationInputSchema>;

const ContextualTranslationOutputSchema = z.object({
  translation: z.string().describe('The translated verse with contextual understanding.'),
});
export type ContextualTranslationOutput = z.infer<typeof ContextualTranslationOutputSchema>;

export async function contextualTranslation(input: ContextualTranslationInput): Promise<ContextualTranslationOutput> {
  return contextualTranslationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contextualTranslationPrompt',
  input: {
    schema: z.object({
      verse: z.string().describe('The Quranic verse to translate.'),
      commentary: z.string().describe('The selected commentary to provide context.'),
      hadith: z.string().describe('Relevant Hadiths for deeper understanding.'),
    }),
  },
  output: {
    schema: z.object({
      translation: z.string().describe('The translated verse with contextual understanding.'),
    }),
  },
  prompt: `You are an expert in Quranic studies and Islamic jurisprudence. Translate the provided Quranic verse considering the context from the given commentary and relevant Hadiths.

Verse: {{{verse}}}
Commentary: {{{commentary}}}
Hadith: {{{hadith}}}

Translation:`,
});

const contextualTranslationFlow = ai.defineFlow<
  typeof ContextualTranslationInputSchema,
  typeof ContextualTranslationOutputSchema
>({
  name: 'contextualTranslationFlow',
  inputSchema: ContextualTranslationInputSchema,
  outputSchema: ContextualTranslationOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
