
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ThemeToggle } from './theme-toggle';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function SiteHeader() {
  const logo = PlaceHolderImages.find(p => p.id === 'school-logo');
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          {logo && (
            <Image
              src={logo.imageUrl}
              alt={logo.description}
              width={40}
              height={40}
              data-ai-hint={logo.imageHint}
            />
          )}
          <span className="font-bold text-lg hidden sm:inline">Kourkly's Classroom Companion</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
           <ThemeToggle />
           <Link href="/dashboard">
             <Button className="hidden md:flex">Student Portal</Button>
           </Link>
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 pt-10">
                   <Link href="/" className="flex items-center gap-2 mb-4" onClick={() => setMenuOpen(false)}>
                        {logo && (
                            <Image
                            src={logo.imageUrl}
                            alt={logo.description}
                            width={30}
                            height={30}
                            data-ai-hint={logo.imageHint}
                            />
                        )}
                        <span className="font-bold">Kourkly's Classroom Companion</span>
                    </Link>
                  {navLinks.map(link => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "text-lg font-medium",
                        pathname === link.href ? 'text-primary' : 'text-foreground'
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                   <hr/>
                   <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                        <Button className="w-full">Student Portal</Button>
                   </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
