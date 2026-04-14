# Output Format Specification

## Overview
The website generation engine enforces **strict JSON-only output format**. All generated website content is returned as structured JSON with no markdown, HTML, CSS, or explanations.

## Critical Output Rules
```
✅ MUST: Return structured JSON only
✅ MUST: Include 'meta' and 'sections' objects
✅ MUST: No markdown, HTML, or CSS in output
✅ MUST: No explanations or comments
✅ MUST: Deterministic - same input always produces same output
```

## Output Structure

### Root Object
```typescript
{
  meta: { ... },        // Metadata about the generated website
  sections: [ ... ]     // Array of content sections
}
```

### Meta Object
Required fields that describe the generated website:
```typescript
{
  business_name: string;        // Name of the business
  business_type: string;        // Type of business (restaurant, salon, etc.)
  location: string;             // Business location/city
  tone: string;                 // Selected tone (luxury, modern, minimal, simple)
  primary_color: string;        // Primary brand color (hex)
  secondary_color: string;      // Secondary brand color (hex)
}
```

### Sections Array
Array of content sections, each with a `type` field:

#### Section: Hero
```typescript
{
  type: "hero",
  headline: string;    // Main headline (≤12 words)
  subtext: string;     // Subheading/tagline
  cta: string;         // Call-to-action button text
}
```

#### Section: About
```typescript
{
  type: "about",
  content: string;     // About/description text (≤3 lines)
}
```

#### Section: Services
```typescript
{
  type: "services",
  items: [
    {
      title: string;           // Service name
      description: string;     // Description (1 sentence max)
    }
  ]
}
```

#### Section: Why Us
```typescript
{
  type: "why_us",
  points: string[];    // Array of benefit points
}
```

#### Section: Contact
```typescript
{
  type: "contact",
  phone: string;       // Phone number
  email: string;       // Email address
  address: string;     // Physical address
}
```

## Example Output

```json
{
  "meta": {
    "business_name": "Gentle Care Clinic",
    "business_type": "clinic",
    "location": "Seattle",
    "tone": "modern",
    "primary_color": "#14B8A6",
    "secondary_color": "#10B981"
  },
  "sections": [
    {
      "type": "hero",
      "headline": "Modern Healthcare in Seattle",
      "subtext": "Professional medical care with a contemporary approach",
      "cta": "Book an Appointment"
    },
    {
      "type": "about",
      "content": "We provide comprehensive healthcare services using modern techniques and evidence-based medicine."
    },
    {
      "type": "services",
      "items": [
        {
          "title": "General Consultation",
          "description": "Expert medical consultation with professional care."
        },
        {
          "title": "Wellness Services",
          "description": "Preventive healthcare and wellness programs."
        }
      ]
    },
    {
      "type": "why_us",
      "points": [
        "Modern medical approaches",
        "Professional team of experts",
        "Patient-centered care",
        "Convenient Seattle location"
      ]
    },
    {
      "type": "contact",
      "phone": "+1-206-555-0100",
      "email": "info@gentlecareclinic.com",
      "address": "Seattle, WA"
    }
  ]
}
```

## Validation Rules

### Content Length Constraints
- **Headlines**: Maximum 12 words
- **Paragraphs**: Maximum 3 lines
- **Descriptions**: Maximum 1 sentence per service

### Format Validation
All output is validated against:
1. Valid JSON structure
2. Required `meta` and `sections` fields
3. No top-level keys other than `meta` and `sections`
4. No markdown, HTML, or CSS in any field
5. All sections have required `type` field

### Enforcement
If output fails validation:
- **Warnings** logged to console
- **Errors** throw exception with details
- Invalid sections are stripped
- Output is cleaned before returning

## Implementation

### Validation Function
```typescript
validateOutputFormat(output): {
  valid: boolean;
  errors: string[];
}
```

### Enforcement Function
```typescript
enforceOutputFormat(output): GeneratedWebsite
```

## API Usage

### Basic Generation
```typescript
import { generateWebsite } from "./lib/rules-engine";

const result = generateWebsite({
  businessName: "Gentle Care Clinic",
  businessType: "clinic",
  location: "Seattle",
  tone: "modern"
});

// Result is guaranteed to be valid JSON with meta and sections
console.log(result.meta.business_name);      // "Gentle Care Clinic"
console.log(result.sections[0].type);        // "hero"
```

## Guarantees

✅ **Deterministic**: Same input → Same output every time  
✅ **Repeatable**: No randomization or ML  
✅ **Valid JSON**: Always valid, parseable JSON  
✅ **Type Safe**: Full TypeScript support  
✅ **Backward Compatible**: Rules added without breaking existing code  
✅ **Fail Safe**: Validation prevents invalid data from escaping  

## Notes for Viva/Report

This output format rule ensures:
1. **Consistency**: Predictable JSON structure for all websites
2. **Clarity**: No ambiguous or mixed content types
3. **Reliability**: Strict validation prevents errors
4. **Reproducibility**: Deterministic generation for testing and demos
5. **Maintainability**: Clear contract between engine and consumers
