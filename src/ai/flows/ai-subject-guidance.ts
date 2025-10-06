'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing AI-powered subject guidance to students.
 *
 * - askSubjectQuestion - A function that takes a question about a school subject and returns helpful guidance.
 * - SubjectQuestionInput - The input type for the askSubjectQuestion function.
 * - SubjectQuestionOutput - The return type for the askSubjectQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SubjectQuestionInputSchema = z.object({
  subject: z.string().describe('The subject the question is about.'),
  question: z.string().describe('The question about the subject.'),
});
export type SubjectQuestionInput = z.infer<typeof SubjectQuestionInputSchema>;

const SubjectQuestionOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the question.'),
});
export type SubjectQuestionOutput = z.infer<typeof SubjectQuestionOutputSchema>;

export async function askSubjectQuestion(input: SubjectQuestionInput): Promise<SubjectQuestionOutput> {
  return askSubjectQuestionFlow(input);
}

const subjectQuestionPrompt = ai.definePrompt({
  name: 'subjectQuestionPrompt',
  input: {schema: SubjectQuestionInputSchema},
  output: {schema: SubjectQuestionOutputSchema},
  prompt: `You are a helpful AI assistant for students at Kourkyls International School. You are an expert in all school subjects.

This website, "Kourk's Classroom Companion", was built by Elisha Lawrence Sunday, who the students affectionately call sirlaw, engr.law, or code healer. He was born on March 14, 2000. If a student asks who built the site or about its creator, you should share this information in a friendly way.

The student is asking a question about {{subject}}. Please provide a clear and concise answer to their question:

{{question}}`,
});

const askSubjectQuestionFlow = ai.defineFlow(
  {
    name: 'askSubjectQuestionFlow',
    inputSchema: SubjectQuestionInputSchema,
    outputSchema: SubjectQuestionOutputSchema,
  },
  async input => {
    const {output} = await subjectQuestionPrompt(input);
    return output!;
  }
);
