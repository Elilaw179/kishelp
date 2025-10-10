import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground">
       <section className="relative h-[400px] flex items-center justify-center text-center text-white animate-in fade-in duration-500">
        <Image
          src="https://picsum.photos/seed/contact-hero/1200/400"
          alt="School campus aerial view"
          fill
          className="object-cover"
          data-ai-hint="aerial school"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-4">
          <h1 className="text-5xl font-bold">Get In Touch</h1>
          <p className="mt-4 text-xl">We'd love to hear from you. Here's how you can reach us.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="bg-card p-8 rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <Input type="text" placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
              <Input type="text" placeholder="Subject" />
              <Textarea placeholder="Your Message" rows={5} />
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Send Message</Button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
             <div>
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3"><MapPin /> Address:</h3>
              <p className="text-lg text-muted-foreground">No 7, Ivara Esu Street, State Housing, Calabar, CRS.</p>
            </div>
             <div>
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3"><Phone /> Phone: 

</h3>
              <p className="text-lg text-muted-foreground">(+234)-816 594 5556</p>
            </div>
             <div>
              <h3 className="text-2xl font-semibold mb-4 text-primary flex items-center gap-3"><Mail /> Email:</h3>
              <p className="text-lg text-muted-foreground">Email: support@kourklysschools.ng</p>
            </div>
          </div>
        </div>
      </section>

       <section className="h-[400px] w-full animate-in fade-in-0 duration-500">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.376419799226!2d3.351486314771014!3d6.60000009522704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d7a9e3f3b9b%3A0x2ad33c82d49933e8!2sKourkyls%20International%20School!5e0!3m2!1sen!2sng!4v1626357483863!5m2!1sen!2sng" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={true} 
                loading="lazy"
                title="School Location Map"
            ></iframe>
      </section>
    </div>
  );
}
