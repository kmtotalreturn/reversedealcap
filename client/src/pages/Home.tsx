import { Button } from "@/components/ui/button";
import { useState } from "react";
import LenderForm from "@/components/LenderForm";
import CompanyForm from "@/components/CompanyForm";

export default function Home() {
  const [showLenderForm, setShowLenderForm] = useState(false);
  const [showCompanyForm, setShowCompanyForm] = useState(false);

  const scrollToForms = (formType: 'lender' | 'company') => {
    if (formType === 'lender') {
      setShowLenderForm(true);
      setShowCompanyForm(false);
    } else {
      setShowCompanyForm(true);
      setShowLenderForm(false);
    }
    setTimeout(() => {
      document.getElementById('forms-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="max-w-6xl">
          <h1 className="brutalist-hero mb-12 md:mb-16">
            Introductions to profitable private companies exploring debt — not dilution.
          </h1>
          <p className="brutalist-body max-w-3xl mb-12 md:mb-16">
            We help privately-held businesses with refinancing, acquisition, or liquidity needs through introductions to vetted middle-market lenders.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Button 
              size="lg" 
              className="text-lg font-semibold px-8 py-6 h-auto rounded-lg"
              onClick={() => scrollToForms('lender')}
            >
              👉 For Lenders – Request Deal Flow
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg font-semibold px-8 py-6 h-auto rounded-lg"
              onClick={() => scrollToForms('company')}
            >
              👉 For Companies – Explore Debt Options
            </Button>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="border-t border-b border-border py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <h2 className="brutalist-heading mb-16 md:mb-24">Who this is for</h2>
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div className="brutalist-box">
              <h3 className="brutalist-subheading mb-8">For Lenders</h3>
              <ul className="space-y-4 brutalist-body mb-8">
                <li>• Private credit funds</li>
                <li>• Regional & specialty banks</li>
                <li>• Direct lenders ($5M–$100M deals)</li>
              </ul>
              <div className="border-t border-border pt-6">
                <p className="brutalist-body font-bold">
                  We introduce lenders to privately held companies thinking about debt financing
                </p>
              </div>
            </div>
            <div className="brutalist-box">
              <h3 className="brutalist-subheading mb-8">For Companies</h3>
              <ul className="space-y-4 brutalist-body mb-8">
                <li>• $2M–$200M revenue</li>
                <li>• Profitable, privately held</li>
                <li>• Prefer debt over dilution</li>
              </ul>
              <div className="border-t border-border pt-6">
                <p className="brutalist-body font-bold">
                  Discreet introductions to lenders aligned with your situation — growth, acquisition, or other financing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32">
        <div className="container">
          <h2 className="brutalist-heading mb-16 md:mb-24">How it works</h2>
          <div className="space-y-16 md:space-y-20 max-w-5xl">
            <div className="border-l-2 border-accent pl-8 md:pl-12">
              <h3 className="brutalist-subheading mb-6">Step 1 – Identify</h3>
              <p className="brutalist-body">
                We monitor private companies for signals
              </p>
            </div>
            <div className="border-l-2 border-accent pl-8 md:pl-12">
              <h3 className="brutalist-subheading mb-6">Step 2 – Qualify</h3>
              <p className="brutalist-body">
                We reach out to stable, operating businesses with established leadership.
              </p>
            </div>
            <div className="border-l-2 border-accent pl-8 md:pl-12">
              <h3 className="brutalist-subheading mb-6">Step 3 – Introduce</h3>
              <p className="brutalist-body">
                When there's mutual interest, we make a direct, off-market introduction to an appropriate lender.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Don't Do */}
      <section className="border-t border-b border-border py-20 md:py-32 bg-secondary/40">
        <div className="container">
          <h2 className="brutalist-heading mb-16 md:mb-24">What we don't do</h2>
          <div className="max-w-3xl">
            <ul className="space-y-6 brutalist-body">
              <li className="flex items-start gap-4">
                <span className="text-4xl font-black">×</span>
                <span>We don't arrange equity</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-4xl font-black">×</span>
                <span>We don't sell leads</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-4xl font-black">×</span>
                <span>We don't run broad processes</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="text-4xl font-black">×</span>
                <span>We don't represent distressed businesses</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Lenders Work With Us */}
      <section className="py-20 md:py-32">
        <div className="container">
          <h2 className="brutalist-heading mb-16 md:mb-24">Why lenders work with us</h2>
          <div className="grid sm:grid-cols-2 gap-8 md:gap-12 max-w-5xl">
            <div className="border border-border p-8 rounded-lg bg-card">
              <p className="brutalist-body font-bold">Early-stage conversations (pre-mandate)</p>
            </div>
            <div className="border border-border p-8 rounded-lg bg-card">
              <p className="brutalist-body font-bold">Privately held companies, looking for a way forward</p>
            </div>
            <div className="border border-border p-8 rounded-lg bg-card">
              <p className="brutalist-body font-bold">Pattern-based sourcing, with honed skills</p>
            </div>
            <div className="border border-border p-8 rounded-lg bg-card">
              <p className="brutalist-body font-bold">Selective introductions</p>
            </div>
          </div>
          <p className="brutalist-body mt-12 text-muted-foreground italic">
            We typically introduce fewer than 5 companies per month. Scarcity over scale.
          </p>
        </div>
      </section>

      {/* Why Companies Talk To Us */}
      <section className="border-t border-b border-border py-20 md:py-32 bg-secondary/40">
        <div className="container">
          <h2 className="brutalist-heading mb-16 md:mb-24">Why companies talk to us</h2>
          <div className="max-w-4xl space-y-8">
            <div className="flex items-start gap-6">
              <span className="text-6xl font-black">✓</span>
              <div>
                <h3 className="brutalist-subheading mb-2">No obligation</h3>
                <p className="brutalist-body">Conversations stay exploratory until you decide otherwise.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <span className="text-6xl font-black">✓</span>
              <div>
                <h3 className="brutalist-subheading mb-2">No public fundraising</h3>
                <p className="brutalist-body">Discreet, off-market introductions only.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <span className="text-6xl font-black">✓</span>
              <div>
                <h3 className="brutalist-subheading mb-2">No dilution pressure</h3>
                <p className="brutalist-body">Debt-focused conversations aligned with your capital structure goals.</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <span className="text-6xl font-black">✓</span>
              <div>
                <h3 className="brutalist-subheading mb-2">Lender-aligned conversations</h3>
                <p className="brutalist-body">We match you with lenders who understand your business model and stage.</p>
              </div>
            </div>
          </div>
          <p className="brutalist-body mt-16 font-bold max-w-3xl">
            Many companies speak with us months before they formally pursue financing. That's the entire point of our model.
          </p>
        </div>
      </section>

      {/* Forms Section */}
      <section id="forms-section" className="py-20 md:py-32">
        <div className="container">
          <h2 className="brutalist-heading mb-16 md:mb-24">Get Started</h2>
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16">
            {/* Lender Form */}
            <div className={`brutalist-box ${showLenderForm ? 'ring-2 ring-accent' : ''}`}>
              <h3 className="brutalist-subheading mb-8">Lender Form</h3>
              <LenderForm />
            </div>

            {/* Company Form */}
            <div className={`brutalist-box ${showCompanyForm ? 'ring-2 ring-accent' : ''}`}>
              <h3 className="brutalist-subheading mb-8">Company Form</h3>
              <CompanyForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 md:py-16 bg-secondary/20">
        <div className="container">
          <div className="max-w-4xl space-y-6">
            <p className="brutalist-body font-bold">
              Not a lender. Not a broker-dealer.
            </p>
            <p className="brutalist-body font-bold">
              Introductions only. No capital committed.
            </p>
            <p className="brutalist-body mt-8">
              Contact: <a href="mailto:contact@firstpeakpartners.com" className="underline decoration-4 hover:bg-black hover:text-white transition-colors">contact@firstpeakpartners.com</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
