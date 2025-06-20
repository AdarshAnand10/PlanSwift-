
// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview Translates a business plan into a specified language.
 *
 * - translateBusinessPlan - A function that translates a business plan.
 * - TranslateBusinessPlanInput - The input type for the translateBusinessPlan function.
 * - TranslateBusinessPlanOutput - The return type for the translateBusinessPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateBusinessPlanInputSchema = z.object({
  businessPlan: z.string().describe('The business plan content to translate.'),
  language: z.string().describe('The target language for the translation.'),
});
export type TranslateBusinessPlanInput = z.infer<typeof TranslateBusinessPlanInputSchema>;

const TranslateBusinessPlanOutputSchema = z.object({
  translatedPlan: z
    .string()
    .describe('The translated business plan in the specified language.'),
});
export type TranslateBusinessPlanOutput = z.infer<typeof TranslateBusinessPlanOutputSchema>;

export async function translateBusinessPlan(
  input: TranslateBusinessPlanInput
): Promise<TranslateBusinessPlanOutput> {
  return translateBusinessPlanFlow(input);
}

const translateBusinessPlanPrompt = ai.definePrompt({
  name: 'translateBusinessPlanPrompt',
  input: {schema: TranslateBusinessPlanInputSchema},
  output: {schema: TranslateBusinessPlanOutputSchema},
  prompt: `Translate the following business plan into {{{language}}}.\n\nBusiness Plan:\n{{{businessPlan}}}`,
});

const translateBusinessPlanFlow = ai.defineFlow(
  {
    name: 'translateBusinessPlanFlow',
    inputSchema: TranslateBusinessPlanInputSchema,
    outputSchema: TranslateBusinessPlanOutputSchema,
  },
  async input => {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error(
        'The GOOGLE_API_KEY environment variable is not set on the server. AI features are disabled.'
      );
    }
    const {output} = await translateBusinessPlanPrompt(input);
    if (!output?.translatedPlan) {
      throw new Error('The AI model did not return a valid translation. Please try again.');
    }
    return output;
  }
);
