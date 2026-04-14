import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Edit3, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/BrandMark";
import { WebsitePreviewFrame } from "@/components/WebsitePreviewFrame";
import { PublishModal } from "@/components/PublishModal";
import type { GeneratedWebsite } from "@/lib/rules-engine";

interface FormData {
  businessName: string;
  businessType: string;
  location: string;
  services: string;
  phone: string;
  email: string;
  address: string;
  whatsapp: boolean;
  style: string;
  primaryColor: string;
}

type WebsiteContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl?: string;
  aboutText: string;
  services: { title: string; description: string }[];
  features: string[];
  ctaText: string;
};

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = (location.state?.formData as FormData) || {
    businessName: "Your Business",
    businessType: "Professional Services",
    location: "Your City",
    services: "Service 1, Service 2, Service 3",
    phone: "",
    email: "",
    address: "",
    whatsapp: false,
    style: "modern",
    primaryColor: "#14B8A6",
  };

  // Use generated website if available, otherwise create defaults
  const generatedWebsite = location.state?.generatedWebsite as GeneratedWebsite | undefined;
  console.log("Preview.tsx received generatedWebsite:", generatedWebsite);


  const heroSection = generatedWebsite?.sections.find((section) => section.type === "hero");
  const aboutSection = generatedWebsite?.sections.find((section) => section.type === "about");
  const servicesSection = generatedWebsite?.sections.find((section) => section.type === "services");
  const featuresSection = generatedWebsite?.sections.find((section) => section.type === "why_us");

  const initialContent: WebsiteContent = {
    heroTitle: heroSection?.headline || `Welcome to ${formData.businessName}`,
    heroSubtitle:
      heroSection?.subtext ||
      `Your trusted ${formData.businessType.toLowerCase()} in ${formData.location || "your area"}. We're here to serve you with excellence.`,
    heroImageUrl: heroSection?.imageUrl,
    aboutText:
      aboutSection?.content ||
      `At ${formData.businessName}, we pride ourselves on delivering exceptional service to our community. With years of experience and a passion for what we do, we're committed to exceeding your expectations.`,
    services:
      servicesSection?.items?.filter(Boolean) ||
      formData.services.split(",").map((s) => ({ title: s.trim(), description: "Offering high-quality professional services customized for your needs." })).filter(s => s.title).slice(0, 3),
    features:
      featuresSection?.points || ["Professional Service", "Trusted Experts", "Quality Guaranteed"],
    ctaText: heroSection?.cta || "Get Started",
  };

  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [websiteContent, setWebsiteContent] = useState(initialContent);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <BrandMark className="h-5 w-5" />
            </div>
            <div>
              <span className="font-semibold text-foreground block leading-tight">
                {formData.businessName}
              </span>
              <span className="text-xs text-muted-foreground">Preview Mode</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={isEditing ? "default" : "outline"}
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="gap-2"
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isEditing ? "Done Editing" : "Edit Text"}
              </span>
            </Button>
            <Button
              variant="hero"
              size="sm"
              onClick={() => setIsPublishModalOpen(true)}
              className="gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Publish</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Edit Mode Banner */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-accent border-b border-primary/20 px-4 py-3 text-center"
        >
          <p className="text-sm text-accent-foreground">
            <span className="font-medium">Editing mode:</span> Click on any text
            to edit it directly
          </p>
        </motion.div>
      )}

      {/* Preview Content */}
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Instructions */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Your website is ready! 🎉
            </h1>
            <p className="text-muted-foreground">
              Review your website below. Click "Edit Text" to make changes, then
              publish when you're ready.
            </p>
          </div>

          {/* Website Preview */}
          <WebsitePreviewFrame
            businessName={formData.businessName}
            businessType={formData.businessType}
            content={websiteContent}
            onContentChange={setWebsiteContent}
            styleVariant={(generatedWebsite?.meta.style as "modern" | "minimal" | "luxury" | "bold") || formData.style as "modern" | "minimal" | "luxury" | "bold"}
            designMeta={generatedWebsite?.meta}
            primaryColor={generatedWebsite?.meta.primary_color || formData.primaryColor}
          />

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/create")}
            >
              Start Over
            </Button>
            <Button
              variant="hero"
              size="lg"
              onClick={() => setIsPublishModalOpen(true)}
              className="gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Publish Website
            </Button>
          </div>
        </motion.div>
      </main>

      {/* Publish Modal */}
      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        businessName={formData.businessName}
      />
    </div>
  );
};

export default Preview;
