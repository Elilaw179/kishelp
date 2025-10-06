'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CalendarDays, Wand2, Loader, Trash2, Printer, Pencil } from 'lucide-react';
import { generateTimetable, TimetableOutput } from '@/ai/flows/get-started-timetable';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface EnrichedTimetableOutput extends TimetableOutput {
  id: number;
  prompt: string;
}

const isBrowser = typeof window !== 'undefined';

export default function TimetableGenerator() {
  const [prompt, setPrompt] = useState('Example: I have Math on Monday at 9am, Science on Tuesday at 10am, and Coding club on Friday afternoon.');
  const [timetables, setTimetables] = useState<EnrichedTimetableOutput[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingTimetableId, setEditingTimetableId] = useState<number | null>(null);
  const { toast } = useToast();
  const timetableRefs = useRef<{[key: number]: HTMLDivElement | null}>({});

  useEffect(() => {
    if (isBrowser) {
      try {
        const storedTimetables = localStorage.getItem('timetables');
        if (storedTimetables) {
          setTimetables(JSON.parse(storedTimetables));
        }
      } catch (error) {
        console.error('Error parsing timetables from localStorage', error);
      }
    }
  }, []);

  useEffect(() => {
    if (isBrowser) {
      if (timetables.length > 0 || localStorage.getItem('timetables')) {
        localStorage.setItem('timetables', JSON.stringify(timetables));
      }
    }
  }, [timetables]);


  const handleGenerate = async () => {
    if (prompt.trim() === '' || isLoading) return;

    setIsLoading(true);
    try {
      const response = await generateTimetable({ prompt });

      if (editingTimetableId) {
        // Update existing timetable
        const updatedTimetables = timetables.map(t =>
          t.id === editingTimetableId ? { ...t, ...response, prompt } : t
        );
        setTimetables(updatedTimetables);
        setEditingTimetableId(null);
        toast({
          title: 'Timetable Updated',
          description: 'Your timetable has been successfully updated.',
        });
      } else {
        // Add new timetable
        const newTimetable: EnrichedTimetableOutput = {
          ...response,
          id: Date.now(),
          prompt: prompt,
        };
        setTimetables(prev => [newTimetable, ...prev]);
      }
      setPrompt('Example: I have Math on Monday at 9am, Science on Tuesday at 10am, and Coding club on Friday afternoon.');

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

  const handleDeleteTimetable = (id: number) => {
    const updatedTimetables = timetables.filter(t => t.id !== id);
    setTimetables(updatedTimetables);
    if(updatedTimetables.length === 0) {
      localStorage.removeItem('timetables');
    }
  }

  const handleEditTimetable = (id: number) => {
    const timetableToEdit = timetables.find(t => t.id === id);
    if (timetableToEdit) {
      setPrompt(timetableToEdit.prompt);
      setEditingTimetableId(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrint = (id: number) => {
    const timetableElement = timetableRefs.current[id];
    if (!timetableElement) return;

    const onAfterPrint = () => {
      document.body.classList.remove('printing-timetable');
      timetableElement.classList.remove('printable-content');
      window.removeEventListener('afterprint', onAfterPrint);
    };

    window.addEventListener('afterprint', onAfterPrint);
    document.body.classList.add('printing-timetable');
    timetableElement.classList.add('printable-content');
    window.print();
  };

  const getMobileFriendlyData = (timetable: TimetableOutput) => {
    const { headers, rows } = timetable;
    if (!headers || headers.length <= 1) return [];

    const timeHeaderIndex = 0; // Assuming 'Time' is always first
    const dayHeaders = headers.slice(1);

    const mobileData = dayHeaders.map((day, dayIndex) => {
        const schedule = rows.map(row => ({
            time: row[timeHeaderIndex],
            activity: row[dayIndex + 1]
        })).filter(item => item.activity && item.activity.trim() !== '');

        return { day, schedule };
    }).filter(dayData => dayData.schedule.length > 0);

    return mobileData;
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
            {editingTimetableId ? 'Editing your timetable. Make your changes below.' : 'Describe your week, and let AI build your timetable. Include classes, study sessions, and clubs.'}
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
          {editingTimetableId ? 'Update Timetable' : 'Generate Timetable'}
        </Button>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Generated Timetables:</h4>
          <ScrollArea className="h-48 w-full">
            <div className="space-y-4 pr-4">
              {isLoading && !editingTimetableId && <p className="text-muted-foreground p-4">Generating your new timetable...</p>}
              {timetables.length === 0 && !isLoading && <p className="text-muted-foreground text-center py-4">No timetables yet. Generate one above!</p>}
              {timetables.map((timetable) => (
                <Card key={timetable.id} ref={el => (timetableRefs.current[timetable.id] = el)} className="bg-background/50">
                  <CardHeader className="flex flex-row items-start justify-between pb-2">
                    <div>
                      <CardTitle className="text-base">Timetable</CardTitle>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px] md:max-w-xs">Based on: "{timetable.prompt}"</p>
                    </div>
                    <div className="flex items-center no-print">
                       <Button variant="ghost" size="icon" onClick={() => handleEditTimetable(timetable.id)} aria-label="Edit timetable">
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handlePrint(timetable.id)} aria-label="Print timetable">
                        <Printer className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteTimetable(timetable.id)} aria-label="Delete timetable">
                        <Trash2 className="h-4 w-4 text-destructive/80" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isLoading && editingTimetableId === timetable.id ? (
                      <div className="flex items-center justify-center p-8">
                        <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
                        <p className="ml-2">Updating...</p>
                      </div>
                    ) : (
                      <div>
                        {/* Desktop Table View */}
                        <div className="hidden md:block w-full overflow-x-auto">
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
                        </div>
                        {/* Mobile List View */}
                        <div className="block md:hidden space-y-4">
                            {getMobileFriendlyData(timetable).map(({day, schedule}) => (
                                <div key={day}>
                                    <h4 className='font-semibold text-sm mb-2'>{day}</h4>
                                    <div className='space-y-2 pl-2 border-l-2 border-primary/50'>
                                        {schedule.map(({time, activity}) => (
                                            <div key={time} className='flex justify-between items-center text-sm'>
                                                <span>{activity}</span>
                                                <span className='text-xs text-muted-foreground'>{time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
