import TodoList from '@/components/dashboard/todo-list';
import AiChatbot from '@/components/dashboard/ai-chatbot';
import TimetableGenerator from '@/components/dashboard/timetable-generator';
import NewsFeed from '@/components/dashboard/news-feed';

export default function DashboardPage() {
  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8 bg-background">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="flex flex-col gap-8">
            <TodoList />
            <TimetableGenerator />
          </div>
          <div className="flex flex-col gap-8">
            <AiChatbot />
            <NewsFeed />
          </div>
        </div>
      </main>
  );
}
