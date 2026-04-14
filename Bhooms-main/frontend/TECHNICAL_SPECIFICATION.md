# Technical Specification: Rule-Based Website Generation Engine

## Executive Summary

A rule-based website generation system that creates professional, mobile-friendly websites for small businesses without using machine learning. The system uses templates, conditional logic, and business rules to generate complete website structures with sensible defaults for all optional inputs.

---

## Architecture Overview

```
User Input (Form)
    ↓
Validation & Normalization
    ↓
Template Selection (by business type)
    ↓
Content Generation (interpolation + rules)
    ↓
Style Application (typography, layout, colors)
    ↓
Generated Website Object
    ↓
React Components (Preview/Render)
```

---

## Component Specifications

### 1. Templates System (`templates.ts`)

**Purpose**: Predefined content patterns for different business types

**Exports**:
- `BusinessTemplate` interface
- `BUSINESS_TEMPLATES` object (8 templates)
- `DEFAULTS` object
- `BUSINESS_TYPES` array

**Template Structure**:
```typescript
interface BusinessTemplate {
  name: string;                    // Display name
  defaultServices: string[];       // Fallback services (3-5)
  heroTitlePattern: string;        // Pattern: "Welcome to {businessName}"
  heroSubtitlePattern: string;     // Pattern: "Your trusted {businessType}..."
  aboutPattern: string;            // Pattern: "At {businessName}, we..."
  callToActionOptions: string[];   // ["Option 1", "Option 2", ...]
  featuresPattern: string[];       // 4-5 key features
  sections: string[];              // Website sections to include
  keywordsByType: string[];        // Business-relevant keywords
}
```

**Business Types** (8 total):
1. Restaurant / Cafe
2. Home Services
3. Health & Wellness
4. Professional Services
5. Retail Store
6. Beauty & Salon
7. Fitness & Gym
8. Other (fallback)

**Default Values**:
- businessName: "My Business"
- businessType: "Professional Services"
- location: "Your City"
- services: "Service 1, Service 2, Service 3"
- phone: "(555) 000-0000"
- email: "hello@mybusiness.com"
- address: "Your Address Here"
- style: "modern"
- primaryColor: "#14B8A6"

---

### 2. Rules Engine (`rules-engine.ts`)

**Purpose**: Core generation logic applying business rules and templates

**Main Function**: `generateWebsite(input: BusinessInput): GeneratedWebsite`

**Process Flow**:

```typescript
1. Input Validation
   └─ validateAndNormalizeInput(input)
      └─ Returns: Normalized input with defaults filled

2. Template Selection
   └─ BUSINESS_TEMPLATES[businessType]
      └─ Returns: Template for business type

3. Content Generation
   ├─ interpolateTemplate(pattern, data)
   ├─ parseServices(string, type)
   ├─ selectCTA(businessType)
   └─ Returns: Interpolated content

4. Style Application
   ├─ getStyleRules(style)
   ├─ generateColorScheme(primaryColor, style)
   └─ Returns: Design specifications

5. Output Assembly
   └─ GeneratedWebsite object with all components
```

**Key Functions**:

#### `generateWebsite(input: BusinessInput): GeneratedWebsite`
Main generation function. Orchestrates all components.

**Input**: BusinessInput (all optional)
```typescript
{
  businessName?: string;
  businessType?: string;
  location?: string;
  services?: string;
  phone?: string;
  email?: string;
  address?: string;
  whatsapp?: boolean;
  style?: "modern" | "minimal" | "luxury" | "bold";
  primaryColor?: string;
}
```

**Output**: GeneratedWebsite
```typescript
{
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  services: string[];              // Max 6
  callToAction: string;            // Business-type specific
  features: string[];              // From template
  sections: string[];              // From template
  colorScheme: ColorScheme;
  typography: Typography;
  layout: Layout;
}
```

#### `validateAndNormalizeInput(input: Partial<BusinessInput>): BusinessInput`
Fills missing values with sensible defaults.
- Trims all string inputs
- Sets default values for missing fields
- Returns complete, normalized input object

#### `interpolateTemplate(template: string, data: Record<string, string>): string`
Replaces placeholders in template strings.

**Placeholders**:
- `{businessName}`
- `{businessType}`
- `{location}`

**Example**:
```typescript
interpolateTemplate(
  "Welcome to {businessName} in {location}",
  { businessName: "Sunny's Cafe", location: "Austin" }
)
// Returns: "Welcome to Sunny's Cafe in Austin"
```

#### `parseServices(servicesString: string, businessType: string): string[]`
Parses and validates services list.

**Rules**:
- Split by comma
- Trim whitespace
- Filter empty strings
- Limit to 6 services
- Use template defaults if empty

#### `selectCTA(businessType: string): string`
Selects business-appropriate call-to-action.

**Mapping**:
- Restaurant: "Reserve a Table"
- Home Services: "Get Free Estimate"
- Health & Wellness: "Book Appointment"
- Professional Services: "Start Consultation"
- Retail: "Shop Now"
- Beauty & Salon: "Book Appointment"
- Fitness & Gym: "Join Now"
- Other: "Contact Us"

#### `getStyleRules(style: string): { layout: Layout; typography: Typography }`
Returns design rules based on style preference.

**Styles and Rules**:

**Modern**:
- Layout: comfortable spacing, rounded borders, subtle shadow
- Typography: Inter sans-serif, 36px/16px, 1.6 line height

**Minimal**:
- Layout: spacious, sharp corners, no shadow
- Typography: Helvetica, 32px/15px, 1.8 line height

**Luxury**:
- Layout: spacious, rounded borders, pronounced shadow
- Typography: Georgia serif headings, Lato body, 42px/17px, 1.7 line height

**Bold**:
- Layout: comfortable, soft borders, subtle shadow
- Typography: Montserrat/Open Sans, 40px/16px, 1.6 line height

#### `generateColorScheme(primaryColor: string, style: string): ColorScheme`
Generates complementary colors based on style.

**Output Schema**:
```typescript
{
  primary: string;      // User-provided or default
  secondary: string;    // Complementary
  accent: string;       // Highlight color
  background: string;   // Page background
  text: string;         // Text color
}
```

---

### 3. Content Helpers (`content-helpers.ts`)

**Purpose**: Utility functions for content generation

**Functions**:

| Function | Input | Output | Purpose |
|----------|-------|--------|---------|
| `generateMetaDescription()` | businessName, type, location | string | SEO meta description |
| `generatePageTitle()` | businessName, type | string | Page title tag |
| `formatPhoneNumber()` | phone string | formatted string | Phone number formatting |
| `isValidEmail()` | email string | boolean | Email validation |
| `generateWhatsAppLink()` | phone, message? | URL string | WhatsApp integration |
| `generateGoogleMapsLink()` | address, name | URL string | Maps integration |
| `generateTestimonial()` | businessType | testimonial string | Type-appropriate testimonial |
| `generateFAQ()` | businessType | FAQ[] | Business-type FAQs (2-3 per type) |
| `generateBusinessHours()` | none | hours object | Standard business hours |
| `getHeroImageSuggestion()` | businessType | suggestion string | Image guidance |

---

## Data Models

### GeneratedWebsite
```typescript
interface GeneratedWebsite {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  services: string[];
  callToAction: string;
  features: string[];
  sections: string[];
  colorScheme: ColorScheme;
  typography: Typography;
  layout: Layout;
}
```

### ColorScheme
```typescript
interface ColorScheme {
  primary: string;      // Main brand color
  secondary: string;    // Supporting color
  accent: string;       // Highlight/CTA color
  background: string;   // Page background
  text: string;         // Primary text color
}
```

### Typography
```typescript
interface Typography {
  headingFont: string;  // CSS font-family
  bodyFont: string;     // CSS font-family
  headingSize: number;  // px
  bodySize: number;     // px
  lineHeight: number;   // unitless (e.g., 1.6)
}
```

### Layout
```typescript
interface Layout {
  spacing: "compact" | "comfortable" | "spacious";
  borderRadius: "sharp" | "rounded" | "soft";
  shadow: "none" | "subtle" | "pronounced";
}
```

---

## Business Logic Rules

### Rule 1: Service List Management
```
IF services provided:
  SPLIT by ","
  TRIM each
  FILTER empty
  LIMIT to 6
ELSE:
  USE template defaults
END
```

### Rule 2: Content Interpolation
```
FOR each template pattern:
  REPLACE {businessName} with businessName
  REPLACE {businessType} with businessType
  REPLACE {location} with location
END
```

### Rule 3: CTA Selection
```
GET callToActionOptions[] from template
SELECT first option
IF none available:
  DEFAULT to "Contact Us"
END
```

### Rule 4: Color Scheme Generation
```
FOR each style:
  DEFINE predefined palette with primary/secondary/accent colors
  SUBSTITUTE primary color with user input
  RETURN complete palette
END
```

### Rule 5: Default Fallback
```
FOR each input parameter:
  IF parameter is null/undefined/empty:
    USE appropriate default value
  ELSE:
    USE parameter value
END
```

---

## Integration Points

### In Loading.tsx
```typescript
// Generate website when entering loading screen
const normalizedInput = validateAndNormalizeInput(formData || {});
const generatedWebsite = generateWebsite(normalizedInput);

// Pass to preview via navigation state
navigate("/preview", {
  state: {
    formData,
    generatedWebsite,
  },
});
```

### In Preview.tsx
```typescript
// Use generated website data
const generatedWebsite = location.state?.generatedWebsite;

const [websiteContent, setWebsiteContent] = useState({
  heroTitle: generatedWebsite?.heroTitle || defaultTitle,
  heroSubtitle: generatedWebsite?.heroSubtitle || defaultSubtitle,
  aboutText: generatedWebsite?.aboutText || defaultAbout,
  services: generatedWebsite?.services || [],
  ctaText: generatedWebsite?.callToAction || "Contact Us",
});
```

---

## Validation & Error Handling

### Input Validation Rules
1. String inputs trimmed of whitespace
2. Service count limited to 6 maximum
3. Phone numbers passed as-is (no validation)
4. Email passed as-is (no validation)
5. Style validated against allowed values
6. Color assumed valid hex format

### Fallback Behavior
- Missing businessType → "Professional Services"
- Missing location → "Your City"
- Missing style → "modern"
- Missing primaryColor → "#14B8A6"
- Empty services → Template defaults
- Invalid template → "Other" template used

---

## Performance Characteristics

| Operation | Time | Notes |
|-----------|------|-------|
| generateWebsite() | < 1ms | Pure logic, no I/O |
| validateAndNormalizeInput() | < 1ms | String operations |
| interpolateTemplate() | < 1ms per pattern | Regex replacement |
| parseServices() | < 1ms | String split/filter |
| getStyleRules() | < 1ms | Object lookup |
| generateColorScheme() | < 1ms | Object selection |

**Total Generation Time**: ~5-10ms for complete website

---

## Future Enhancements

### Phase 2: Advanced Features
- [ ] Multiple color scheme variants
- [ ] Custom font pairings
- [ ] Dynamic service icons
- [ ] SEO optimization (meta tags, structured data)
- [ ] Analytics tracking setup

### Phase 3: Business Logic Expansion
- [ ] Industry-specific FAQ templates
- [ ] Pricing templates by type
- [ ] Team member showcases
- [ ] Portfolio/project templates
- [ ] Booking system integration

### Phase 4: Content Personalization
- [ ] A/B testing variants
- [ ] User preference learning
- [ ] Multi-language support
- [ ] Regional customization

---

## Dependencies

- React 18+
- React Router v6+
- TypeScript 4.5+
- Framer Motion (for animations)
- No external API calls required
- No machine learning libraries

---

## File Structure
```
src/
├── lib/
│   ├── templates.ts           # Business templates (2.5 KB)
│   ├── rules-engine.ts        # Generation engine (4 KB)
│   ├── content-helpers.ts     # Utility functions (3 KB)
│   └── USAGE_EXAMPLES.ts      # Documentation examples (5 KB)
├── pages/
│   ├── Create.tsx             # User form
│   ├── Loading.tsx            # Uses engine for generation
│   └── Preview.tsx            # Uses engine output
└── components/
    └── WebsitePreviewFrame.tsx # Renders generated content
```

---

## Testing Strategy

### Unit Tests
- [ ] Template interpolation accuracy
- [ ] Service parsing edge cases
- [ ] Color scheme generation
- [ ] Typography rule application
- [ ] Default fallback behavior

### Integration Tests
- [ ] Full workflow from input to output
- [ ] React component integration
- [ ] State management flow
- [ ] Navigation with generated data

---

## Conclusion

The rule-based website generation engine provides a fast, deterministic system for creating professional websites without machine learning. All parameters are optional with sensible defaults, enabling both minimal and comprehensive inputs to produce complete, functional website designs.

