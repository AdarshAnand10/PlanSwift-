
'use server';

/**
 * @fileOverview AI-powered business plan generator.
 *
 * - generateBusinessPlan - A function that handles the generation of a business plan.
 * - GenerateBusinessPlanInput - The input type for the generateBusinessPlan function.
 * - GenerateBusinessPlanOutput - The return type for the generateBusinessPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBusinessPlanInputSchema = z.object({
  companyName: z.string().describe('The name of the company.'),
  industry: z.string().describe('The industry the company operates in.'),
  missionStatement: z.string().describe('The mission statement of the company.'),
  valueProposition: z.string().describe('The value proposition of the company.'),
  targetMarket: z.string().describe('The target market for the company.'),
  competitiveLandscape: z.string().describe('The competitive landscape of the company.'),
  financialProjections: z
    .string()
    .describe('The financial projections for the company.'),
  managementTeam: z.string().describe('Information about the management team.'),
  fundingRequest: z.string().describe('Details of the funding request, if any.'),
});
export type GenerateBusinessPlanInput = z.infer<typeof GenerateBusinessPlanInputSchema>;

const GenerateBusinessPlanOutputSchema = z.object({
  businessPlan: z.string().describe('The generated business plan.'),
});
export type GenerateBusinessPlanOutput = z.infer<typeof GenerateBusinessPlanOutputSchema>;

export async function generateBusinessPlan(
  input: GenerateBusinessPlanInput
): Promise<GenerateBusinessPlanOutput> {
  return generateBusinessPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBusinessPlanPrompt',
  input: {schema: GenerateBusinessPlanInputSchema},
  output: {schema: GenerateBusinessPlanOutputSchema},
  prompt: `You are an expert business plan writer. Generate a comprehensive and investor-ready business plan based on the following information:

Company Name: {{{companyName}}}
Industry: {{{industry}}}
Mission Statement: {{{missionStatement}}}
Value Proposition: {{{valueProposition}}}
Target Market: {{{targetMarket}}}
Competitive Landscape: {{{competitiveLandscape}}}
Financial Projections: {{{financialProjections}}}
Management Team: {{{managementTeam}}}
Funding Request: {{{fundingRequest}}}

Ensure the business plan is well-structured, clear, and persuasive. Include sections such as executive summary, company description, market analysis, organization and management, service or product line, marketing and sales strategy, funding request, and financial projections.

Important: Do not use asterisks (*) for formatting, such as for bold text. Use plain text for emphasis if needed or rely on markdown sectioning for structure. The entire output should be suitable for rendering as markdown.`,
});

const generateBusinessPlanFlow = ai.defineFlow(
  {
    name: 'generateBusinessPlanFlow',
    inputSchema: GenerateBusinessPlanInputSchema,
    outputSchema: GenerateBusinessPlanOutputSchema,
  },
  async input => {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error(
        'The GOOGLE_API_KEY environment variable is not set on the server. AI features are disabled.'
      );
    }
    const {output} = await prompt(input);
    if (!output?.businessPlan) {
      throw new Error('The AI model did not return a valid business plan. Please try again.');
    }
    return output;
  }
);
