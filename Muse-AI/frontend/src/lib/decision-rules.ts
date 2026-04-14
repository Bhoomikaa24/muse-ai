/**
 * Decision Rules Engine
 * Applies business logic rules based on business type, tone, and content constraints
 */

/**
 * Business Type Keywords - Used for tone-appropriate wording
 */
export const BUSINESS_TYPE_KEYWORDS = {
  salon: {
    keywords: ["beauty", "care", "style", "elegant", "pampering", "professional"],
    tone_descriptors: {
      luxury: "Indulge in premium beauty and personal care services",
      modern: "Get styled and refreshed with expert care",
      minimal: "Beauty and care done right",
      simple: "Beauty services you can trust",
    },
  },
  restaurant: {
    keywords: ["cuisine", "taste", "fresh", "flavor", "delight", "culinary"],
    tone_descriptors: {
      luxury: "Experience exquisite cuisine and fine dining",
      modern: "Discover fresh flavors and modern cuisine",
      minimal: "Good food, simply prepared",
      simple: "Great food, great taste",
    },
  },
  hotel: {
    keywords: ["comfort", "stay", "hospitality", "relaxation", "service", "experience"],
    tone_descriptors: {
      luxury: "Experience luxurious comfort and exceptional hospitality",
      modern: "Modern comfort meets attentive service",
      minimal: "Comfortable stays, quality service",
      simple: "A comfortable place to stay",
    },
  },
  clinic: {
    keywords: ["care", "trust", "health", "professional", "expertise", "wellness"],
    tone_descriptors: {
      luxury: "Premium healthcare with compassionate expertise",
      modern: "Professional healthcare with modern approaches",
      minimal: "Quality care, simply delivered",
      simple: "Professional care you can trust",
    },
  },
};

/**
 * Apply Tone-Based Wording
 */
export function applyToneToText(
  baseText: string,
  businessType: string,
  tone: string
): string {
  const typeKeywords = BUSINESS_TYPE_KEYWORDS[businessType as keyof typeof BUSINESS_TYPE_KEYWORDS];

  if (!typeKeywords) {
    return baseText;
  }

  const descriptor = typeKeywords.tone_descriptors[tone as keyof typeof typeKeywords.tone_descriptors];

  if (descriptor && baseText.length > 0) {
    // Replace generic intro with tone-specific descriptor
    if (baseText.includes("professional service") || baseText.includes("quality service")) {
      return baseText.replace(/professional service|quality service/i, descriptor);
    }
  }

  return baseText;
}

/**
 * Content Length Validators
 */
export const CONTENT_LIMITS = {
  headline: 12,       // max words
  paragraph: 3,       // max lines
  description: 1,     // max sentences
};

/**
 * Validate Headline Length
 */
export function validateHeadlineLength(text: string): string {
  const words = text.split(/\s+/).filter(w => w.length > 0);

  if (words.length > CONTENT_LIMITS.headline) {
    return words.slice(0, CONTENT_LIMITS.headline).join(" ") + "...";
  }

  return text;
}

/**
 * Validate Paragraph Length
 */
export function validateParagraphLength(text: string): string {
  const lines = text.split("\n").filter(l => l.trim().length > 0);

  if (lines.length > CONTENT_LIMITS.paragraph) {
    return lines.slice(0, CONTENT_LIMITS.paragraph).join("\n");
  }

  return text;
}

/**
 * Validate Service Description Length
 */
export function validateServiceDescription(text: string): string {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

  if (sentences.length > CONTENT_LIMITS.description) {
    return sentences[0].trim() + ".";
  }

  return text.endsWith(".") ? text : text + ".";
}

/**
 * Apply Local Relevance - Add city mention if not present
 */
export function applyLocalRelevance(text: string, location: string): string {
  if (!location || location === "Your City") {
    return text;
  }

  // If location is already mentioned, return as is
  if (text.toLowerCase().includes(location.toLowerCase())) {
    return text;
  }

  // Add location mention naturally
  const words = text.split(" ");
  const midpoint = Math.floor(words.length / 2);

  if (words.length > 5) {
    words.splice(midpoint, 0, `in ${location.split(",")[0]}`);
    return words.join(" ");
  }

  return text;
}

/**
 * Get Business Type Category
 */
export function getBusinessTypeCategory(
  businessType: string
): "salon" | "restaurant" | "hotel" | "clinic" | "other" {
  const lowercased = businessType.toLowerCase();

  if (lowercased.includes("salon") || lowercased.includes("beauty")) return "salon";
  if (lowercased.includes("restaurant") || lowercased.includes("cafe")) return "restaurant";
  if (lowercased.includes("hotel") || lowercased.includes("accommodation")) return "hotel";
  if (lowercased.includes("clinic") || lowercased.includes("health")) return "clinic";

  return "other";
}

/**
 * Enhanced CTA Selection with Decision Rules
 */
export function selectCTAByDecisionRules(
  businessType: string,
  tone: string = "simple"
): string {
  const category = getBusinessTypeCategory(businessType);

  const ctas: Record<string, Record<string, string>> = {
    salon: {
      luxury: "Reserve Your Appointment",
      modern: "Book Now",
      minimal: "Book",
      simple: "Book Appointment",
    },
    restaurant: {
      luxury: "Reserve Your Table",
      modern: "View Menu",
      minimal: "Menu",
      simple: "View Menu",
    },
    hotel: {
      luxury: "Reserve Your Stay",
      modern: "Check Availability",
      minimal: "Check Availability",
      simple: "Book Now",
    },
    clinic: {
      luxury: "Schedule Consultation",
      modern: "Book Consultation",
      minimal: "Book Now",
      simple: "Book Consultation",
    },
    other: {
      luxury: "Get in Touch",
      modern: "Contact Us",
      minimal: "Contact",
      simple: "Contact Us",
    },
  };

  return ctas[category][tone as keyof typeof ctas.salon] || "Contact Us";
}

/**
 * Apply All Decision Rules
 */
export interface ContentRules {
  businessType: string;
  location: string;
  tone: string;
}

export function applyDecisionRules(
  content: {
    heroTitle?: string;
    heroSubtitle?: string;
    aboutText?: string;
    services?: string[];
    callToAction?: string;
  },
  rules: ContentRules
): typeof content {
  const { businessType, location, tone } = rules;

  return {
    heroTitle: content.heroTitle
      ? validateHeadlineLength(
          applyLocalRelevance(content.heroTitle, location)
        )
      : undefined,

    heroSubtitle: content.heroSubtitle
      ? validateParagraphLength(
          applyToneToText(content.heroSubtitle, businessType, tone)
        )
      : undefined,

    aboutText: content.aboutText
      ? validateParagraphLength(
          applyToneToText(
            applyLocalRelevance(content.aboutText, location),
            businessType,
            tone
          )
        )
      : undefined,

    services: content.services
      ? content.services.map(s => validateServiceDescription(s))
      : undefined,

    callToAction: selectCTAByDecisionRules(businessType, tone),
  };
}

/**
 * Validate Content Against Rules
 */
export function validateContentAgainstRules(
  content: string,
  type: "headline" | "paragraph" | "description"
): { valid: boolean; violations: string[] } {
  const violations: string[] = [];

  if (type === "headline") {
    const words = content.split(/\s+/).length;
    if (words > CONTENT_LIMITS.headline) {
      violations.push(`Headline exceeds ${CONTENT_LIMITS.headline} words (has ${words})`);
    }
  }

  if (type === "paragraph") {
    const lines = content.split("\n").length;
    if (lines > CONTENT_LIMITS.paragraph) {
      violations.push(`Paragraph exceeds ${CONTENT_LIMITS.paragraph} lines (has ${lines})`);
    }
  }

  if (type === "description") {
    const sentences = content.split(/[.!?]+/).length;
    if (sentences > CONTENT_LIMITS.description) {
      violations.push(`Description exceeds ${CONTENT_LIMITS.description} sentence (has ${sentences})`);
    }
  }

  return {
    valid: violations.length === 0,
    violations,
  };
}

/**
 * OUTPUT FORMAT RULE (CRITICAL)
 * Ensures all website output is structured JSON only
 * No explanations, comments, markdown, or HTML in output
 */
export const OUTPUT_FORMAT_RULES = {
  mustBeJSON: true,
  noMarkdown: true,
  noHTML: true,
  noCSS: true,
  noExplanations: true,
  noComments: true,
  structureRequired: {
    meta: ["business_name", "business_type", "location", "tone", "primary_color", "secondary_color"],
    sections: ["type", "headline", "subtext", "cta", "content", "items", "points", "phone", "email", "address"],
  },
} as const;

/**
 * Validate Output Format
 * Ensures generated website output conforms to JSON-only format rules
 */
export function validateOutputFormat(output: any): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check if output is valid JSON
  if (typeof output !== "object" || output === null) {
    errors.push("Output must be a valid JSON object");
    return { valid: false, errors };
  }

  // Validate meta structure
  if (!output.meta) {
    errors.push("Output must contain 'meta' object");
  } else {
    const requiredMetaFields = OUTPUT_FORMAT_RULES.structureRequired.meta;
    requiredMetaFields.forEach(field => {
      if (!(field in output.meta)) {
        errors.push(`Meta must contain '${field}' field`);
      }
    });
  }

  // Validate sections structure
  if (!Array.isArray(output.sections)) {
    errors.push("Output must contain 'sections' array");
  } else {
    output.sections.forEach((section, index) => {
      if (!section.type) {
        errors.push(`Section ${index} missing 'type' field`);
      }
      
      // Ensure section has no markdown, HTML, or CSS
      const sectionString = JSON.stringify(section);
      if (sectionString.includes("```") || sectionString.includes("###")) {
        errors.push(`Section ${index} contains markdown`);
      }
      if (sectionString.includes("<") || sectionString.includes(">")) {
        errors.push(`Section ${index} contains HTML`);
      }
    });
  }

  // Ensure no extraneous content outside meta/sections
  const allowedTopLevelKeys = ["meta", "sections"];
  Object.keys(output).forEach(key => {
    if (!allowedTopLevelKeys.includes(key)) {
      errors.push(`Unexpected top-level key: '${key}'. Only 'meta' and 'sections' allowed`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Enforce Output Format
 * Strips any non-JSON content and ensures clean structure
 */
export function enforceOutputFormat(output: any): any {
  if (typeof output !== "object" || output === null) {
    throw new Error("Output must be a JSON object");
  }

  // Clean output to only contain meta and sections
  const cleanOutput = {
    meta: output.meta || {},
    sections: Array.isArray(output.sections) ? output.sections : [],
  };

  // Validate the clean output
  const validation = validateOutputFormat(cleanOutput);
  if (!validation.valid) {
    console.error("Output format violations:", validation.errors);
    throw new Error(`Output format invalid: ${validation.errors.join("; ")}`);
  }

  return cleanOutput;
}
