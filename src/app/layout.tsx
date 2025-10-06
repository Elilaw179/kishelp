import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import SiteHeader from '@/components/layout/site-header';
import SiteFooter from '@/components/layout/site-footer';
import { ThemeProvider } from '@/components/layout/theme-provider';

export const metadata: Metadata = {
  title: "Kourkly's Classroom Companion",
  description: 'A professional site for students of Kourkyls International School',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
