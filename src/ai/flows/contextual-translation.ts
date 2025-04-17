'use server';
/**
 * @fileOverview Translates Quranic verses with context from commentaries and provides verse comprehension.
 *
 * - contextualTranslation - A function that translates a Quranic verse with context and provides comprehension.
 * - ContextualTranslationInput - The input type for the contextualTranslation function.
 * - ContextualTranslationOutput - The return type for the contextualTranslation function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ContextualTranslationInputSchema = z.object({
  verseText: z.string().describe('The complete Quranic verse to translate.'),
  commentary: z.string().describe('The selected commentary to provide context.'),
});
export type ContextualTranslationInput = z.infer<typeof ContextualTranslationInputSchema>;

const ContextualTranslationOutputSchema = z.object({
  translation: z.string().describe('The translated verse with contextual understanding.'),
  explanation: z.string().describe('Explanation of the verse\'s exact comprehension based on the commentary.'),
});
export type ContextualTranslationOutput = z.infer<typeof ContextualTranslationOutputSchema>;

export async function contextualTranslation(input: ContextualTranslationInput): Promise<ContextualTranslationOutput> {
  return contextualTranslationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contextualTranslationPrompt',
  input: {
    schema: z.object({
      verseText: z.string().describe('The complete Quranic verse to translate.'),
      commentary: z.string().describe('The selected commentary to provide context.'),
    }),
  },
  output: {
    schema: z.object({
      translation: z.string().describe('The translated verse with contextual understanding.'),
      explanation: z.string().describe('Explanation of the verse\'s exact comprehension based on the commentary.'),
    }),
  },
  prompt: `You are an expert in Quranic studies and Islamic jurisprudence. Translate the provided Quranic verse considering the context from the given commentary. Also, provide a detailed explanation of the verse's exact comprehension based on the commentary.

Verse: {{{verseText}}}
Commentary: {{{commentary}}}

Translation:
Explanation:`,
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
