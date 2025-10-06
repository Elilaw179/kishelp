import { Users, BookOpen, Target, Globe, Heart } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-center text-white">
        <Image
          src="https://picsum.photos/seed/school-building/1200/400"
          alt="School building"
          fill
          className="object-cover"
          data-ai-hint="school building"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-4">
          <h1 className="text-5xl font-bold">About Kourkyls International School</h1>
          <p className="mt-4 text-xl">Nurturing Great Minds for Excellence</p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-3xl font-bold mb-4 text-primary flex items-center gap-2"><Target className="w-8 h-8"/> Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              Our mission is to provide a nurturing and stimulating environment where students can achieve their full academic potential and develop into well-rounded, responsible, and compassionate global citizens. We are committed to fostering a love for learning that lasts a lifetime.
            </p>
          </div>
          <div className="text-left">
            <h2 className="text-3xl font-bold mb-4 text-primary flex items-center gap-2"><Globe className="w-8 h-8"/> Our Vision</h2>
            <p className="text-lg text-muted-foreground">
              To be a leading educational institution recognized for its commitment to excellence, innovation, and the holistic development of every child. We envision a community of learners who are prepared to make a positive impact on the world.
            </p>
          </div>
        </div>
      </section>
      
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                 <div className="p-6">
                    <Heart className="mx-auto w-12 h-12 text-accent mb-4"/>
                    <h3 className="text-xl font-semibold mb-2">Integrity</h3>
                    <p className="text-muted-foreground">We uphold the highest standards of honesty and ethical behavior in all that we do.</p>
                </div>
                 <div className="p-6">
                    <BookOpen className="mx-auto w-12 h-12 text-accent mb-4"/>
                    <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                    <p className="text-muted-foreground">We pursue excellence in teaching and learning, encouraging every student to achieve their personal best.</p>
                </div>
                 <div className="p-6">
                    <Users className="mx-auto w-12 h-12 text-accent mb-4"/>
                    <h3 className="text-xl font-semibold mb-2">Community</h3>
                    <p className="text-muted-foreground">We foster a strong sense of community built on respect, collaboration, and mutual support.</p>
                </div>
            </div>
        </div>
      </section>

      {/* History */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className='relative h-64 w-full rounded-lg overflow-hidden shadow-2xl'>
                 <Image
                    src="https://picsum.photos/seed/history-image/600/400"
                    alt="Founder of the school"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="library books"
                    />
            </div>
          <div>
            <h2 className="text-3xl font-bold mb-4 text-primary">Our History</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Founded in 2019 by Elisha Lawrence Sunday, Kourkyls International School started with a vision to create a unique learning space for children in the community.
            </p>
            <p className="text-lg text-muted-foreground">
              From our humble beginnings with just a handful of students, we have grown into a thriving educational center known for its innovative teaching methods and dedicated staff. We are proud of our journey and excited for the future as we continue to nurture the next generation of leaders.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
