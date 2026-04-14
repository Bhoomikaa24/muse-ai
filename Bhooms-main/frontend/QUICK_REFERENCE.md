# Quick Reference Guide - Website Generation Engine

## 📋 Quick Start

### Basic Usage (3 lines)
```typescript
import { generateWebsite, validateAndNormalizeInput } from "@/lib/rules-engine";

const website = generateWebsite(validateAndNormalizeInput({ businessName: "My Shop" }));
```

### Full Integration (in React component)
```typescript
const [website] = useState(() => {
  const input = validateAndNormalizeInput(formData || {});
  return generateWebsite(input);
});
```

---

## 📦 Input Parameters

| Parameter | Type | Required | Default | Example |
|-----------|------|----------|---------|---------|
| `businessName` | string | ❌ | "My Business" | "Sarah's Salon" |
| `businessType` | string | ❌ | "Professional Services" | "Beauty & Salon" |
| `location` | string | ❌ | "Your City" | "San Francisco, CA" |
| `services` | string | ❌ | "Service 1, ..." | "Haircut, Coloring" |
| `phone` | string | ❌ | "(555) 000-0000" | "(415) 555-0123" |
| `email` | string | ❌ | "hello@mybusiness.com" | "hello@salon.com" |
| `address` | string | ❌ | "Your Address Here" | "123 Main St" |
| `whatsapp` | boolean | ❌ | false | true |
| `style` | string | ❌ | "modern" | "luxury" |
| `primaryColor` | string | ❌ | "#14B8A6" | "#C41E3A" |

### Allowed Business Types (8)
```
"Restaurant / Cafe"
"Home Services"
"Health & Wellness"
"Professional Services"
"Retail Store"
"Beauty & Salon"
"Fitness & Gym"
"Other"
```

### Allowed Styles (4)
```
"modern"      → Contemporary, clean
"minimal"     → Simple, elegant, spacious
"luxury"      → Premium, sophisticated
"bold"        → Vibrant, eye-catching
```

---

## 📤 Output Structure

```typescript
{
  // Content
  heroTitle: string;              // E.g., "Welcome to Sarah's Salon"
  heroSubtitle: string;           // E.g., "Premium beauty services..."
  aboutText: string;              // About section content
  services: string[];             // Array of 1-6 services
  callToAction: string;           // E.g., "Book Appointment"
  features: string[];             // 4-5 key features
  sections: string[];             // Pages/sections to include

  // Design
  colorScheme: {
    primary: string;              // Main brand color
    secondary: string;            // Supporting color
    accent: string;               // Highlight/CTA color
    background: string;           // Page background
    text: string;                 // Text color
  };
  
  typography: {
    headingFont: string;          // Font family for headings
    bodyFont: string;             // Font family for body text
    headingSize: number;          // Pixels
    bodySize: number;             // Pixels
    lineHeight: number;           // Unitless (e.g., 1.6)
  };
  
  layout: {
    spacing: string;              // "compact" | "comfortable" | "spacious"
    borderRadius: string;         // "sharp" | "rounded" | "soft"
    shadow: string;               // "none" | "subtle" | "pronounced"
  };
}
```

---

## 🎨 Style Effects

### Modern
```
Spacing:      comfortable
Borders:      rounded
Shadows:      subtle
Heading Font: Inter
Body Font:    Inter
Heading Size: 36px
Body Size:    16px
```

### Minimal
```
Spacing:      spacious
Borders:      sharp
Shadows:      none
Heading Font: Helvetica
Body Font:    Helvetica
Heading Size: 32px
Body Size:    15px
```

### Luxury
```
Spacing:      spacious
Borders:      rounded
Shadows:      pronounced
Heading Font: Georgia (serif)
Body Font:    Lato
Heading Size: 42px
Body Size:    17px
```

### Bold
```
Spacing:      comfortable
Borders:      soft
Shadows:      subtle
Heading Font: Montserrat
Body Font:    Open Sans
Heading Size: 40px
Body Size:    16px
```

---

## 🎯 Business Type Details

### Restaurant / Cafe
```
Default CTA:      "Reserve a Table"
Default Services: ["Dine-in Service", "Takeout", "Catering", "Private Events"]
Sections:         ["hero", "about", "services", "menu-preview", "hours", "contact"]
```

### Home Services
```
Default CTA:      "Get Free Estimate"
Default Services: ["Cleaning", "Maintenance", "Repairs", "Installation"]
Sections:         ["hero", "services", "about", "process", "testimonials", "contact"]
```

### Health & Wellness
```
Default CTA:      "Book Appointment"
Default Services: ["Consultations", "Treatments", "Wellness Programs", "Follow-up Care"]
Sections:         ["hero", "services", "about", "credentials", "testimonials", "contact"]
```

### Professional Services
```
Default CTA:      "Start Consultation"
Default Services: ["Consulting", "Strategy", "Implementation", "Support"]
Sections:         ["hero", "services", "about", "expertise", "case-studies", "contact"]
```

### Retail Store
```
Default CTA:      "Shop Now"
Default Services: ["Shopping", "Product Selection", "Deliveries", "Returns"]
Sections:         ["hero", "featured-products", "about", "services", "promotions", "contact"]
```

### Beauty & Salon
```
Default CTA:      "Book Appointment"
Default Services: ["Haircut", "Styling", "Coloring", "Treatments", "Manicure"]
Sections:         ["hero", "services", "about", "gallery", "team", "contact"]
```

### Fitness & Gym
```
Default CTA:      "Join Now"
Default Services: ["Gym Membership", "Personal Training", "Group Classes", "Nutrition Coaching"]
Sections:         ["hero", "services", "about", "trainers", "testimonials", "contact"]
```

### Other
```
Default CTA:      "Contact Us"
Default Services: ["Service 1", "Service 2", "Service 3"]
Sections:         ["hero", "services", "about", "contact"]
```

---

## 🔧 Helper Functions

### Content Generation
```typescript
// Import
import {
  generateMetaDescription,
  generatePageTitle,
  formatPhoneNumber,
  generateFAQ,
  generateTestimonial,
  generateBusinessHours,
  generateWhatsAppLink,
  generateGoogleMapsLink,
} from "@/lib/content-helpers";

// Usage
const metaDesc = generateMetaDescription("Salon", "Beauty & Salon", "NYC");
const title = generatePageTitle("My Salon", "Beauty & Salon");
const formatted = formatPhoneNumber("4155550123");
const faqs = generateFAQ("Restaurant / Cafe");
const testimonial = generateTestimonial("Health & Wellness");
const hours = generateBusinessHours(); // Returns standard hours
const waLink = generateWhatsAppLink("14155550123", "Hi, I'm interested!");
const mapsLink = generateGoogleMapsLink("123 Main St", "My Business");
```

---

## ⚡ Performance

| Operation | Time |
|-----------|------|
| Complete Generation | ~5-10ms |
| Input Validation | < 1ms |
| Template Interpolation | < 1ms |
| Color Scheme Generation | < 1ms |

**Memory**: ~50KB for complete website structure

---

## 🔄 Integration Flow

```
User Form Input
     ↓
validateAndNormalizeInput()
     ↓
generateWebsite()
     ↓
GeneratedWebsite Object
     ↓
React Component (Preview)
     ↓
Rendered Website
```

---

## ✅ Validation Rules

### Input Validation
- ✓ All strings are trimmed
- ✓ Services limited to 6 items
- ✓ Style checked against allowed values
- ✓ Business type checked against templates

### Fallback Behavior
- Missing businessType → "Professional Services"
- Missing location → "Your City"
- Missing style → "modern"
- Missing primaryColor → "#14B8A6"
- Empty services → Template defaults

---

## 💡 Pro Tips

### Tip 1: Minimal Input
```typescript
// Just provide a name - everything else is auto-filled
const website = generateWebsite(
  validateAndNormalizeInput({ businessName: "My Business" })
);
```

### Tip 2: Override Defaults
```typescript
// Provide specific values to override any defaults
const website = generateWebsite(
  validateAndNormalizeInput({
    businessName: "Artisan Bakery",
    businessType: "Restaurant / Cafe",
    style: "minimal",
    primaryColor: "#8B4513" // Brown for bakery
  })
);
```

### Tip 3: Service Formatting
```typescript
// Services can be in any comma-separated format
// Both work:
services: "Bread, Pastries, Cakes"
services: "Bread,Pastries,Cakes"
services: "  Bread  ,  Pastries  ,  Cakes  "
```

### Tip 4: Color Selection
```typescript
// Use any hex color
"#14B8A6"   // Teal (default)
"#C41E3A"   // Red (Italian)
"#0ea5e9"   // Blue
"#10b981"   // Green
"#f59e0b"   // Amber
```

### Tip 5: Content Customization
```typescript
// After generation, you can edit in preview
const website = generateWebsite(input);
// User can then click "Edit Text" to customize
// without re-generating
```

---

## 🚀 Common Patterns

### Restaurant Website
```typescript
generateWebsite(validateAndNormalizeInput({
  businessName: "Restaurant Name",
  businessType: "Restaurant / Cafe",
  location: "City, State",
  style: "luxury",
  services: "Pasta, Pizza, Seafood, Desserts",
}))
```

### Home Service Website
```typescript
generateWebsite(validateAndNormalizeInput({
  businessName: "Service Company",
  businessType: "Home Services",
  location: "City, State",
  style: "modern",
  services: "Plumbing, Electrical, HVAC",
}))
```

### Salon Website
```typescript
generateWebsite(validateAndNormalizeInput({
  businessName: "Salon Name",
  businessType: "Beauty & Salon",
  style: "minimal",
  services: "Haircut, Color, Extensions, Nails",
}))
```

### Gym Website
```typescript
generateWebsite(validateAndNormalizeInput({
  businessName: "Gym Name",
  businessType: "Fitness & Gym",
  style: "bold",
  primaryColor: "#ef4444",
}))
```

---

## 📚 Files Location

| File | Purpose | Size |
|------|---------|------|
| `src/lib/templates.ts` | Business templates | 2.5 KB |
| `src/lib/rules-engine.ts` | Generation engine | 4 KB |
| `src/lib/content-helpers.ts` | Utility functions | 3 KB |
| `TECHNICAL_SPECIFICATION.md` | Full documentation | 10 KB |
| `WEBSITE_GENERATION_ENGINE.md` | System overview | 8 KB |

---

## ❓ FAQ

**Q: Can I use partial input?**
A: Yes! All fields are optional. Missing values are filled with sensible defaults.

**Q: How fast is generation?**
A: ~5-10ms total. Instant for user perception.

**Q: Does it need an API?**
A: No. Pure client-side logic. No external calls.

**Q: Can users edit the generated content?**
A: Yes. After generation, users can click "Edit Text" in preview mode.

**Q: Can I add more business types?**
A: Yes. Add new entries to `BUSINESS_TEMPLATES` in `templates.ts`.

**Q: Can I add more styles?**
A: Yes. Add to `styleRules` in `rules-engine.ts` and style options in UI.

---

## 🎓 Learn More

- See [TECHNICAL_SPECIFICATION.md](TECHNICAL_SPECIFICATION.md) for architecture details
- See [WEBSITE_GENERATION_ENGINE.md](WEBSITE_GENERATION_ENGINE.md) for system overview
- See [USAGE_EXAMPLES.ts](src/lib/USAGE_EXAMPLES.ts) for code examples

