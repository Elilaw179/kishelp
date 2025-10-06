'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarDays, Wand2, Loader, Trash2 } from 'lucide-react';
import { generateTimetable, TimetableOutput } from '@/ai/flows/get-started-timetable';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const isBrowser = typeof window !== 'undefined';

export default function TimetableGenerator() {
  const [prompt, setPrompt] = useState('Example: I have Math on Monday at 9am, Science on Tuesday at 10am, and Coding club on Friday afternoon.');
  const [timetable, setTimetable] = useState<TimetableOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isBrowser) {
      try {
        const storedTimetable = localStorage.getItem('timetable');
        if (storedTimetable) {
          setTimetable(JSON.parse(storedTimetable));
        }
      } catch (error) {
        console.error('Error parsing timetable from localStorage', error);
      }
    }
  }, []);

  useEffect(() => {
    if (isBrowser) {
      if (timetable || localStorage.getItem('timetable')) {
        localStorage.setItem('timetable', JSON.stringify(timetable));
      }
    }
  }, [timetable]);


  const handleGenerate = async () => {
    if (prompt.trim() === '' || isLoading) return;

    setIsLoading(true);
    setTimetable(null);
    try {
      const response = await generateTimetable({ prompt });
      setTimetable(response);
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

  const handleClearTimetable = () => {
    setTimetable(null);
    localStorage.removeItem('timetable');
  }

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
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold">Generated Timetable:</h4>
               {timetable && !isLoading && (
                <Button variant="ghost" size="icon" onClick={handleClearTimetable} aria-label="Clear timetable">
                  <Trash2 className="h-4 w-4 text-destructive/80" />
                </Button>
              )}
            </div>
            <ScrollArea className="h-48 w-full rounded-md border bg-background/50">
              {isLoading && !timetable && <p className="text-muted-foreground p-4">Generating your timetable...</p>}
              {timetable && (
                 <Table>
                  <TableHeader>
                    <TableRow>
                      {timetable.headers.map((header, index) => (
                        <TableHead key={index} className="font-bold">{header}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timetable.rows.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <TableCell key={cellIndex}>{cell}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
