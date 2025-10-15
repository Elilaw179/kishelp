'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Megaphone, Loader } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  date: string;
  content: string;
}

export default function NewsFeed() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      // Don't set loading to true on refetch
      // setIsLoading(true); 
      try {
        const res = await fetch('/api/news');
        if (res.ok) {
          const data = await res.json();
          setNewsItems(data.newsItems);
        } else {
           setNewsItems([]); 
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
        setNewsItems([]); // Set to empty on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
    
    // Set up polling to refresh news every 30 seconds
    const interval = setInterval(fetchNews, 30000);

    return () => clearInterval(interval);

  }, []);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="h-6 w-6" />
          <span>School Newsfeed</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px] w-full">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-6 pr-4">
              {newsItems.length > 0 ? (
                newsItems.map(item => (
                  <div key={item.id} className="p-3 rounded-lg bg-background/50 animate-in fade-in-0 duration-500">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-semibold text-sm">{item.title}</h4>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <p>No news to display at the moment.</p>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
