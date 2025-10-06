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
  headers: z.array(z.string()).describe('The headers for the timetable table (e.g., ["Time", "Monday", "Tuesday"]).'),
  rows: z.array(z.array(z.string())).describe('The rows of the timetable, where each inner array represents a row of cells.'),
});
export type TimetableOutput = z.infer<typeof TimetableOutputSchema>;

export async function generateTimetable(input: TimetableInput): Promise<TimetableOutput> {
  return generateTimetableFlow(input);
}

const timetablePrompt = ai.definePrompt({
  name: 'timetablePrompt',
  input: {schema: TimetableInputSchema},
  output: {schema: TimetableOutputSchema},
  prompt: `You are a helpful assistant that generates a timetable based on a text prompt. Analyze the user's prompt and structure the response as a JSON object with 'headers' and 'rows' for a table. For example, if the prompt is "Math on Monday at 9am, Science on Tuesday at 10am", the output should have headers like ["Time", "Monday", "Tuesday"] and rows representing the schedule. Be logical with the time slots.

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
