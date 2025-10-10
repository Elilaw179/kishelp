'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader, Trash2, LogIn, LogOut } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  content: string;
}

const ADMIN_PASSWORD = 'admin123'; // A simple password for demonstration
const isBrowser = typeof window !== 'undefined';


export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isBrowser) {
      const sessionAuth = sessionStorage.getItem('isAdminAuthenticated');
      if (sessionAuth === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);
  
  useEffect(() => {
    if (isAuthenticated) {
      fetchNews();
    } else {
        setIsLoading(false);
    }
  }, [isAuthenticated]);
  
  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      setNews(data.newsItems);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to fetch news',
        description: 'There was a problem fetching the news items.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      if (isBrowser) {
        sessionStorage.setItem('isAdminAuthenticated', 'true');
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Authentication Failed',
        description: 'Incorrect password.',
      });
    }
    setPassword('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if(isBrowser){
        sessionStorage.removeItem('isAdminAuthenticated');
    }
  }

  const handleAddNews = async () => {
    if (newTitle.trim() === '' || newContent.trim() === '') return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, content: newContent }),
      });
      if (!res.ok) throw new Error('Failed to add news');
      const newPost = await res.json();
      setNews(prev => [newPost, ...prev]);
      setNewTitle('');
      setNewContent('');
      toast({ title: 'News posted successfully!' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not post the news.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNews = async (id: number) => {
    try {
      const res = await fetch('/api/news', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Failed to delete news');
      setNews(prev => prev.filter(item => item.id !== id));
      toast({ title: 'News post deleted.' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not delete the news post.',
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-full max-w-sm shadow-2xl">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Button onClick={handleLogin}>
              <LogIn className="mr-2" /> Login
            </Button>
            <p className='text-xs text-center text-muted-foreground'>

              {/* (Hint: the password is `admin123`) */}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
       <div className='flex justify-between items-center mb-6'>
        <h1 className="text-3xl font-bold">Newsfeed Management</h1>
        <Button variant="outline" onClick={handleLogout}>
            <LogOut className='mr-2' /> Logout
        </Button>
       </div>
      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle>Post New Announcement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="News Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            disabled={isSubmitting}
          />
          <Textarea
            placeholder="Full news content..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={4}
            disabled={isSubmitting}
          />
          <Button onClick={handleAddNews} disabled={isSubmitting} className="w-full">
            {isSubmitting ? <Loader className="animate-spin mr-2" /> : null}
            Post News
          </Button>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Current News</h2>
      {isLoading ? (
        <div className="text-center"><Loader className="animate-spin inline-block" /></div>
      ) : (
        <div className="space-y-4">
          {news.map(item => (
            <Card key={item.id} className="flex items-center justify-between p-4 shadow-md">
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.content}</p>
                <p className="text-xs text-muted-foreground mt-2">{item.date}</p>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDeleteNews(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </Card>
          ))}
          {news.length === 0 && <p>No news items to display.</p>}
        </div>
      )}
    </div>
  );
}
