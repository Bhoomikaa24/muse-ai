/**
 * Rule-Based Website Generation Engine
 * Applies business rules, style preferences, and tone to templates
 */

import { BUSINESS_TEMPLATES } from "./templates";
import {
  applyDecisionRules,
  selectCTAByDecisionRules,
  getBusinessTypeCategory,
  applyToneToText,
  enforceOutputFormat,
  validateOutputFormat,
} from "./decision-rules";

export interface BusinessInput {
  businessName?: string;
  businessType?: string;
  location?: string;
  services?: string;
  phone?: string;
  email?: string;
  address?: string;
  whatsapp?: boolean;
  style?: "modern" | "minimal" | "luxury" | "bold";
  tone?: "luxury" | "modern" | "minimal" | "simple";
  primaryColor?: string;
}

export interface GeneratedWebsite {
  meta: {
    business_name: string;
    business_type: string;
    location: string;
    tone: string;
    style?: string;
    primary_color: string;
    secondary_color: string;
    accent_color?: string;
    background_color?: string;
    text_color?: string;
    heading_font?: string;
    body_font?: string;
    heading_size?: number;
    body_size?: number;
    line_height?: number;
    layout_spacing?: Layout["spacing"];
    border_radius?: Layout["borderRadius"];
    shadow_style?: Layout["shadow"];
  };
  sections: Array<{
    type: "hero" | "about" | "services" | "why_us" | "contact";
    headline?: string;
    subtext?: string;
    cta?: string;
    content?: string;
    items?: Array<{ title: string; description: string }>;
    points?: string[];
    phone?: string;
    email?: string;
    address?: string;
    imageUrl?: string;
  }>;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface Typography {
  headingFont: string;
  bodyFont: string;
  headingSize: number;
  bodySize: number;
  lineHeight: number;
}

export interface Layout {
  spacing: "compact" | "comfortable" | "spacious";
  borderRadius: "sharp" | "rounded" | "soft";
  shadow: "none" | "subtle" | "pronounced";
}

/**
 * Apply style rules to generate design specifications
 */
function getStyleRules(style: string): { layout: Layout; typography: Typography } {
  const styleRules: Record<
    string,
    { layout: Layout; typography: Typography }
  > = {
    modern: {
      layout: { spacing: "comfortable", borderRadius: "rounded", shadow: "subtle" },
      typography: {
        headingFont: "Inter, sans-serif",
        bodyFont: "Inter, sans-serif",
        headingSize: 36,
        bodySize: 16,
        lineHeight: 1.6,
      },
    },
    minimal: {
      layout: { spacing: "spacious", borderRadius: "sharp", shadow: "none" },
      typography: {
        headingFont: "Helvetica, sans-serif",
        bodyFont: "Helvetica, sans-serif",
        headingSize: 32,
        bodySize: 15,
        lineHeight: 1.8,
      },
    },
    luxury: {
      layout: { spacing: "spacious", borderRadius: "rounded", shadow: "pronounced" },
      typography: {
        headingFont: "Georgia, serif",
        bodyFont: "Lato, sans-serif",
        headingSize: 42,
        bodySize: 17,
        lineHeight: 1.7,
      },
    },
    bold: {
      layout: { spacing: "comfortable", borderRadius: "soft", shadow: "subtle" },
      typography: {
        headingFont: "Montserrat, sans-serif",
        bodyFont: "Open Sans, sans-serif",
        headingSize: 40,
        bodySize: 16,
        lineHeight: 1.6,
      },
    },
  };

  return styleRules[style] || styleRules.modern;
}

/**
 * Generate complementary colors based on primary color
 */
function generateColorScheme(
  primaryColor: string,
  style: string
): ColorScheme {
  const colorSchemes: Record<string, ColorScheme> = {
    modern: {
      primary: primaryColor,
      secondary: "#F3F4F6",
      accent: "#EF4444",
      background: "#FFFFFF",
      text: "#1F2937",
    },
    minimal: {
      primary: primaryColor,
      secondary: "#E5E7EB",
      accent: "#6B7280",
      background: "#FAFBFC",
      text: "#111827",
    },
    luxury: {
      primary: primaryColor,
      secondary: "#D1D5DB",
      accent: "#1F2937",
      background: "#FAFAFA",
      text: "#0F172A",
    },
    bold: {
      primary: primaryColor,
      secondary: "#FCA5A5",
      accent: "#DC2626",
      background: "#FFFFFF",
      text: "#1F2937",
    },
  };

  return colorSchemes[style] || colorSchemes.modern;
}

/**
 * Select appropriate call-to-action based on business type
 */
function selectCTA(businessType: string): string {
  const template = BUSINESS_TEMPLATES[businessType];
  if (!template) return "Contact Us";
  
  // Select first CTA option, or fallback to "Contact Us"
  return template.callToActionOptions[0] || "Contact Us";
}

/**
 * Interpolate template strings with business data
 */
function interpolateTemplate(template: string, data: Record<string, string>): string {
  let result = template;
  Object.entries(data).forEach(([key, value]) => {
    result = result.replace(new RegExp(`{${key}}`, "g"), value || "");
  });
  return result;
}

/**
 * Parse services string into array
 */
function parseServices(servicesString: string, businessType: string): string[] {
  if (!servicesString?.trim()) {
    // Use template defaults if no services provided
    const template = BUSINESS_TEMPLATES[businessType];
    return template?.defaultServices || ["Service 1", "Service 2", "Service 3"];
  }

  return servicesString
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s)
    .slice(0, 6); // Limit to 6 services
}

/**
 * Main rule-based website generation engine
 */
export function generateWebsite(input: BusinessInput): GeneratedWebsite {
  // Fill in defaults for missing values
  const businessName = input.businessName?.trim() || "My Business";
  const businessType = input.businessType || "Professional Services";
  const location = input.location?.trim() || "Your City";
  const phone = input.phone?.trim() || "";
  const email = input.email?.trim() || "";
  const address = input.address?.trim() || "";
  const style = input.style || "modern";
  const tone = input.tone || "simple";
  const primaryColor = input.primaryColor || "#14B8A6";

  // Get template for business type
  const template = BUSINESS_TEMPLATES[businessType] || BUSINESS_TEMPLATES["Other"];

  // Interpolation data
  const interpolationData = {
    businessName,
    businessType,
    location,
  };

  // Generate content sections
  let heroTitle = interpolateTemplate(
    template.heroTitlePattern,
    interpolationData
  );
  let heroSubtitle = interpolateTemplate(
    template.heroSubtitlePattern,
    interpolationData
  );
  let aboutText = interpolateTemplate(
    template.aboutPattern,
    interpolationData
  );

  // Parse services
  const services = parseServices(input.services || "", businessType);

  // Select CTA with decision rules
  let callToAction = selectCTAByDecisionRules(businessType, tone);

  // Apply decision rules (tone, local relevance, content length validation)
  const ruleApplicationResult = applyDecisionRules(
    {
      heroTitle,
      heroSubtitle,
      aboutText,
      services,
      callToAction,
    },
    {
      businessType,
      location,
      tone,
    }
  );

  heroTitle = ruleApplicationResult.heroTitle || heroTitle;
  heroSubtitle = ruleApplicationResult.heroSubtitle || heroSubtitle;
  aboutText = ruleApplicationResult.aboutText || aboutText;
  callToAction = ruleApplicationResult.callToAction || callToAction;

  // Apply style rules
  const { layout, typography } = getStyleRules(style);

  // Generate color scheme
  const colorScheme = generateColorScheme(primaryColor, style);

  const result = {
    heroTitle,
    heroSubtitle,
    aboutText,
    services: ruleApplicationResult.services || services,
    callToAction,
    features: template.featuresPattern,
    sections: template.sections,
    colorScheme,
    typography,
    layout,
  };

  // ENFORCE OUTPUT FORMAT RULE: Ensure JSON-only output
  // Convert to JSON structure with meta and sections
  const jsonOutput = {
    meta: {
      business_name: businessName,
      business_type: businessType,
      location: location,
      tone: tone,
      style,
      primary_color: colorScheme.primary,
      secondary_color: colorScheme.secondary,
      accent_color: colorScheme.accent,
      background_color: colorScheme.background,
      text_color: colorScheme.text,
      heading_font: typography.headingFont,
      body_font: typography.bodyFont,
      heading_size: typography.headingSize,
      body_size: typography.bodySize,
      line_height: typography.lineHeight,
      layout_spacing: layout.spacing,
      border_radius: layout.borderRadius,
      shadow_style: layout.shadow,
    },
    sections: [
      {
        type: "hero",
        headline: result.heroTitle,
        subtext: result.heroSubtitle,
        cta: result.callToAction,
      },
      {
        type: "about",
        content: result.aboutText,
      },
      {
        type: "services",
        items: Array.isArray(result.services)
          ? result.services.map(s => ({
              title: s,
              description: "",
            }))
          : [],
      },
      {
        type: "why_us",
        points: result.features || [],
      },
      {
        type: "contact",
        phone: phone || "",
        email: email || "",
        address: address || "",
      },
    ],
  };

  // Validate output format compliance
  const validation = validateOutputFormat(jsonOutput);
  if (!validation.valid) {
    console.warn("Output format validation warnings:", validation.errors);
  }

  // Return enforced JSON format
  return enforceOutputFormat(jsonOutput);
}

/**
 * Validate and normalize business input
 */
export function validateAndNormalizeInput(input: Partial<BusinessInput>): BusinessInput {
  return {
    businessName: (input.businessName || "").trim(),
    businessType: input.businessType || "Professional Services",
    location: (input.location || "").trim(),
    services: (input.services || "").trim(),
    phone: (input.phone || "").trim(),
    email: (input.email || "").trim(),
    address: (input.address || "").trim(),
    whatsapp: input.whatsapp || false,
    style: (input.style as any) || "modern",
    tone: (input.tone as any) || "simple",
    primaryColor: input.primaryColor || "#14B8A6",
  };
}
