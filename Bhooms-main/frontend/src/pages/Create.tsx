import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Building2, Briefcase, Phone, Palette, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepIndicator } from "@/components/StepIndicator";
import { BrandMark } from "@/components/BrandMark";
import { useNavigate } from "react-router-dom";

const businessTypes = [
  "Restaurant / Cafe",
  "Home Services",
  "Health & Wellness",
  "Professional Services",
  "Retail Store",
  "Beauty & Salon",
  "Fitness & Gym",
  "Other",
];

const styleOptions = [
  { id: "modern", label: "Modern", description: "Clean lines, contemporary feel" },
  { id: "minimal", label: "Minimal", description: "Simple, elegant, focused" },
  { id: "luxury", label: "Luxury", description: "Premium, sophisticated look" },
  { id: "bold", label: "Bold", description: "Vibrant, eye-catching design" },
];

const toneOptions = [
  { id: "luxury", label: "Luxury", description: "Premium, formal language" },
  { id: "modern", label: "Modern", description: "Contemporary, confident tone" },
  { id: "minimal", label: "Minimal", description: "Simple, direct messaging" },
  { id: "simple", label: "Simple", description: "Friendly, accessible (default)" },
];

const stepLabels = ["Business", "Services", "Contact", "Style"];

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
  tone: string;
  primaryColor: string;
}

const Create = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    businessType: "",
    location: "",
    services: "",
    phone: "",
    email: "",
    address: "",
    whatsapp: false,
    style: "modern",
    tone: "simple",
    primaryColor: "#14B8A6",
  });

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Generate website
      navigate("/loading", { state: { formData } });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate("/");
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.businessName.trim() && formData.businessType;
      case 2:
        return formData.services.trim();
      case 3:
        return formData.email.trim() || formData.phone.trim();
      case 4:
        return formData.style;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-16 px-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
          <div className="flex items-center gap-2">
            <BrandMark className="h-8 w-8" framed />
            <span className="font-semibold text-foreground">Muse - AI</span>
          </div>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Progress */}
      <div className="py-6 px-4 bg-muted/30">
        <StepIndicator
          currentStep={currentStep}
          totalSteps={4}
          labels={stepLabels}
        />
      </div>

      {/* Form Content */}
      <div className="flex-1 container max-w-lg mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Business Basics */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-6 h-6 text-accent-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Tell us about your business
                </h1>
                <p className="text-muted-foreground">
                  Let's start with the basics
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="e.g., Sunny's Bakery"
                    value={formData.businessName}
                    onChange={(e) => updateField("businessName", e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Business Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {businessTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => updateField("businessType", type)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium text-left transition-all ${formData.businessType === type
                          ? "border-primary bg-accent text-foreground"
                          : "border-border bg-card text-muted-foreground hover:border-primary/50"
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">City / Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., San Francisco, CA"
                    value={formData.location}
                    onChange={(e) => updateField("location", e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Services */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-6 h-6 text-accent-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  What services do you offer?
                </h1>
                <p className="text-muted-foreground">
                  Help customers understand what you do
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="services">Your Services</Label>
                <textarea
                  id="services"
                  placeholder="e.g., Fresh bread, Custom cakes, Catering services, Wedding cakes"
                  value={formData.services}
                  onChange={(e) => updateField("services", e.target.value)}
                  className="w-full h-40 p-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Separate each service with a comma
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 3: Contact Info */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-accent-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  How can customers reach you?
                </h1>
                <p className="text-muted-foreground">
                  Add your contact information
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="hello@yourbusiness.com"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address (optional)</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St, Suite 100"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <input
                    type="checkbox"
                    id="whatsapp"
                    checked={formData.whatsapp}
                    onChange={(e) => updateField("whatsapp", e.target.checked)}
                    className="w-5 h-5 rounded border-border accent-primary"
                  />
                  <Label htmlFor="whatsapp" className="cursor-pointer text-sm">
                    Enable WhatsApp contact button
                  </Label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Style Preference */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-6 h-6 text-accent-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Choose your style
                </h1>
                <p className="text-muted-foreground">
                  Select the look that fits your brand
                </p>
              </div>

              <div className="space-y-4">
                <Label>Design Style</Label>
                <div className="grid grid-cols-2 gap-3">
                  {styleOptions.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => updateField("style", style.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${formData.style === style.id
                        ? "border-primary bg-accent shadow-md"
                        : "border-border bg-card hover:border-primary/50"
                        }`}
                    >
                      <span className="font-semibold text-foreground block mb-1">
                        {style.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {style.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Tone & Language Style</Label>
                <div className="grid grid-cols-2 gap-3">
                  {toneOptions.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => updateField("tone", tone.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${formData.tone === tone.id
                        ? "border-primary bg-accent shadow-md"
                        : "border-border bg-card hover:border-primary/50"
                        }`}
                    >
                      <span className="font-semibold text-foreground block mb-1">
                        {tone.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {tone.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Brand Color (optional)</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => updateField("primaryColor", e.target.value)}
                    className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                  />
                  <span className="text-sm text-muted-foreground">
                    Pick your brand's primary color
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="container max-w-lg mx-auto px-4 py-4">
          <Button
            variant="hero"
            size="lg"
            className="w-full group"
            onClick={handleNext}
            disabled={!isStepValid()}
          >
            {currentStep === 4 ? (
              <>
                Generate Website
                <Sparkles className="w-5 h-5" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Create;
