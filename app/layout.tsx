import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/layout/Navigation';
import { ChatbotOverlay } from '@/components/layout/ChatbotOverlay';

export const metadata: Metadata = {
  title: 'SurveyMonkey Competitor Intelligence',
  description: 'Comprehensive competitive research and intelligence platform for SurveyMonkey',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <ChatbotOverlay />
      </body>
    </html>
  );
}
