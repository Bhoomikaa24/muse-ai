import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Layout, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/FeatureCard";
import { WebsitePreviewCard } from "@/components/WebsitePreviewCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BrandMark } from "@/components/BrandMark";
import { useNavigate } from "react-router-dom";
const steps = [{
  icon: Sparkles,
  title: "Enter Your Details",
  description: "Tell us about your business, services, and contact info in just a few simple steps."
}, {
  icon: Layout,
  title: "AI Builds Your Site",
  description: "Our AI creates a professional website with custom content, layout, and styling."
}, {
  icon: Rocket,
  title: "Publish Instantly",
  description: "Review, make quick edits, and publish your website live in seconds."
}];
const exampleSites = [{
  title: "Sunny Bakery",
  category: "Restaurant"
}, {
  title: "Elite Plumbing",
  category: "Home Services"
}, {
  title: "Zen Yoga Studio",
  category: "Fitness"
}, {
  title: "City Law Firm",
  category: "Professional"
}];
const Landing = () => {
  const navigate = useNavigate();

  const scrollToExamples = () => {
    const examplesSection = document.getElementById("examples-section");
    if (examplesSection) {
      examplesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return <div className="min-h-screen gradient-hero">
    {/* Header */}
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 text-sidebar-ring">
        <div className="flex items-center gap-2">
          <BrandMark className="h-10 w-10" framed />
          <span className="font-bold text-lg text-foreground">Muse - AI</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" onClick={() => navigate("/create")}>
            Get Started
          </Button>
        </div>
      </div>
    </header>

    {/* Hero Section */}
    <section className="pt-32 pb-20 px-4">
      <div className="container max-w-4xl mx-auto text-center">
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Website Builder
          </span>
        </motion.div>

        <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }} className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
          Create a professional website{" "}
          <span className="text-primary">in minutes</span>
        </motion.h1>

        <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance">
          No design skills. No coding. Just answer a few questions and let AI build your perfect business website.
        </motion.p>

        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="xl" onClick={() => navigate("/create")} className="group">
            Build My Website
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" size="xl" onClick={scrollToExamples}>
            See Examples
          </Button>
        </motion.div>

      </div>
    </section>

    {/* How It Works */}
    <section className="py-20 px-4 bg-background">
      <div className="container max-w-5xl mx-auto">
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Three simple steps to your professional website
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => <FeatureCard key={step.title} icon={step.icon} title={step.title} description={step.description} stepNumber={index + 1} />)}
        </div>
      </div>
    </section>

    {/* Example Sites */}
    <section id="examples-section" className="py-20 px-4 gradient-hero">
      <div className="container max-w-6xl mx-auto">
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Websites Built With Muse - AI
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join hundreds of local businesses with beautiful, professional websites
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {exampleSites.map(site => <WebsitePreviewCard key={site.title} title={site.title} category={site.category} />)}
        </div>

        <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mt-12">
          <Button variant="hero" size="lg" onClick={() => navigate("/create")} className="group">
            Create Your Website
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>

    {/* Footer */}
    <footer className="py-8 px-4 bg-muted/50 border-t border-border">
      <div className="container max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BrandMark className="h-8 w-8" framed />
            <span className="font-semibold text-foreground">Muse - AI</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">About</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Muse - AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>;
};
export default Landing;