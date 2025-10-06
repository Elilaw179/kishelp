'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ListTodo, Plus, Trash2 } from 'lucide-react';

interface Task {
  id: number;
  text: string;
  time: string;
  completed: boolean;
}

const isBrowser = typeof window !== 'undefined';

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');

  useEffect(() => {
    if (isBrowser) {
      try {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Error parsing tasks from localStorage', error);
      }
    }
  }, []);

  useEffect(() => {
    if (isBrowser) {
      // Avoid saving the initial empty array state before tasks are loaded.
      if (tasks.length > 0 || localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    }
  }, [tasks]);


  const handleAddTask = () => {
    if (newTaskText.trim() === '') return;
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText.trim(),
      time: newTaskTime,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setNewTaskText('');
    setNewTaskTime('');
  };

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Card className="h-full flex flex-col shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListTodo className="h-6 w-6" />
          <span>Daily To-Do List</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-grow pr-4">
          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center gap-4 p-2 rounded-lg bg-background/50 animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => handleToggleTask(task.id)}
                  aria-label={`Mark ${task.text} as ${task.completed ? 'incomplete' : 'complete'}`}
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={`flex-1 text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                >
                  {task.text}
                </label>
                {task.time && <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md">{task.time}</span>}
                <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task.id)} aria-label={`Delete task: ${task.text}`}>
                  <Trash2 className="h-4 w-4 text-destructive/80" />
                </Button>
              </div>
            ))}
             {tasks.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No tasks for today. Add one below!</p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <div className="flex w-full items-center gap-2">
          <Input
            type="text"
            placeholder="New task..."
            value={newTaskText}
            onChange={e => setNewTaskText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <Input
            type="time"
            value={newTaskTime}
            onChange={e => setNewTaskTime(e.target.value)}
            className="w-32"
          />
          <Button onClick={handleAddTask} aria-label="Add new task">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
