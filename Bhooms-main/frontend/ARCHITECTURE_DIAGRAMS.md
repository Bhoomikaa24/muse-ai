# System Architecture Diagram

## 🏗️ Complete System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        QUICK-SITE-AI PLATFORM                           │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────┐
│  User Input  │  Business Name, Type, Location, Services, Style, Colors
│  (Form)      │  All parameters OPTIONAL with sensible defaults
└──────┬───────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           RULES ENGINE LAYER                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ INPUT VALIDATION & NORMALIZATION                               │  │
│  │  • Trim whitespace from all strings                            │  │
│  │  • Validate business type                                      │  │
│  │  • Validate style preference                                   │  │
│  │  • Fill ALL missing values with sensible defaults              │  │
│  │ Output: Normalized BusinessInput                              │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                    │                                    │
│                                    ▼                                    │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ TEMPLATE SELECTION & CONTENT GENERATION                         │  │
│  │                                                                  │  │
│  │  ┌─────────────────────────────────────────────────────────┐   │  │
│  │  │ Select Template by Business Type                        │   │  │
│  │  │ • 8 business templates available                        │   │  │
│  │  │ • Each has: patterns, services, CTAs, features         │   │  │
│  │  └─────────────────────────────────────────────────────────┘   │  │
│  │                    │                                             │  │
│  │                    ▼                                             │  │
│  │  ┌─────────────────────────────────────────────────────────┐   │  │
│  │  │ Interpolate Content Patterns                            │   │  │
│  │  │ • Replace {businessName}                               │   │  │
│  │  │ • Replace {businessType}                               │   │  │
│  │  │ • Replace {location}                                   │   │  │
│  │  │ Output: Hero title, subtitle, about text              │   │  │
│  │  └─────────────────────────────────────────────────────────┘   │  │
│  │                    │                                             │  │
│  │                    ▼                                             │  │
│  │  ┌─────────────────────────────────────────────────────────┐   │  │
│  │  │ Parse & Validate Services                              │   │  │
│  │  │ • Split by comma                                        │   │  │
│  │  │ • Trim whitespace                                       │   │  │
│  │  │ • Limit to 6 services                                   │   │  │
│  │  │ • Use template defaults if empty                        │   │  │
│  │  └─────────────────────────────────────────────────────────┘   │  │
│  │                    │                                             │  │
│  │                    ▼                                             │  │
│  │  ┌─────────────────────────────────────────────────────────┐   │  │
│  │  │ Select Call-to-Action                                   │   │  │
│  │  │ • Business type → appropriate CTA                       │   │  │
│  │  │ • Examples:                                              │   │  │
│  │  │   - Restaurant → "Reserve a Table"                      │   │  │
│  │  │   - Salon → "Book Appointment"                          │   │  │
│  │  │   - Gym → "Join Now"                                    │   │  │
│  │  └─────────────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│                                    │                                    │
│                                    ▼                                    │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ DESIGN RULES APPLICATION                                        │  │
│  │                                                                  │  │
│  │  ┌─────────────────────────────────────────────────────────┐   │  │
│  │  │ Style → Design Rules                                    │   │  │
│  │  │                                                          │   │  │
│  │  │ MODERN          MINIMAL         LUXURY        BOLD      │   │  │
│  │  │ ─────────       ─────────       ──────        ────      │   │  │
│  │  │ Spacing:       Spacing:        Spacing:      Spacing:  │   │  │
│  │  │ comfortable    spacious        spacious      comfortable│   │  │
│  │  │                                                          │   │  │
│  │  │ Borders:       Borders:        Borders:      Borders:  │   │  │
│  │  │ rounded        sharp           rounded       soft       │   │  │
│  │  │                                                          │   │  │
│  │  │ Shadows:       Shadows:        Shadows:      Shadows:  │   │  │
│  │  │ subtle         none            pronounced    subtle     │   │  │
│  │  │                                                          │   │  │
│  │  │ Font: Inter    Font: Helvetica Font: Georgia  Font: Montserrat  │   │  │
│  │  │ 36px/16px      32px/15px       42px/17px     40px/16px  │   │  │
│  │  └─────────────────────────────────────────────────────────┘   │  │
│  │                    │                                             │  │
│  │                    ▼                                             │  │
│  │  ┌─────────────────────────────────────────────────────────┐   │  │
│  │  │ Generate Color Scheme                                   │   │  │
│  │  │ • Base: User's primaryColor (or default #14B8A8)       │   │  │
│  │  │ • Style determines palette:                             │   │  │
│  │  │   - Modern: clean neutrals                              │   │  │
│  │  │   - Minimal: muted tones                                │   │  │
│  │  │   - Luxury: deep sophisticated colors                   │   │  │
│  │  │   - Bold: vibrant accents                               │   │  │
│  │  │ • Output: {primary, secondary, accent, bg, text}       │   │  │
│  │  └─────────────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  GeneratedWebsite Object     │  Complete website structure with:
│                              │  • Content (hero, about, services, CTA)
│                              │  • Design (colors, fonts, spacing)
│                              │  • Layout (sections, structure)
└──────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    REACT COMPONENT LAYER                             │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Loading.tsx                                                        │
│  • Calls: generateWebsite(validateAndNormalizeInput(formData))     │
│  • Passes: { formData, generatedWebsite } to Preview               │
│                                                                      │
│                         │                                           │
│                         ▼                                           │
│                                                                      │
│  Preview.tsx                                                        │
│  • Receives: GeneratedWebsite object                               │
│  • Renders: Generated content with styling                         │
│  • Features:                                                        │
│    - Display hero title, subtitle, about text                      │
│    - Show services list                                            │
│    - Display CTA button                                            │
│    - Apply color scheme and typography                             │
│    - Edit mode for content customization                           │
│    - Publish button                                                │
│                                                                      │
│                         │                                           │
│                         ▼                                           │
│                                                                      │
│  WebsitePreviewFrame.tsx                                           │
│  • Component: Renders the actual website preview                   │
│  • Uses: Generated content and design specifications               │
│  • Output: Professional looking website                            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│   RENDERED WEBSITE           │  Professional, mobile-friendly website
│   For User Review            │  Ready to publish or edit
│                              │
└──────────────────────────────┘
```

---

## 📊 Data Structure Flow

```
INPUT
  ↓
├─ businessName?: "My Salon"
├─ businessType?: "Beauty & Salon"
├─ location?: "NYC"
├─ services?: "Haircut, Color, Extensions"
├─ style?: "luxury"
├─ primaryColor?: "#C41E3A"
├─ phone?: "(212) 555-0123"
├─ email?: "hello@salon.com"
└─ ... (all OPTIONAL)

  ↓ validateAndNormalizeInput()
  
NORMALIZED INPUT (all fields filled)
  ↓
  ├─ businessName: "My Salon" (or "My Business")
  ├─ businessType: "Beauty & Salon" (or "Professional Services")
  ├─ location: "NYC" (or "Your City")
  ├─ services: "Haircut, Color, Extensions" (or template defaults)
  ├─ style: "luxury" (or "modern")
  ├─ primaryColor: "#C41E3A" (or "#14B8A6")
  └─ ... (all fields present)

  ↓ generateWebsite()
  
GENERATED WEBSITE
  ↓
  ├─ CONTENT
  │  ├─ heroTitle: "Beautiful You at My Salon"
  │  ├─ heroSubtitle: "Premium beauty and salon services in NYC..."
  │  ├─ aboutText: "My Salon is your sanctuary for beauty..."
  │  ├─ services: ["Haircut", "Color", "Extensions", "Treatments", "Manicure"]
  │  ├─ callToAction: "Book Appointment"
  │  ├─ features: ["Professional stylists", "Premium products", ...]
  │  └─ sections: ["hero", "services", "about", "gallery", "team", "contact"]
  │
  ├─ COLORS
  │  ├─ primary: "#C41E3A"
  │  ├─ secondary: "#D1D5DB"
  │  ├─ accent: "#1F2937"
  │  ├─ background: "#FAFAFA"
  │  └─ text: "#0F172A"
  │
  ├─ TYPOGRAPHY
  │  ├─ headingFont: "Georgia, serif"
  │  ├─ bodyFont: "Lato, sans-serif"
  │  ├─ headingSize: 42
  │  ├─ bodySize: 17
  │  └─ lineHeight: 1.7
  │
  └─ LAYOUT
     ├─ spacing: "spacious"
     ├─ borderRadius: "rounded"
     └─ shadow: "pronounced"

  ↓
  
RENDERED WEBSITE (in React)
  ↓
  Display with all styling applied
```

---

## 🔀 Component Interactions

```
┌──────────────┐
│  Create.tsx  │  User fills form
│   (Form)     │  - Business name, type, location
└──────┬───────┘  - Services, contact info
       │          - Style preference, color
       │
       ▼
   formData { ... }
       │
       ▼
  navigate("/loading", { state: { formData } })
       │
       ▼
┌──────────────────────────────────┐
│   Loading.tsx                    │
│   • Receives: formData           │
│   • Actions:                     │
│     1. validateAndNormalizeInput │
│     2. generateWebsite()         │
│     3. Pass result to Preview    │
└──────┬───────────────────────────┘
       │
       ▼
navigate("/preview", { state: { formData, generatedWebsite } })
       │
       ▼
┌──────────────────────────────────────────┐
│   Preview.tsx                            │
│   • Receives: formData + generatedWebsite│
│   • Display: Generated website           │
│   • Features:                            │
│     - View generated content             │
│     - Edit text mode                     │
│     - Publish button                     │
│     - Start over button                  │
└──────┬───────────────────────────────────┘
       │
       ├─→ Edit button → EditableText components
       ├─→ Publish button → PublishModal
       └─→ Start Over → navigate("/create")
```

---

## 📦 File Organization

```
src/
├── pages/
│   ├── Create.tsx              ← User input form
│   ├── Loading.tsx             ← Uses rules engine to generate
│   └── Preview.tsx             ← Uses generated output
│
├── components/
│   ├── WebsitePreviewFrame.tsx ← Renders generated website
│   ├── PublishModal.tsx
│   └── ... other components
│
└── lib/                        ← RULES ENGINE LAYER
    ├── templates.ts            ← 8 business templates
    ├── rules-engine.ts         ← Main generation logic
    ├── content-helpers.ts      ← 10 utility functions
    ├── USAGE_EXAMPLES.ts       ← Code examples
    └── utils.ts                ← Other utilities
```

---

## 🎯 Business Type Decision Tree

```
Is businessType provided?
  │
  ├─ YES → Use specific template
  │         ├─ Restaurant / Cafe
  │         ├─ Home Services
  │         ├─ Health & Wellness
  │         ├─ Professional Services
  │         ├─ Retail Store
  │         ├─ Beauty & Salon
  │         ├─ Fitness & Gym
  │         └─ Other
  │
  └─ NO → Use "Professional Services" template
```

---

## 🎨 Style Selection Decision Tree

```
Is style provided?
  │
  ├─ "modern" → Contemporary rules applied
  │             Clean, comfortable, rounded
  │
  ├─ "minimal" → Simplicity rules applied
  │              Spacious, sharp, no shadows
  │
  ├─ "luxury" → Sophistication rules applied
  │             Spacious, rounded, pronounced
  │
  ├─ "bold" → Energy rules applied
  │           Comfortable, soft, vibrant
  │
  └─ DEFAULT → Use "modern" style
```

---

## 🔄 Generation Algorithm

```
FUNCTION generateWebsite(input: BusinessInput):
  1. VALIDATE input (normalize, fill defaults)
  2. SELECT template by businessType
  3. GET style rules (layout, typography)
  4. GENERATE colorScheme from primaryColor + style
  5. INTERPOLATE template patterns with business data
  6. PARSE services string into array
  7. SELECT appropriate CTA from template
  8. RETURN GeneratedWebsite {
       content: { hero, about, services, CTA, features },
       design: { colors, typography, layout },
       structure: { sections }
     }
END
```

---

## 💾 State Management Flow

```
Create.tsx
  └─ formData (state)
       │
       ├─ Validation on each step
       ├─ Navigation to Loading with formData
       │
       ▼
Loading.tsx
  └─ Process: generateWebsite(formData)
       │
       ├─ Returns: GeneratedWebsite object
       ├─ Combines: formData + generatedWebsite
       ├─ Navigation to Preview with both
       │
       ▼
Preview.tsx
  ├─ formData (for display)
  ├─ generatedWebsite (for default content)
  └─ websiteContent (editable state)
       │
       ├─ Can edit any content field
       ├─ Updates local state
       ├─ Renders updated preview
       │
       └─ On publish: Save formData + websiteContent
```

---

## ✅ Validation Layers

```
LAYER 1: Input Validation
  ├─ Trim all strings
  ├─ Check businessType is valid
  ├─ Check style is in ["modern", "minimal", "luxury", "bold"]
  └─ Fill missing fields with defaults

LAYER 2: Template Selection
  ├─ Check if template exists for businessType
  └─ Use "Other" template as fallback

LAYER 3: Content Processing
  ├─ Interpolate templates safely
  ├─ Parse services without errors
  ├─ Validate service count (max 6)
  └─ Select valid CTA from template

LAYER 4: Design Application
  ├─ Validate style rules exist
  ├─ Validate color scheme structure
  ├─ Validate typography specs
  └─ Validate layout specs

RESULT: Complete, valid GeneratedWebsite
```

---

## 🚀 Performance Profile

```
Operation                    Time      Memory
─────────────────────────────────────────────────
Input normalization         < 1ms     ~1 KB
Template selection          < 1ms     ~1 KB
Content interpolation       < 1ms     ~2 KB
Services parsing            < 1ms     ~1 KB
Style rules application     < 1ms     ~1 KB
Color scheme generation     < 1ms     ~1 KB
Final assembly              < 1ms     ~1 KB
─────────────────────────────────────────────────
TOTAL                       ~5-10ms   ~50 KB
```

**Perception**: Instant (< 100ms threshold)

---

## 🔐 Fallback Strategy

```
Missing businessType? → "Professional Services"
Missing location? → "Your City"
Missing services? → Template defaults
Missing style? → "modern"
Missing primaryColor? → "#14B8A6"
Missing phone? → "(555) 000-0000"
Missing email? → "hello@mybusiness.com"
Missing address? → "Your Address Here"

Invalid businessType? → "Other" template
Invalid style? → "modern" style rules
Invalid template? → "Other" template

Result: ALWAYS valid GeneratedWebsite object
```

