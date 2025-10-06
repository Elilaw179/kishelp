'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarDays, Wand2, Loader } from 'lucide-react';
import { generateTimetable } from '@/ai/flows/get-started-timetable';
import { useToast } from '@/hooks/use-toast';

export default function TimetableGenerator() {
  const [prompt, setPrompt] = useState('Example: I have Math on Monday at 9am, Science on Tuesday at 10am, and Coding club on Friday afternoon.');
  const [timetable, setTimetable] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (prompt.trim() === '' || isLoading) return;

    setIsLoading(true);
    setTimetable('');
    try {
      const response = await generateTimetable({ prompt });
      setTimetable(response.timetable);
    } catch (error) {
      console.error('Error generating timetable:', error);
      toast({
        variant: 'destructive',
        title: 'Timetable Generation Failed',
        description: 'Could not generate the timetable. Please try a different prompt.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="h-6 w-6" />
          <span>Personalized Timetable</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Describe your week, and let AI build your timetable. Include classes, study sessions, and clubs.
          </p>
          <Textarea
            placeholder="Enter your weekly schedule description..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            rows={4}
            className="focus-visible:ring-accent"
          />
        </div>
        <Button onClick={handleGenerate} disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
          Generate Timetable
        </Button>
        {(isLoading || timetable) && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Generated Timetable:</h4>
            <ScrollArea className="h-48 w-full rounded-md border p-4 bg-background/50">
              {isLoading && !timetable && <p className="text-muted-foreground">Generating your timetable...</p>}
              <pre className="text-sm whitespace-pre-wrap font-body">{timetable}</pre>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
