'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a starting timetable from a text prompt.
 *
 * It exports:
 * - `generateTimetable`: An async function that takes a prompt and returns a timetable.
 * - `TimetableInput`: The input type for the generateTimetable function.
 * - `TimetableOutput`: The output type for the generateTimetable function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TimetableInputSchema = z.object({
  prompt: z.string().describe('A text prompt describing the desired timetable.'),
});
export type TimetableInput = z.infer<typeof TimetableInputSchema>;

const TimetableOutputSchema = z.object({
  timetable: z.string().describe('A timetable generated from the prompt.'),
});
export type TimetableOutput = z.infer<typeof TimetableOutputSchema>;

export async function generateTimetable(input: TimetableInput): Promise<TimetableOutput> {
  return generateTimetableFlow(input);
}

const timetablePrompt = ai.definePrompt({
  name: 'timetablePrompt',
  input: {schema: TimetableInputSchema},
  output: {schema: TimetableOutputSchema},
  prompt: `You are a helpful assistant that generates a timetable based on a text prompt. The timetable should be returned as a string.

Prompt: {{{prompt}}}`, 
});

const generateTimetableFlow = ai.defineFlow(
  {
    name: 'generateTimetableFlow',
    inputSchema: TimetableInputSchema,
    outputSchema: TimetableOutputSchema,
  },
  async input => {
    const {output} = await timetablePrompt(input);
    return output!;
  }
);
