// app/page.tsx - Main entry point for the home page
import { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Testimonials from '@/components/home/Testimonials';
import CTASection from '@/components/shared/CTASection';

export const metadata: Metadata = {
  title: 'Home | YourApp',
  description: 'A modern scalable application built with Next.js',
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero 
        title="Welcome to YourApp" 
        subtitle="A scalable Next.js application"
        ctaText="Get Started"
        ctaLink="/dashboard"
      />
      <Features />
      <Testimonials />
      <CTASection
        heading="Ready to get started?"
        subheading="Join thousands of users already using our platform"
        buttonText="Sign Up Now"
        buttonLink="/signup"
      />
    </main>
  );
}