/**
 * Output Format Validation Test
 * Verifies that generated websites match the REQUIRED OUTPUT STRUCTURE exactly
 */

import { generateWebsite } from "./rules-engine";

// REQUIRED OUTPUT STRUCTURE (Template)
export const REQUIRED_OUTPUT_TEMPLATE = {
  meta: {
    business_name: "",
    business_type: "",
    location: "",
    tone: "",
    primary_color: "",
    secondary_color: "",
  },
  sections: [
    {
      type: "hero",
      headline: "",
      subtext: "",
      cta: "",
    },
    {
      type: "about",
      content: "",
    },
    {
      type: "services",
      items: [
        {
          title: "",
          description: "",
        },
      ],
    },
    {
      type: "why_us",
      points: [],
    },
    {
      type: "contact",
      phone: "",
      email: "",
      address: "",
    },
  ],
};

/**
 * Validate that output matches required structure
 */
export function validateOutputStructure(output: any): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check meta object
  if (!output.meta) {
    errors.push("Missing 'meta' object");
    return { valid: false, errors };
  }

  const requiredMetaFields = [
    "business_name",
    "business_type",
    "location",
    "tone",
    "primary_color",
    "secondary_color",
  ];

  requiredMetaFields.forEach(field => {
    if (!(field in output.meta)) {
      errors.push(`Meta missing required field: '${field}'`);
    }
  });

  // Check sections array
  if (!Array.isArray(output.sections)) {
    errors.push("'sections' must be an array");
    return { valid: false, errors };
  }

  const requiredSectionTypes = ["hero", "about", "services", "why_us", "contact"];
  const foundTypes = output.sections.map(s => s.type);

  requiredSectionTypes.forEach(type => {
    if (!foundTypes.includes(type)) {
      errors.push(`Missing required section type: '${type}'`);
    }
  });

  // Validate specific section structures
  const heroSection = output.sections.find(s => s.type === "hero");
  if (heroSection) {
    const requiredHeroFields = ["headline", "subtext", "cta"];
    requiredHeroFields.forEach(field => {
      if (!(field in heroSection)) {
        errors.push(`Hero section missing required field: '${field}'`);
      }
    });
  }

  const aboutSection = output.sections.find(s => s.type === "about");
  if (aboutSection && !("content" in aboutSection)) {
    errors.push("About section missing required field: 'content'");
  }

  const servicesSection = output.sections.find(s => s.type === "services");
  if (servicesSection) {
    if (!Array.isArray(servicesSection.items)) {
      errors.push("Services section 'items' must be an array");
    } else {
      servicesSection.items.forEach((item, idx) => {
        if (!("title" in item)) {
          errors.push(`Service item ${idx} missing 'title'`);
        }
        if (!("description" in item)) {
          errors.push(`Service item ${idx} missing 'description'`);
        }
      });
    }
  }

  const whyUsSection = output.sections.find(s => s.type === "why_us");
  if (whyUsSection) {
    if (!Array.isArray(whyUsSection.points)) {
      errors.push("Why Us section 'points' must be an array");
    }
  }

  const contactSection = output.sections.find(s => s.type === "contact");
  if (contactSection) {
    const requiredContactFields = ["phone", "email", "address"];
    requiredContactFields.forEach(field => {
      if (!(field in contactSection)) {
        errors.push(`Contact section missing required field: '${field}'`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Test: Verify structure matches for clinic example
 */
export function testClinicOutput() {
  const output = generateWebsite({
    businessName: "Gentle Care Clinic",
    businessType: "clinic",
    location: "Seattle",
    phone: "+1-206-555-0100",
    email: "info@gentlecareclinic.com",
    address: "Seattle, WA",
    tone: "modern",
  });

  const validation = validateOutputStructure(output);

  if (!validation.valid) {
    console.error("❌ Clinic output validation failed:");
    validation.errors.forEach(err => console.error(`  - ${err}`));
    return false;
  }

  console.log("✅ Clinic output matches REQUIRED OUTPUT STRUCTURE");
  console.log(`   Meta: ${JSON.stringify(output.meta)}`);
  console.log(`   Sections: ${output.sections.map(s => s.type).join(", ")}`);
  return true;
}

/**
 * Test: Verify structure matches for restaurant example
 */
export function testRestaurantOutput() {
  const output = generateWebsite({
    businessName: "Taste of Italy",
    businessType: "restaurant",
    location: "New York",
    phone: "+1-212-555-0100",
    email: "info@tasteofitaly.com",
    address: "New York, NY",
    tone: "luxury",
  });

  const validation = validateOutputStructure(output);

  if (!validation.valid) {
    console.error("❌ Restaurant output validation failed:");
    validation.errors.forEach(err => console.error(`  - ${err}`));
    return false;
  }

  console.log("✅ Restaurant output matches REQUIRED OUTPUT STRUCTURE");
  console.log(`   Meta: ${JSON.stringify(output.meta)}`);
  console.log(`   Sections: ${output.sections.map(s => s.type).join(", ")}`);
  return true;
}

/**
 * Test: Verify deterministic output (same input = same output)
 */
export function testDeterministicOutput() {
  const input = {
    businessName: "Test Salon",
    businessType: "salon",
    location: "Los Angeles",
    tone: "modern" as const,
  };

  const output1 = generateWebsite(input);
  const output2 = generateWebsite(input);

  const json1 = JSON.stringify(output1);
  const json2 = JSON.stringify(output2);

  if (json1 !== json2) {
    console.error("❌ Output is NOT deterministic - same input produced different output");
    return false;
  }

  console.log("✅ Output is deterministic - same input produces identical output");
  return true;
}
