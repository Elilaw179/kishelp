import { NextResponse } from 'next/server';
import initialNewsData from '@/lib/news-data.json';
import { formatDistanceToNow } from 'date-fns';

// In-memory store for news items. This will reset when the server restarts.
let newsItems = initialNewsData.newsItems.map(item => ({
    ...item,
    id: Number(item.id) // Ensure all IDs are numbers
}));

// Function to sort news by date
const getSortedNews = () => {
    return newsItems
        .map(item => ({
            ...item,
            date: formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })
        }))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};


export async function GET() {
  try {
    const newsWithRelativeDates = getSortedNews();
    return NextResponse.json({ newsItems: newsWithRelativeDates });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    if (!title || !content) {
      return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
    }

    const newPost = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      title,
      content,
    };

    newsItems.unshift(newPost);
    
    const newPostWithRelativeDate = {
        ...newPost,
        date: formatDistanceToNow(new Date(newPost.createdAt), { addSuffix: true })
    };

    return NextResponse.json(newPostWithRelativeDate, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const initialLength = newsItems.length;
    newsItems = newsItems.filter((item) => item.id !== id);

    if (newsItems.length === initialLength) {
        return NextResponse.json({ message: 'News item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'News item deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
