import { GraduationCap, Users, Bot, Code } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PresentationPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary">Presenting the Kourkyls Classroom Companion</h1>
          <p className="mt-4 text-xl text-muted-foreground">A Guide for the SS2 Student Presenters</p>
        </div>

        <div className="space-y-10">
          
          {/* Introduction */}
          <Card className="shadow-lg animate-in fade-in-0 duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Users className="w-8 h-8 text-accent" />
                <span className="text-3xl">Part 1: The Introduction (Student 1)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg space-y-4">
              <p>Good morning, respected parents, our dedicated teachers, and my fellow students.</p>
              <p>We are thrilled to welcome you all today. My name is [Your Name], and on behalf of the Year 11 (SS2) class, we are incredibly proud to present a project we've been working on: the <strong>Kourkyls Classroom Companion</strong>.</p>
              <p>Our goal was simple: to create a modern, helpful, and easy-to-use website just for the students of Kourkyls International School. A digital space to help us stay organized, get answers, and feel even more connected to our amazing school.</p>
              <p>Let's show you what we built!</p>
            </CardContent>
          </Card>

          {/* Core Features */}
          <Card className="shadow-lg animate-in fade-in-0 duration-500 delay-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-accent" />
                <span className="text-3xl">Part 2: The Student Portal (Student 2)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg space-y-4">
                <p>Thank you, [Student 1's Name]. My name is [Your Name].</p>
                <p>The heart of our website is the <strong>Student Portal</strong>. This is the student's personal dashboard. To show you, let's look at two key features.</p>
                <p>First, the <strong>To-Do List</strong>. As students, we have a lot to keep track of—homework, assignments, and study schedules. This simple tool lets us add tasks, set times, and check them off when they're done. It’s our digital helper to stay organized and on top of our work.</p>
                <p>Next is the <strong>Timetable Generator</strong>. Instead of a fixed paper timetable, we can now describe our weekly schedule in plain English, and the website automatically creates a personal, organized timetable for us. It’s smart, it's fast, and it's made just for us.</p>
            </CardContent>
          </Card>
          
          {/* AI Assistant */}
          <Card className="shadow-lg animate-in fade-in-0 duration-500 delay-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Bot className="w-8 h-8 text-accent" />
                <span className="text-3xl">Part 3: Our Smart AI Assistant (Student 3)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg space-y-4">
                <p>Thank you, [Student 2's Name]. My name is [Your Name]. Now, for the most exciting part!</p>
                <p>We've built an <strong>AI Assistant</strong> right into the dashboard. Think of it as a super-smart librarian and school guide, available 24/7.</p>
                <p>Students can ask it questions about any subject—from "What is photosynthesis?" to a tricky math problem. It can also answer questions about our school, like "Where is the school located?" or "Who created this website?".</p>
                <p>This isn't magic; it's powered by Artificial Intelligence from Google, the same technology behind tools many of us use every day. It helps us get instant help with our studies, making learning more interactive and fun.</p>
            </CardContent>
          </Card>

          {/* Conclusion */}
          <Card className="shadow-lg animate-in fade-in-0 duration-500 delay-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Code className="w-8 h-8 text-accent" />
                <span className="text-3xl">Part 4: Conclusion & Thank You (Student 4)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg space-y-4">
              <p>Thank you, [Student 3's Name]. My name is [Your Name].</p>
              <p>This project was more than just a website; it was a journey of learning. Guided by our teacher, Engr. Elisha Lawrence, we, the Year 11 students, got to work with the real tools that software engineers use to build modern web applications.</p>
              <p>The Kourkyls Classroom Companion is a symbol of our school's commitment to excellence and innovation. It shows that we are not just learning subjects, but also learning how to build the future.</p>
              <p>On behalf of the entire SS2 class, we want to thank our parents for your endless support, and our teachers for empowering us. We hope you are as proud of this as we are.</p>
              <p>Thank you for your time. Please feel free to come and try it out!</p>
            </CardContent>
          </Card>

        </div>
      </section>
    </div>
  );
}
