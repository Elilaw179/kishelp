'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, Loader, User, Bot, Trash2 } from 'lucide-react';
import { askSubjectQuestion } from '@/ai/flows/ai-subject-guidance';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'English', 'Coding'];
const isBrowser = typeof window !== 'undefined';

export default function AiChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [subject, setSubject] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isBrowser) {
      try {
        const storedMessages = localStorage.getItem('chatHistory');
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        }
      } catch (error) {
        console.error('Error parsing chat history from localStorage', error);
      }
    }
  }, []);

  useEffect(() => {
    if (isBrowser) {
       // Avoid saving the initial empty array state before messages are loaded.
      if (messages.length > 0 || localStorage.getItem('chatHistory')) {
        localStorage.setItem('chatHistory', JSON.stringify(messages));
      }
    }
  }, [messages]);


  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleClearChat = () => {
    setMessages([]);
    localStorage.removeItem('chatHistory');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || !subject || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askSubjectQuestion({ subject, question: input });
      const assistantMessage: Message = { role: 'assistant', content: response.answer };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error with AI chat:', error);
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: 'There was a problem with the AI chatbot. Please try again later.',
      });
      // remove the user message if the API call fails
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-6 w-6" />
          <span>AI Subject Guidance</span>
        </CardTitle>
        {messages.length > 0 && (
          <Button variant="ghost" size="icon" onClick={handleClearChat} aria-label="Clear chat history">
            <Trash2 className="h-4 w-4 text-destructive/80" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-[400px] w-full pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-3 rounded-lg p-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <div className="p-2 rounded-full bg-primary/20 text-primary">
                    <Bot className="h-5 w-5" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-xs md:max-w-md rounded-lg px-4 py-2 text-sm',
                    message.role === 'user'
                      ? 'bg-primary/90 text-primary-foreground'
                      : 'bg-card-foreground/5 dark:bg-card-foreground/10'
                  )}
                >
                  {message.content}
                </div>
                 {message.role === 'user' && (
                  <div className="p-2 rounded-full bg-accent/20 text-accent">
                    <User className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 p-3">
                 <div className="p-2 rounded-full bg-primary/20 text-primary">
                    <Bot className="h-5 w-5" />
                  </div>
                <div className="bg-card-foreground/5 dark:bg-card-foreground/10 rounded-lg px-4 py-3 flex items-center">
                  <Loader className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            {messages.length === 0 && !isLoading && (
                 <div className="text-center text-muted-foreground py-8">
                    <p>Select a subject and ask a question to get started!</p>
                 </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger className="w-[180px] focus:ring-accent">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map(s => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Ask a question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={!subject || isLoading}
            className="focus-visible:ring-accent"
          />
          <Button type="submit" disabled={!subject || isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
