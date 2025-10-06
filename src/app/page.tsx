import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { GraduationCap, Lightbulb, PenSquare, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-students');
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-section');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] text-white">
        <Image 
          src={heroImage?.imageUrl || "https://picsum.photos/seed/hero/1200/800"} 
          alt={heroImage?.description || "Happy students"}
          fill
          className="object-cover"
          data-ai-hint={heroImage?.imageHint}
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-5xl md:text-7xl font-bold">Welcome to Kourkyls International School</h1>
          <p className="mt-4 text-lg md:text-2xl max-w-3xl">Nurturing Great Minds for Excellence Since 2019</p>
          <Link href="/dashboard">
            <Button size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
              Go to Student Portal <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <GraduationCap className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Expert-Led Curriculum</h3>
              <p className="text-muted-foreground">Our curriculum is designed and taught by experienced educators passionate about student success.</p>
            </div>
            <div className="p-6">
              <Lightbulb className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Innovative Learning</h3>
              <p className="text-muted-foreground">We embrace modern technology and teaching methods to create a dynamic learning environment.</p>
            </div>
            <div className="p-6">
              <PenSquare className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Personalized Tools</h3>
              <p className="text-muted-foreground">Access your own to-do lists, timetable generator, and AI assistant in our student portal.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                 <div>
                    <h2 className="text-4xl font-bold mb-4">About Our School</h2>
                    <p className="text-lg text-muted-foreground mb-6">
                        Kourkyls International School is dedicated to providing a supportive and challenging educational experience. We believe in fostering not just academic skills, but also character, creativity, and a lifelong passion for learning. Our community is built on a foundation of respect and a shared commitment to excellence.
                    </p>
                    <Link href="/about">
                      <Button variant="outline">Learn More <ArrowRight className="ml-2" /></Button>
                    </Link>
                </div>
                <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-2xl">
                    <Image
                        src={aboutImage?.imageUrl || "https://picsum.photos/seed/about/600/400"}
                        alt={aboutImage?.description || "Students in a classroom"}
                        fill
                        className="object-cover"
                        data-ai-hint={aboutImage?.imageHint}
                    />
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover a place where your child can thrive. Contact us today to schedule a tour and learn more about our admissions process.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary">Contact Us</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
