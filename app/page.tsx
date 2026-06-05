import { Footer } from "@/components/footer";
import {
  ArchitectureSection,
  ClosingSection,
  CoreFeaturesSection,
  DemoEntrySection,
  GovernanceSection,
  HeroSection,
  ImpactSection,
  ProblemSection,
  RoadmapSection,
  SolutionSection,
  TargetScenarioSection,
  WorkflowSection
} from "@/components/landing-sections";
import { Navbar } from "@/components/navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <TargetScenarioSection />
        <SolutionSection />
        <WorkflowSection />
        <DemoEntrySection />
        <CoreFeaturesSection />
        <ArchitectureSection />
        <ImpactSection />
        <GovernanceSection />
        <RoadmapSection />
        <ClosingSection />
      </main>
      <Footer />
    </>
  );
}
