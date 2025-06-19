
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/shared/Header';
import { Lightbulb, Zap, Edit3, FileText, Languages, Download, Users, History, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants';

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex flex-col items-center p-6 text-center bg-card rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-105">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="mb-2 text-xl font-headline font-semibold">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);


export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-background via-secondary/30 to-background">
          <div className="container mx-auto px-4 text-center">
            <Zap className="mx-auto mb-6 h-16 w-16 text-accent animate-pulse" />
            <h1 className="mb-6 text-5xl font-bold tracking-tight font-headline sm:text-6xl lg:text-7xl">
              Craft Your Business Plan <span className="text-primary">Instantly</span> with {APP_NAME}
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-foreground/80 sm:text-xl">
              Empowering solo entrepreneurs and small businesses to create professional, investor-ready business plans in minutes.
              Speed, simplicity, and AI-powered editing at your fingertips.
            </p>
            <Link href="/plan/new">
              <Button size="lg" className="px-10 py-6 text-lg shadow-lg transition-transform hover:scale-105">
                <Lightbulb className="mr-2 h-5 w-5" />
                Start Your Plan Now
              </Button>
            </Link>
            <p className="mt-4 text-xs text-muted-foreground">Free to start. No credit card required.</p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold font-headline">Why Choose {APP_NAME}?</h2>
              <p className="mt-4 text-lg text-muted-foreground">Everything you need to succeed, simplified.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={FileText}
                title="AI-Powered Plan Generation"
                description="Answer a few questions and let our AI draft a structured, comprehensive business plan."
              />
              <FeatureCard
                icon={Edit3}
                title="Conversational Editing"
                description="Modify any section of your plan using simple natural language commands. It's like magic!"
              />
              <FeatureCard
                icon={Languages}
                title="Multilingual Support"
                description="Expand your reach. Generate and translate your business plan into multiple languages effortlessly."
              />
              <FeatureCard
                icon={Users}
                title="Industry Templates"
                description="Get a head start with pre-filled templates tailored for various industries."
              />
              <FeatureCard
                icon={Download}
                title="Export to PDF"
                description="Easily export your polished business plan to PDF for sharing with investors and partners."
              />
              <FeatureCard
                icon={History}
                title="Auto-Save & Simplicity"
                description="Focus on your ideas, not on saving. We auto-save your progress in a clean, intuitive interface."
              />
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold font-headline">Get Started in 3 Easy Steps</h2>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-3xl font-bold text-primary">1</div>
                <h3 className="mb-2 text-xl font-headline font-semibold">Choose Template & Input Details</h3>
                <p className="text-muted-foreground">Select an industry template and provide basic information about your business idea.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-3xl font-bold text-primary">2</div>
                <h3 className="mb-2 text-xl font-headline font-semibold">AI Generates Your Plan</h3>
                <p className="text-muted-foreground">Our intelligent AI crafts a structured first draft of your business plan in moments.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-3xl font-bold text-primary">3</div>
                <h3 className="mb-2 text-xl font-headline font-semibold">Refine & Export</h3>
                <p className="text-muted-foreground">Use the conversational editor to perfect your plan, then export it as a PDF.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 md:py-32 bg-background">
          <div className="container mx-auto px-4 text-center">
             <Image src="https://storage.googleapis.com/project-ai-codemod-prod.appspot.com/projects%2FvNTRQ0N2A8VfNQRRz6Mv%2Ffiles%2F77609151-c722-4d13-83dc-530873197d3a_290c4584-b75a-40ed-b1f8-e8bc39960790_original_image.png" alt="AI Business Plan Generation Graphic" width={800} height={400} className="mx-auto mb-8 rounded-lg shadow-2xl" />
            <h2 className="mb-6 text-4xl font-bold tracking-tight font-headline sm:text-5xl">
              Ready to Bring Your Vision to Life?
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-foreground/80 sm:text-xl">
              Stop dreaming, start planning. {APP_NAME} makes it fast, easy, and effective.
            </p>            
            <Link href="/plan/new">
              <Button size="lg" variant="default" className="px-10 py-6 text-lg shadow-lg transition-transform hover:scale-105">
                Create Your Free Plan
                <Zap className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-8 text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {APP_NAME}. A Wytmode product. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
