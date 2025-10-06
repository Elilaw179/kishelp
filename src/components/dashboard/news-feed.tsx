import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Megaphone } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title: 'Annual Sports Day Postponed',
    date: '2 hours ago',
    content: 'The annual sports day scheduled for this Friday has been postponed due to expected heavy rainfall. A new date will be announced soon.',
  },
  {
    id: 2,
    title: 'Science Fair Submissions Due Next Week',
    date: '1 day ago',
    content: 'All students participating in the science fair must submit their project proposals by next Monday. Please see Mr. Davison for details.',
  },
  {
    id: 3,
    title: 'Mid-Term Exam Schedule Released',
    date: '3 days ago',
    content: 'The schedule for the upcoming mid-term examinations is now available on the school portal. Exams will commence in two weeks.',
  },
   {
    id: 4,
    title: 'Coding Club Workshop on Saturday',
    date: '4 days ago',
    content: 'Join us for a special workshop on "Introduction to Web Development" this Saturday at 10 AM in the computer lab. All are welcome!',
  },
];

export default function NewsFeed() {
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
          <div className="space-y-6 pr-4">
            {newsItems.map(item => (
              <div key={item.id} className="p-3 rounded-lg bg-background/50">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-semibold text-sm">{item.title}</h4>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.content}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
