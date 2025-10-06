import { NextResponse } from 'next/server';
import newsData from '@/lib/news-data.json';
import fs from 'node:fs/promises';
import path from 'node:path';
import { formatDistanceToNow } from 'date-fns';

const newsFilePath = path.join(process.cwd(), 'src/lib/news-data.json');

// NOTE: This is a simplified implementation for demonstration purposes.
// In a real-world application, you would use a database for this.
// Modifying the filesystem at runtime is not recommended for production environments,
// especially on serverless platforms.

async function readNews() {
  try {
    const data = await fs.readFile(newsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, return the initial structure
    if (error.code === 'ENOENT') {
      return { newsItems: [] };
    }
    console.error('Error reading news file:', error);
    throw new Error('Could not read news data.');
  }
}

async function writeNews(data) {
  try {
    await fs.writeFile(newsFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing news file:', error);
    throw new Error('Could not write news data.');
  }
}

export async function GET() {
  try {
    const data = await readNews();
    const newsWithRelativeDates = {
        ...data,
        newsItems: data.newsItems.map(item => ({
            ...item,
            date: formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })
        })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    };
    return NextResponse.json(newsWithRelativeDates);
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

    const data = await readNews();
    const newPost = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      title,
      content,
    };

    data.newsItems.unshift(newPost);
    await writeNews(data);
    
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

    const data = await readNews();
    const initialLength = data.newsItems.length;
    data.newsItems = data.newsItems.filter((item) => item.id !== id);

    if (data.newsItems.length === initialLength) {
        return NextResponse.json({ message: 'News item not found' }, { status: 404 });
    }

    await writeNews(data);

    return NextResponse.json({ message: 'News item deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
