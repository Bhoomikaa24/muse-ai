# Rule-Based Website Generation Engine

A rule-based website generation system for small businesses that uses templates, conditional logic, and business rules instead of machine learning.

## System Overview

The engine automatically generates professional, mobile-friendly websites based on user input parameters. All missing inputs are replaced with sensible defaults, ensuring every website is complete and functional.

## Core Components

### 1. **Templates System** (`src/lib/templates.ts`)

Predefined website templates for 8 business types with sensible defaults:

- **Restaurant / Cafe**: Focuses on dining, menus, reservations
- **Home Services**: Emphasizes reliability, licensing, free estimates
- **Health & Wellness**: Centers on care, expertise, appointments
- **Professional Services**: Highlights expertise, strategy, results
- **Retail Store**: Features product selection, shopping, delivery
- **Beauty & Salon**: Showcases styling, atmosphere, professional staff
- **Fitness & Gym**: Focuses on equipment, trainers, community
- **Other**: General-purpose business template

Each template includes:
- Default services list
- Hero title pattern (with placeholders)
- Hero subtitle pattern
- About section pattern
- Call-to-action options
- Feature descriptions
- Website sections to include
- Business-specific keywords

### 2. **Rules Engine** (`src/lib/rules-engine.ts`)

Applies business rules and generates website content:

#### Input Parameters (all optional):
```typescript
interface BusinessInput {
  businessName?: string;        // Defaults to "My Business"
  businessType?: string;        // Defaults to "Professional Services"
  location?: string;            // Defaults to "Your City"
  services?: string;            // Defaults to template defaults
  phone?: string;               // Defaults to "(555) 000-0000"
  email?: string;               // Defaults to "hello@mybusiness.com"
  address?: string;             // Defaults to "Your Address Here"
  whatsapp?: boolean;           // Defaults to false
  style?: "modern" | "minimal" | "luxury" | "bold";  // Defaults to "modern"
  primaryColor?: string;        // Defaults to "#14B8A6" (teal)
}
```

#### Output: Generated Website
```typescript
interface GeneratedWebsite {
  heroTitle: string;              // Generated from template
  heroSubtitle: string;           // Generated from template
  aboutText: string;              // Generated from template
  services: string[];             // Parsed and validated
  callToAction: string;           // Business-type appropriate CTA
  features: string[];             // Template features
  sections: string[];             // Sections to render
  colorScheme: ColorScheme;        // Generated from style
  typography: Typography;         // Generated from style
  layout: Layout;                 // Generated from style
}
```

### 3. **Style Rules**

Style preferences automatically determine:

#### Modern
- Clean, contemporary feel with comfortable spacing
- Rounded borders and subtle shadows
- Inter sans-serif fonts at 36px heading, 16px body
- Line height: 1.6

#### Minimal
- Simple, elegant with generous spacing
- Sharp corners, no shadows
- Helvetica sans-serif at 32px heading, 15px body
- Line height: 1.8

#### Luxury
- Premium, sophisticated appearance with spacious layout
- Rounded borders and pronounced shadows
- Georgia serif for headings, Lato for body at 42px/17px
- Line height: 1.7

#### Bold
- Vibrant, eye-catching design
- Soft rounded corners with subtle shadows
- Montserrat/Open Sans at 40px/16px
- Line height: 1.6

### 4. **Content Helpers** (`src/lib/content-helpers.ts`)

Utility functions for content generation:

- `generateMetaDescription()` - SEO descriptions
- `generatePageTitle()` - Page titles
- `formatPhoneNumber()` - Phone formatting
- `isValidEmail()` - Email validation
- `generateWhatsAppLink()` - WhatsApp integration
- `generateGoogleMapsLink()` - Maps integration
- `generateTestimonial()` - Type-appropriate testimonials
- `generateFAQ()` - Business-type FAQs
- `generateBusinessHours()` - Standard business hours
- `getHeroImageSuggestion()` - Image guidance by type

## How It Works

### Step 1: User Input
User provides optional parameters through the form interface.

### Step 2: Normalization
`validateAndNormalizeInput()` fills in all missing values with sensible defaults.

### Step 3: Template Selection
System selects the appropriate template based on `businessType`.

### Step 4: Content Generation
`generateWebsite()` applies template patterns:
- Interpolates business data into patterns
- Selects business-appropriate CTA
- Generates color scheme from primary color + style
- Applies typography and layout rules

### Step 5: Output
Complete website structure with:
- Generated content
- Design specifications
- Layout configuration
- Color and typography settings

## Example Usage

### Minimal Input
```typescript
const input = {
  businessName: "Sarah's Salon"
};
// All other fields use defaults
```

### Generated Output
```
Hero Title: "Welcome to Sarah's Salon"
Hero Subtitle: "Premium beauty and salon services in Your City. Let us help you look and feel your best."
About: "Sarah's Salon is your sanctuary for beauty and wellness..."
Services: ["Haircut", "Styling", "Coloring", "Treatments", "Manicure"]
CTA: "Book Appointment"
Style: modern
Layout: comfortable spacing, rounded corners, subtle shadows
Colors: Primary teal with complementary grays and accents
```

### Complete Input
```typescript
const input = {
  businessName: "Bella Italia",
  businessType: "Restaurant / Cafe",
  location: "San Francisco",
  services: "Italian Pasta, Wood-fired Pizza, Seafood, Desserts",
  phone: "(415) 555-0123",
  email: "hello@bellaitalia.com",
  address: "123 Mission St, San Francisco, CA",
  whatsapp: true,
  style: "luxury",
  primaryColor: "#C41E3A" // Italian red
};
```

## Business Logic

### Service Parsing
- Splits service string by commas
- Trims whitespace
- Limits to 6 services per business
- Falls back to template defaults if empty

### Call-to-Action Selection
- Chooses first CTA from template's options
- Different for each business type
- Examples:
  - Restaurant: "Reserve a Table"
  - Home Services: "Get Free Estimate"
  - Health & Wellness: "Book Appointment"
  - Retail: "Shop Now"

### Template Interpolation
Replaces placeholders with business data:
- `{businessName}` → User's business name
- `{businessType}` → Selected business type
- `{location}` → User's city/location

### Color Scheme Generation
- Takes primary color from user or default
- Generates complementary colors based on style:
  - Modern: Clean neutrals and accent color
  - Minimal: Muted tones and subtle accents
  - Luxury: Deep, sophisticated palette
  - Bold: Vibrant primary with energetic accents

## Advantages

✅ **No Machine Learning Required**: Pure rule-based logic ensures predictable, reliable output
✅ **Fast Generation**: Instant website creation without API calls or model inference
✅ **Sensible Defaults**: All missing inputs automatically filled with appropriate values
✅ **Type-Specific Content**: Each business type gets tailored messaging and sections
✅ **Design Consistency**: Style rules ensure cohesive, professional appearance
✅ **Mobile-Friendly**: All templates designed for responsive layouts
✅ **Easy Customization**: Edit content directly after generation

## Integration Points

### In Loading.tsx
```typescript
// Generate website when user reaches loading screen
const normalizedInput = validateAndNormalizeInput(formData || {});
const generatedWebsite = generateWebsite(normalizedInput);

navigate("/preview", {
  state: {
    formData,
    generatedWebsite,
  },
});
```

### In Preview.tsx
```typescript
// Use generated content in preview
const generatedWebsite = location.state?.generatedWebsite as GeneratedWebsite;

const [websiteContent, setWebsiteContent] = useState({
  heroTitle: generatedWebsite?.heroTitle || `Welcome to ${formData.businessName}`,
  heroSubtitle: generatedWebsite?.heroSubtitle || defaultSubtitle,
  // ... etc
});
```

## Future Enhancements

- **More Business Types**: Expand template library
- **A/B Testing**: Generate multiple variants
- **Advanced Color Schemes**: AI-powered complementary colors
- **Content Personalization**: User preferences and history
- **Multi-language Support**: Auto-generate in different languages
- **SEO Optimization**: Dynamic meta tags and structured data
- **Analytics Integration**: Track website performance

## File Structure

```
src/
├── lib/
│   ├── templates.ts           # Business templates and defaults
│   ├── rules-engine.ts        # Core generation engine
│   └── content-helpers.ts     # Utility functions
├── pages/
│   ├── Create.tsx             # User input form
│   ├── Loading.tsx            # Generation process (uses engine)
│   └── Preview.tsx            # Result display (uses engine output)
└── ...
```

