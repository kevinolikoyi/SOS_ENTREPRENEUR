import ApplicationSection from "@/components/landing/application-section";
import CountdownSection from "@/components/landing/countdown-section";
import EligibilitySection from "@/components/landing/eligibility-section";
import HeroSection from "@/components/landing/hero-section";
import ProcessSection from "@/components/landing/process-section";
import SiteFooter from "@/components/landing/site-footer";
import SupportSection from "@/components/landing/support-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="[&>section+section]:mt-10 sm:[&>section+section]:mt-14 lg:[&>section+section]:mt-20">
        <HeroSection />
        <CountdownSection />
        <SupportSection />
        <EligibilitySection />
        <ProcessSection />
        <ApplicationSection />
      </main>
      <SiteFooter />
    </div>
  );
}
