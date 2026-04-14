import { motion } from "framer-motion";
import { EditableText } from "./EditableText";
import { cn } from "@/lib/utils";

interface WebsiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl?: string;
  aboutText: string;
  services: { title: string; description: string }[];
  features: string[];
  ctaText: string;
}

interface WebsitePreviewFrameProps {
  businessName: string;
  businessType?: string;
  content: WebsiteContent;
  onContentChange: (content: WebsiteContent) => void;
  primaryColor?: string;
  styleVariant?: "modern" | "minimal" | "luxury" | "bold";
  designMeta?: {
    secondary_color?: string;
    accent_color?: string;
    background_color?: string;
    text_color?: string;
    heading_font?: string;
    body_font?: string;
    heading_size?: number;
    body_size?: number;
    line_height?: number;
    layout_spacing?: "compact" | "comfortable" | "spacious";
    border_radius?: "sharp" | "rounded" | "soft";
    shadow_style?: "none" | "subtle" | "pronounced";
  };
}

export const WebsitePreviewFrame = ({
  businessName,
  businessType = "Business",
  content,
  onContentChange,
  primaryColor = "hsl(168 76% 42%)",
  styleVariant = "modern",
  designMeta,
}: WebsitePreviewFrameProps) => {
  const updateContent = (key: keyof WebsiteContent, value: any) => {
    onContentChange({ ...content, [key]: value });
  };

  const palette = {
    primary: primaryColor,
    secondary: designMeta?.secondary_color || "#E2E8F0",
    accent: designMeta?.accent_color || "#99F6E4",
    background: designMeta?.background_color || "#FFFFFF",
    text: designMeta?.text_color || "#0F172A",
  };

  const spacingClass = {
    compact: "py-10 md:py-14",
    comfortable: "py-14 md:py-20",
    spacious: "py-16 md:py-24",
  }[designMeta?.layout_spacing || "comfortable"];

  const sectionSpacingClass = {
    compact: "px-6 py-8",
    comfortable: "px-6 py-12",
    spacious: "px-8 py-14",
  }[designMeta?.layout_spacing || "comfortable"];

  const radiusClass = {
    sharp: "rounded-none",
    rounded: "rounded-2xl",
    soft: "rounded-3xl",
  }[designMeta?.border_radius || "rounded"];

  const buttonRadiusClass = {
    sharp: "rounded-none",
    rounded: "rounded-lg",
    soft: "rounded-full",
  }[designMeta?.border_radius || "rounded"];

  const shadowClass = {
    none: "shadow-none",
    subtle: "shadow-md",
    pronounced: "shadow-xl",
  }[designMeta?.shadow_style || "subtle"];

  const frameClass = styleVariant === "minimal"
    ? "bg-card border border-border"
    : styleVariant === "luxury"
      ? "bg-[#0d1724] border border-white/10"
      : "bg-card border border-border";

  const heroAlignment = styleVariant === "minimal" || styleVariant === "bold" ? "text-left" : "text-center";
  const heroInnerWidth = styleVariant === "bold" ? "max-w-5xl" : "max-w-3xl";
  const servicesGridClass = styleVariant === "minimal" ? "md:grid-cols-2" : styleVariant === "bold" ? "md:grid-cols-2" : "md:grid-cols-3";
  const headingFont = designMeta?.heading_font || "Inter, sans-serif";
  const bodyFont = designMeta?.body_font || "Inter, sans-serif";
  const headingSize = designMeta?.heading_size || 36;
  const bodySize = designMeta?.body_size || 16;
  const lineHeight = designMeta?.line_height || 1.6;

  const heroBackgroundText =
    styleVariant === "luxury"
      ? `linear-gradient(135deg, ${palette.primary} 0%, #0b1320 100%)`
      : styleVariant === "minimal"
        ? `linear-gradient(180deg, ${palette.background} 0%, ${palette.secondary} 100%)`
        : styleVariant === "bold"
          ? `linear-gradient(135deg, ${palette.primary}22 0%, ${palette.accent}55 100%)`
          : `linear-gradient(135deg, ${palette.primary}20 0%, ${palette.primary}08 100%)`;

  const heroImageToUse = content.heroImageUrl || `https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop`;
  const heroBackground = `url("${heroImageToUse}"), ${heroBackgroundText}`;

  const sectionTitleClass = styleVariant === "luxury"
    ? "uppercase tracking-[0.22em] text-sm md:text-base"
    : "text-xl";

  const sectionTextClass = styleVariant === "minimal" ? "max-w-3xl leading-8" : "max-w-2xl leading-relaxed";
  const luxuryTextColor = styleVariant === "luxury" ? "text-slate-100" : "text-foreground";
  const luxuryMutedText = styleVariant === "luxury" ? "text-slate-300" : "text-muted-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("overflow-hidden", radiusClass, shadowClass, frameClass)}
    >
      {/* Browser Chrome */}
      <div className="bg-secondary px-4 py-3 flex items-center gap-3 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-background rounded-lg px-4 py-2 text-sm text-foreground flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>{businessName.toLowerCase().replace(/\s+/g, '')}.com</span>
          </div>
        </div>
      </div>

      {/* Website Content */}
      <div className={cn("max-h-[600px] overflow-y-auto", styleVariant === "luxury" ? "bg-[#101826]" : "bg-background")}>
        {/* Hero Section */}
        <div
          className={cn("relative px-6", spacingClass, heroAlignment)}
          style={{
            background: heroBackground,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: styleVariant === "minimal" ? "overlay" : "multiply"
          }}
        >
          <div className={cn("mx-auto", heroInnerWidth)}>
            <div className={cn("mb-4 text-xs uppercase tracking-[0.38em]", luxuryMutedText)}>
              {styleVariant === "luxury" ? "Crafted Presence" : styleVariant === "minimal" ? "Clean Structure" : styleVariant === "bold" ? "High Impact" : "Professional Website"}
            </div>
            <EditableText
              value={content.heroTitle}
              onChange={(v) => updateContent("heroTitle", v)}
              as="h1"
              className={cn("mb-4 font-bold", luxuryTextColor)}
              style={{
                fontFamily: headingFont,
                fontSize: `clamp(${Math.max(headingSize - 10, 24)}px, 5vw, ${headingSize + (styleVariant === "bold" ? 14 : 6)}px)`,
                lineHeight: styleVariant === "luxury" ? 1.15 : 1.1,
                letterSpacing: styleVariant === "luxury" ? "0.02em" : undefined,
              }}
            />
            <EditableText
              value={content.heroSubtitle}
              onChange={(v) => updateContent("heroSubtitle", v)}
              as="p"
              className={cn("mb-8", luxuryMutedText, heroAlignment === "text-center" ? "max-w-xl mx-auto" : "max-w-2xl")}
              style={{
                fontFamily: bodyFont,
                fontSize: `${bodySize + 2}px`,
                lineHeight,
              }}
            />
            <button 
              className={cn("px-8 py-3 font-semibold transition-all hover:brightness-110", buttonRadiusClass, styleVariant === "minimal" ? "border-2 shadow-none" : shadowClass)}
              style={{
                background: styleVariant === "minimal" ? "transparent" : primaryColor,
                borderColor: primaryColor,
                color: styleVariant === "minimal" ? primaryColor : "white",
              }}
            >
              <EditableText
                value={content.ctaText}
                onChange={(v) => updateContent("ctaText", v)}
                className={styleVariant === "minimal" ? "text-inherit" : "text-white"}
              />
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className={cn(sectionSpacingClass, styleVariant === "luxury" ? "bg-[#111c2b] border-t border-white/10" : "bg-card border-t border-border", styleVariant === "minimal" ? "border-t-0" : "") }>
          <h2 className={cn("font-bold mb-4", sectionTitleClass, luxuryTextColor, styleVariant === "minimal" ? "text-left" : "text-center")} style={{ fontFamily: headingFont }}>
            About Us
          </h2>
          <EditableText
            value={content.aboutText}
            onChange={(v) => updateContent("aboutText", v)}
            as="p"
            className={cn(luxuryMutedText, sectionTextClass, styleVariant === "minimal" ? "text-left" : "text-center mx-auto")}
            style={{ fontFamily: bodyFont, fontSize: `${bodySize}px`, lineHeight }}
          />
        </div>

        {/* Services Section */}
        <div className={cn(sectionSpacingClass, styleVariant === "luxury" ? "bg-[#0d1724] border-t border-white/10" : "bg-secondary/50 border-t border-border") }>
          <h2 className={cn("font-bold mb-8", sectionTitleClass, luxuryTextColor, styleVariant === "minimal" ? "text-left" : "text-center")} style={{ fontFamily: headingFont }}>
            Our Services
          </h2>
          <div className={cn("grid grid-cols-1 gap-4 max-w-4xl", servicesGridClass, styleVariant === "minimal" ? "mx-0" : "mx-auto")}>
            {content.services.map((service, index) => (
              <div 
                key={index}
                className={cn(
                  "border p-5",
                  styleVariant === "luxury"
                    ? "bg-[#132133] border-white/10 text-left"
                    : styleVariant === "minimal"
                      ? "bg-transparent border-border text-left shadow-none rounded-none"
                      : styleVariant === "bold"
                        ? "bg-card border-primary/20 text-left rounded-2xl shadow-lg"
                        : "bg-card rounded-xl shadow-sm text-center border-border"
                )}
              >
                <div 
                  className={cn(
                    "w-10 h-10 mb-3 flex items-center justify-center font-bold shadow-sm",
                    buttonRadiusClass,
                    styleVariant === "minimal" ? "mx-0" : styleVariant === "bold" ? "mx-0" : "mx-auto"
                  )}
                  style={{ background: primaryColor }}
                >
                  <span className="text-white">{index + 1}</span>
                </div>
                <div className="mb-2">
                  <EditableText
                    value={service.title || service} // fallback if string somehow
                    onChange={(v) => {
                      const newServices = [...content.services];
                      newServices[index] = { ...newServices[index], title: v };
                      updateContent("services", newServices);
                    }}
                    className={cn("font-medium block text-lg", styleVariant === "luxury" ? "text-slate-100" : "text-foreground")}
                    style={{ fontFamily: bodyFont }}
                  />
                </div>
                <EditableText
                  value={service.description || ""}
                  onChange={(v) => {
                    const newServices = [...content.services];
                    newServices[index] = { ...newServices[index], description: v };
                    updateContent("services", newServices);
                  }}
                  className={cn("text-sm", luxuryMutedText, "block")}
                  style={{ fontFamily: bodyFont }}
                  as="p"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        {content.features && content.features.length > 0 && (
          <div className={cn(sectionSpacingClass, styleVariant === "luxury" ? "bg-[#111c2b] border-t border-white/10" : "bg-card border-t border-border") }>
            <h2 className={cn("font-bold mb-6", sectionTitleClass, luxuryTextColor, "text-center")} style={{ fontFamily: headingFont }}>
              Why Choose Us
            </h2>
            <div className={cn("max-w-3xl mx-auto flex flex-col md:flex-row gap-6 justify-center items-center flex-wrap")}>
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0" style={{ background: primaryColor }}>
                    ✓
                  </div>
                  <EditableText
                    value={feature}
                    onChange={(v) => {
                      const newFeatures = [...content.features];
                      newFeatures[index] = v;
                      updateContent("features", newFeatures);
                    }}
                    className={cn("font-medium", luxuryTextColor)}
                    style={{ fontFamily: bodyFont }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className={cn(sectionSpacingClass, styleVariant === "luxury" ? "bg-[#111c2b] text-center border-t border-white/10" : "bg-card text-center border-t border-border", styleVariant === "minimal" ? "text-left" : "text-center")}>
          <h2 className={cn("font-bold mb-4", sectionTitleClass, luxuryTextColor)} style={{ fontFamily: headingFont }}>
            Get in Touch
          </h2>
          <p className={cn("mb-6", luxuryMutedText)} style={{ fontFamily: bodyFont, fontSize: `${bodySize}px` }}>
            We'd love to hear from you. Contact us today!
          </p>
          <button 
            className={cn("px-6 py-2.5 border-2 font-medium transition-all", buttonRadiusClass)}
            style={{ 
              borderColor: primaryColor,
              color: styleVariant === "luxury" ? palette.accent : primaryColor,
              background: styleVariant === "bold" ? `${primaryColor}10` : "transparent",
            }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </motion.div>
  );
};
