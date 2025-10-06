'use client';

import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const footerLinks = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Portal', href: '/dashboard' },
];

export default function SiteFooter() {
    const logo = PlaceHolderImages.find(p => p.id === 'school-logo');
    const [adminClickCount, setAdminClickCount] = useState(0);
    const router = useRouter();

    const handleLogoClick = () => {
        const newCount = adminClickCount + 1;
        setAdminClickCount(newCount);

        if (newCount >= 5) {
            router.push('/admin');
            setAdminClickCount(0); // Reset after navigating
        }

        // Reset count if user stops clicking
        setTimeout(() => {
            if (adminClickCount < 5) { // Check against the count before timeout
                setAdminClickCount(c => (c === newCount ? 0 : c));
            }
        }, 2000);
    };

    return (
        <footer className="bg-card border-t text-card-foreground">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center md:items-start">
                         {logo && (
                            <button onClick={handleLogoClick} aria-label="Admin Access Trigger">
                                <Image src={logo.imageUrl} alt={logo.description} width={80} height={80} data-ai-hint={logo.imageHint} />
                            </button>
                         )}
                        <p className="mt-2 text-sm text-muted-foreground max-w-xs text-center md:text-left">
                            Kourkyls International School <br/> Nurturing Great Minds for Excellence
                        </p>
                    </div>

                    <div className="text-center">
                        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {footerLinks.map(link => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div className="text-center">
                        <h3 className="font-bold text-lg mb-4">For Students</h3>
                        <ul className="space-y-2">
                           <li>
                             <Link href="/presentation" className="text-muted-foreground hover:text-primary transition-colors">
                                Presentation Guide
                            </Link>
                           </li>
                        </ul>
                    </div>
                    
                    <div className="text-center md:text-left">
                        <h3 className="font-bold text-lg mb-4">Contact Us</h3>
                        <address className="not-italic text-muted-foreground space-y-2">
                            <p>No 7, Ivara Esu Street, State Housing, Calabar, CRS.</p>
                            <p>Email: support@kourklysschools.ng</p>
                            <p>Phone: (+234)-816 594 5556</p>
                        </address>
                    </div>
                </div>
                <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Kourkyls International School. All Rights Reserved.</p>
                     <p className="text-xs mt-2">Website by Engr.Law & KIS Students</p>
                </div>
            </div>
        </footer>
    );
}
