'use server';

/**
 * @fileOverview An AI agent for modifying a specific section of a business plan using natural language commands.
 *
 * - alterPlanSection - A function that handles the process of modifying a plan section.
 * - AlterPlanSectionInput - The input type for the alterPlanSection function.
 * - AlterPlanSectionOutput - The return type for the alterPlanSection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AlterPlanSectionInputSchema = z.object({
  planSection: z
    .string()
    .describe('The current content of the business plan section to modify.'),
  userCommand: z
    .string()
    .describe(
      'A natural language command from the user specifying how to modify the plan section.'
    ),
});
export type AlterPlanSectionInput = z.infer<typeof AlterPlanSectionInputSchema>;

const AlterPlanSectionOutputSchema = z.object({
  modifiedPlanSection: z
    .string()
    .describe('The modified content of the business plan section.'),
});
export type AlterPlanSectionOutput = z.infer<typeof AlterPlanSectionOutputSchema>;

export async function alterPlanSection(input: AlterPlanSectionInput): Promise<AlterPlanSectionOutput> {
  return alterPlanSectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'alterPlanSectionPrompt',
  input: {schema: AlterPlanSectionInputSchema},
  output: {schema: AlterPlanSectionOutputSchema},
  prompt: `You are an expert business plan editor. The user will provide a section of their business plan and a command to modify it. Your task is to modify the plan section according to the user's command and return the modified plan section.

Plan Section:
{{planSection}}

User Command:
{{userCommand}}`,
});

const alterPlanSectionFlow = ai.defineFlow(
  {
    name: 'alterPlanSectionFlow',
    inputSchema: AlterPlanSectionInputSchema,
    outputSchema: AlterPlanSectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
