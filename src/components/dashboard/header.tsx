import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { GraduationCap } from 'lucide-react';

export default function Header() {
  const studentAvatar = PlaceHolderImages.find(p => p.id === 'student-avatar');

  return (
    <header className="flex items-center justify-between p-4 border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <GraduationCap className="h-8 w-8 text-primary" />
        <h1 className="text-xl font-bold text-foreground font-headline">
          Kourk's Classroom Companion
        </h1>
      </div>
      <Avatar className="h-9 w-9">
        {studentAvatar && (
          <AvatarImage
            src={studentAvatar.imageUrl}
            alt={studentAvatar.description}
            data-ai-hint={studentAvatar.imageHint}
          />
        )}
        <AvatarFallback>ST</AvatarFallback>
      </Avatar>
    </header>
  );
}
