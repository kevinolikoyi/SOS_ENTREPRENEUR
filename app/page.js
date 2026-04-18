import ApplicationSection from "@/components/landing/application-section";
import CountdownSection from "@/components/landing/countdown-section";
import EligibilitySection from "@/components/landing/eligibility-section";
import HeroFloatingCta from "@/components/landing/hero-floating-cta";
import HeroHeader from "@/components/landing/hero-header";
import HeroNameplate from "@/components/landing/hero-nameplate";
import HeroSection from "@/components/landing/hero-section";
import ProcessSection from "@/components/landing/process-section";
import SiteFooter from "@/components/landing/site-footer";
import SupportSection from "@/components/landing/support-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroHeader />
      <HeroFloatingCta />
      <main className="[&>section+section]:mt-10 sm:[&>section+section]:mt-14 lg:[&>section+section]:mt-20">
        <HeroSection />
        <HeroNameplate />
        <CountdownSection />
        <EligibilitySection />
        <SupportSection />
        <ProcessSection />
        <ApplicationSection />
      </main>
      <SiteFooter />
    </div>
  );
}
