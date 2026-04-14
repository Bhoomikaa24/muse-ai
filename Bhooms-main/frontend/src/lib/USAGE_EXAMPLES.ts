/**
 * Usage Examples - Rule-Based Website Generation
 * 
 * This file demonstrates how to use the rule-based website generation system
 */

import { generateWebsite, validateAndNormalizeInput } from "@/lib/rules-engine";
import {
  generateMetaDescription,
  generatePageTitle,
  formatPhoneNumber,
  generateFAQ,
} from "@/lib/content-helpers";

// ============================================================================
// EXAMPLE 1: Minimal Input (Using Defaults)
// ============================================================================

const minimalInput = {
  businessName: "Sarah's Salon",
};

const result1 = generateWebsite(validateAndNormalizeInput(minimalInput));
console.log("Example 1 - Minimal Input:");
console.log("Business Name:", result1.meta.business_name);
// Output: "Sarah's Salon"
console.log("Hero Headline:", result1.sections.find(s => s.type === "hero")?.headline);
// Output: "Beautiful You at Sarah's Salon"
console.log("Services:", result1.sections.find(s => s.type === "services")?.items?.map(i => i.title));
// Output: ["Haircut", "Styling", "Coloring", "Treatments", "Manicure"]
console.log("CTA:", result1.sections.find(s => s.type === "hero")?.cta);
// Output: "Book Appointment"

// ============================================================================
// EXAMPLE 2: Complete Restaurant Input
// ============================================================================

const restaurantInput = {
  businessName: "Bella Italia",
  businessType: "Restaurant / Cafe",
  location: "San Francisco, CA",
  services: "Italian Pasta, Wood-fired Pizza, Seafood, Desserts, Wine Selection",
  phone: "(415) 555-0123",
  email: "reservations@bellaitalia.com",
  address: "123 Mission Street, San Francisco, CA 94103",
  whatsapp: true,
  style: "luxury" as const,
  primaryColor: "#C41E3A", // Italian red
};

const result2 = generateWebsite(validateAndNormalizeInput(restaurantInput));
console.log("\nExample 2 - Complete Restaurant:");
console.log("Hero Title:", result2.sections.find(s => s.type === "hero")?.headline);
// Output: "Welcome to Bella Italia"
console.log("Hero Subtitle:", result2.sections.find(s => s.type === "hero")?.subtext);
// Output: "Experience exceptional cuisine at Bella Italia in San Francisco, CA..."
console.log("Services:", result2.sections.find(s => s.type === "services")?.items?.map(i => i.title));
// Output: ["Italian Pasta", "Wood-fired Pizza", "Seafood", "Desserts", "Wine Selection"]
console.log("CTA:", result2.sections.find(s => s.type === "hero")?.cta);
// Output: "Reserve a Table"
console.log("Primary Color:", result2.meta.primary_color);
// Output: "#C41E3A"
console.log("Tone:", result2.meta.tone);
// Output: "luxury"

// ============================================================================
// EXAMPLE 3: Home Services with Modern Style
// ============================================================================

const homeServicesInput = {
  businessName: "ProFix Solutions",
  businessType: "Home Services",
  location: "Austin, TX",
  services: "Plumbing, Electrical, HVAC, Carpentry",
  style: "modern" as const,
  primaryColor: "#0ea5e9", // Sky blue
};

const result3 = generateWebsite(validateAndNormalizeInput(homeServicesInput));
console.log("\nExample 3 - Home Services (Modern):");
console.log("About Text:", result3.sections.find(s => s.type === "about")?.content);
// Output: "We provide reliable, professional home services..."
console.log("Why Us Points:", result3.sections.find(s => s.type === "why_us")?.points);
// Output: ["Licensed and insured professionals", "Quick response times", ...]
console.log("Primary Color:", result3.meta.primary_color);
// Output: "#0ea5e9"
console.log("Secondary Color:", result3.meta.secondary_color);
// Output: (Generated secondary color)

// ============================================================================
// EXAMPLE 4: Health & Wellness with Minimal Style
// ============================================================================

const wellnessInput = {
  businessName: "Zen Wellness Center",
  businessType: "Health & Wellness",
  location: "Portland, OR",
  services: "Yoga Classes, Massage Therapy, Meditation, Nutrition Coaching",
  style: "minimal" as const,
};

const result4 = generateWebsite(validateAndNormalizeInput(wellnessInput));
console.log("\nExample 4 - Health & Wellness (Minimal):");
console.log("Tone:", result4.meta.tone);
// Output: "simple"
console.log("Style:", result4.meta.business_type);
// Output: Health & Wellness

// ============================================================================
// EXAMPLE 5: Retail Store with Bold Style
// ============================================================================

const retailInput = {
  businessName: "Urban Threads",
  businessType: "Retail Store",
  location: "New York, NY",
  services: "Clothing, Accessories, Footwear, Vintage Pieces",
  style: "bold" as const,
  primaryColor: "#ef4444", // Red
};

const result5 = generateWebsite(validateAndNormalizeInput(retailInput));
console.log("\nExample 5 - Retail Store (Bold):");
console.log("CTA:", result5.sections.find(s => s.type === "hero")?.cta);
// Output: "Shop Now"
console.log("Section Types:", result5.sections.map(s => s.type));
// Output: ["hero", "about", "services", "why_us", "contact"]

// ============================================================================
// EXAMPLE 6: Using Content Helpers
// ============================================================================

const businessName = "Sunny's Bakery";
const businessType = "Restaurant / Cafe";
const location = "Denver, CO";

const metaDescription = generateMetaDescription(businessName, businessType, location);
console.log("\nExample 6 - Content Helpers:");
console.log("Meta Description:", metaDescription);
// Output: "Discover Sunny's Bakery, your trusted restaurant/cafe in Denver, CO..."

const pageTitle = generatePageTitle(businessName, businessType);
console.log("Page Title:", pageTitle);
// Output: "Sunny's Bakery - Restaurant / Cafe"

const faqs = generateFAQ(businessType);
console.log("Generated FAQs:", faqs.length);
// Output: 2 FAQs specific to restaurants

// ============================================================================
// EXAMPLE 7: Default Fallback Flow
// ============================================================================

const incompleteInput = {
  businessName: "Tech Startup",
  // businessType not provided - will use "Professional Services"
  // location not provided - will use "Your City"
  // style not provided - will use "modern"
};

const result7 = generateWebsite(validateAndNormalizeInput(incompleteInput));
console.log("\nExample 7 - Automatic Defaults:");
console.log("Business Type Used:", result7.meta.business_type);
console.log("Location Used:", result7.meta.location);
console.log("Tone Used:", result7.meta.tone);
console.log("Primary Color:", result7.meta.primary_color);
// Output: Modern default colors

// ============================================================================
// EXAMPLE 8: Integration with React Component
// ============================================================================

/*
// In a React component:
import { generateWebsite, validateAndNormalizeInput } from "@/lib/rules-engine";

function PreviewPage() {
  const formData = location.state?.formData;
  const generatedWebsite = location.state?.generatedWebsite;
  
  // If not already generated, generate it:
  const website = generatedWebsite || 
    generateWebsite(validateAndNormalizeInput(formData || {}));
  
  return (
    <div style={{ 
      color: website.meta.business_type,
      backgroundColor: website.meta.primary_color,
      padding: "2rem",
    }}>
      <h1>{website.sections.find(s => s.type === "hero")?.headline}</h1>
      <p>{website.sections.find(s => s.type === "hero")?.subtext}</p>
      
      <section>
        <h2>About</h2>
        <p>{website.sections.find(s => s.type === "about")?.content}</p>
      </section>
      
      <section>
        <h2>Services</h2>
        <ul>
          {website.sections.find(s => s.type === "services")?.items?.map(service => (
            <li key={service.title}>{service.title}</li>
          ))}
        </ul>
      </section>
      
      <button style={{ backgroundColor: website.meta.primary_color }}>
        {website.sections.find(s => s.type === "hero")?.cta}
      </button>
    </div>
  );
}
*/

// ============================================================================
// KEY TAKEAWAYS
// ============================================================================

/*

1. FLEXIBILITY
   - All parameters are optional
   - Missing values automatically filled with appropriate defaults
   - Works with minimal input (just business name) or complete input

2. BUSINESS TYPE AFFECTS
   - Hero title and subtitle patterns
   - Default services list
   - About section tone
   - Available CTAs
   - Website sections included
   - Appropriate features highlighted

3. STYLE AFFECTS
   - Spacing (compact, comfortable, spacious)
   - Border radius (sharp, rounded, soft)
   - Shadows (none, subtle, pronounced)
   - Typography (font family, sizes, line height)
   - Color scheme (different palettes per style)

4. NO EXTERNAL DEPENDENCIES
   - Pure rule-based logic
   - No API calls needed
   - No machine learning
   - Instant generation
   - Deterministic output

5. SENSIBLE DEFAULTS
   - Every field has a meaningful default
   - Business type defaults to "Professional Services"
   - Location defaults to "Your City"
   - Style defaults to "modern"
   - Color defaults to teal (#14B8A6)
   - Phone defaults to generic placeholder
   - Email follows pattern: hello@mybusiness.com

*/

export {};
