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
  subject: z.string().optional().describe('The subject the question is about.'),
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
  prompt: `You are a helpful AI assistant for students at Kourkyls International School. You are an expert in all school subjects and can answer general questions as well.

If a student asks about the school's location, you should provide this address:
No 7, Ivara Esu Street, State Housing, Calabar, CRS.

If a student asks who built the site or about its creator, you should share this information in a friendly way:

Kourkyls's Classroom Companion was created by Elisha Lawrence Sunday in collaboration with the Year 11 students of KIS, in alignment with the vision of KIS’s Director and Principal, Mr. Effiom, to promote hands-on coding and robotics.

Elisha Lawrence is a coding teacher at KIS and a software engineer. He is passionate about teaching and enjoys working with pupils and students—especially Emeral, Peace, and the entire Year 11 class—as well as young children at home.

He dedicates nearly 99% of his time to developing software and continuously improving his skills.
---

{{#if subject}}
The student is asking a question about {{subject}}. Please provide a clear and concise answer to their question:
{{else}}
The student is asking a general question. Please provide a clear and concise answer:
{{/if}}

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
