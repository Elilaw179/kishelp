import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const footerLinks = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Portal', href: '/dashboard' },
    { name: 'Admin', href: '/admin' },
];

export default function SiteFooter() {
    const logo = PlaceHolderImages.find(p => p.id === 'school-logo');

    return (
        <footer className="bg-card border-t text-card-foreground">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center md:items-start">
                         {logo && <Image src={logo.imageUrl} alt={logo.description} width={80} height={80} data-ai-hint={logo.imageHint} />}
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
                    
                    <div className="text-center md:text-left">
                        <h3 className="font-bold text-lg mb-4">Contact Us</h3>
                        <address className="not-italic text-muted-foreground space-y-2">
                            <p>123 School Lane, Education City</p>
                            <p>Email: info@kourkyls.edu</p>
                            <p>Phone: (123) 456-7890</p>
                        </address>
                    </div>
                </div>
                <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Kourkyls International School. All Rights Reserved.</p>
                     <p className="text-xs mt-2">Website by Elisha Lawrence Sunday</p>
                </div>
            </div>
        </footer>
    );
}
