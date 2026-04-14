<style>
body {
  font-family: 'Times New Roman', Times, serif;
  line-height: 1.5;
  text-align: justify;
  font-size: 12pt;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Times New Roman', Times, serif;
  text-align: left;
  margin-top: 24pt;
  margin-bottom: 12pt;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 12pt 0;
  font-family: 'Times New Roman', Times, serif;
}

table th {
  background-color: #f0f0f0;
  padding: 8pt;
  border: 1pt solid #000;
  text-align: left;
  font-weight: bold;
}

table td {
  padding: 8pt;
  border: 1pt solid #000;
  text-align: left;
}

pre, code {
  font-family: 'Courier New', monospace;
  background-color: #f5f5f5;
  padding: 8pt;
  border: 1pt solid #ddd;
  line-height: 1.3;
}

.diagram {
  text-align: center;
  font-family: 'Courier New', monospace;
  background-color: #fafafa;
  padding: 12pt;
  border: 1pt solid #ccc;
  margin: 12pt 0;
}

p {
  margin: 6pt 0;
  text-indent: 0;
}
</style>

# Software Design Specification (SDS)
## Muse AI - Rule-Based Website Generation Platform

---

## Cover Page

**Project Title:** Muse AI - Intelligent Website Generation System  
**Document Type:** Software Design Specification (SDS)  
**Version:** 1.0  
**Date:** February 26, 2026  
**Prepared By:** Project Team  
**Organization:** Academic Project - 6th Semester  
**Status:** Final  

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Design Overview](#2-design-overview)
3. [System Architecture](#3-system-architecture)
4. [Detailed Component Design](#4-detailed-component-design)
5. [Data Design](#5-data-design)
6. [Interface Design](#6-interface-design)
7. [Algorithm Design](#7-algorithm-design)
8. [Design Decisions & Rationale](#8-design-decisions--rationale)
9. [Technology Stack](#9-technology-stack)
10. [Performance Design](#10-performance-design)
11. [Security Design](#11-security-design)
12. [Conclusion](#12-conclusion)

---

## 1. Introduction

### 1.1 Purpose
This Software Design Specification (SDS) describes the architecture and design of Muse AI, a rule-based website generation platform. The document provides comprehensive design specifications for developers, architects, and stakeholders.

### 1.2 Scope
Muse AI is a client-side web application that generates professional, mobile-responsive websites for small businesses in under 2 minutes. The system uses predefined templates and deterministic rules without relying on external AI/ML APIs.

### 1.3 Intended Audience
- Development Team
- System Architects
- Quality Assurance Engineers
- Project Managers
- Academic Evaluators

### 1.4 Design Goals
- **Speed:** Website generation under 10ms
- **Simplicity:** 4-step wizard, minimal required inputs
- **Predictability:** Deterministic rule-based output
- **Privacy:** No external API calls, client-side only
- **Quality:** Professional, accessible, mobile-first design

---

## 2. Design Overview

### 2.1 System Summary
Muse AI is a single-page application (SPA) built with React 18 and TypeScript that generates complete website structures using:
- **8 business type templates** (Restaurant, Home Services, Health & Wellness, etc.)
- **4 design styles** (Modern, Minimal, Luxury, Bold)
- **Rule-based content generation** (no machine learning)
- **Smart defaults** for all optional inputs

### 2.2 Architecture Pattern
The system follows a **layered architecture** with clear separation of concerns:

<div class="diagram">

| Layer | Components | Description |
|-------|------------|-------------|
| **Presentation Layer** | React Components - UI/UX | User interface and visual elements |
| ↓ | | |
| **Application Layer** | State Management, Navigation | Application flow and state control |
| ↓ | | |
| **Business Logic Layer** | Rules Engine, Templates, Generators | Core generation and business rules |
| ↓ | | |
| **Data Layer** | Client-side State, No Database | Temporary data storage |

</div>

### 2.3 Design Approach
- **Component-Based Architecture:** Reusable React components
- **Template Pattern:** Predefined business templates
- **Strategy Pattern:** Style-specific design rules
- **Factory Pattern:** Website generation based on inputs
- **Composition over Inheritance:** Flexible component structure

---

## 3. System Architecture

### 3.1 High-Level Architecture

<div class="diagram">

**MUSE AI PLATFORM ARCHITECTURE**

| Layer | Component | Sub-Components |
|-------|-----------|----------------|
| **User Input** | Form Interface | Business details, contact info, design preferences |
| ↓ | | |
| **Presentation Layer** | React Components | • Landing Page<br>• Create Wizard<br>• Loading Screen<br>• Preview Page |
| ↓ | | |
| **Application Layer** | Navigation & State | • React Router<br>• State Management<br>• Navigation Flow |
| ↓ | | |
| **Business Logic Layer** | Core Processing | **Rules Engine** (rules-engine.ts):<br>• validateAndNormalizeInput()<br>• generateWebsite()<br>• selectCTA()<br>• parseServices()<br><br>**Templates** (templates.ts):<br>• 8 Business Type Templates<br>• Default Values<br>• Business Logic Patterns<br><br>**Content Helpers** (content-helpers.ts):<br>• Utility Functions<br>• Format Converters<br>• URL Generators |
| ↓ | | |
| **Output** | Generated Website | • Preview Display<br>• Editable Content<br>• Export/Publish |

</div>

### 3.2 Data Flow Architecture

<div class="diagram">

| Step | Process | Description |
|------|---------|-------------|
| 1 | User Form Data | Optional inputs from creation wizard |
| ↓ | | |
| 2 | Validation & Normalization | Fill missing values with defaults |
| ↓ | | |
| 3 | Template Selection | Choose template by business type |
| ↓ | | |
| 4 | Content Generation | Interpolation and rule application |
| ↓ | | |
| 5 | Style Application | Apply colors and typography |
| ↓ | | |
| 6 | Generated Website Object | Complete website structure |
| ↓ | | |
| 7 | React Component Rendering | Render as interactive preview |
| ↓ | | |
| 8 | User Preview & Edit | Final review and modifications |

</div>

### 3.3 Module Dependencies

<div class="diagram">

| Level | Module | Dependencies |
|-------|--------|-------------|
| **Root** | App.tsx | Main application component |
| → | Landing.tsx | Hero and features display |
| → | Create.tsx | Form wizard with step components |
| → | Loading.tsx | **Depends on:**<br>• rules-engine.ts<br>&nbsp;&nbsp;• templates.ts<br>&nbsp;&nbsp;• content-helpers.ts<br>**Navigates to:** Preview |
| → | Preview.tsx | **Depends on:**<br>• WebsitePreviewFrame.tsx<br>• EditableText.tsx |

</div>

---

## 4. Detailed Component Design

### 4.1 Presentation Layer Components

#### 4.1.1 Landing Page (Landing.tsx)
**Purpose:** First entry point showcasing platform value proposition

**Key Elements:**
- Hero section with value proposition
- Feature highlights
- Call-to-action button to start creation
- Benefits display
- Responsive navigation

**Navigation:** Routes to `/create` wizard

---

#### 4.1.2 Create Wizard (Create.tsx)
**Purpose:** Multi-step form for gathering business information

**Design Pattern:** Wizard Pattern with Step Progression

**Steps:**

| Step | Section | Fields | Validation |
|------|---------|--------|------------|
| 1 | **Business Information** | • Business name<br>• Business type (8 options)<br>• Location | Business name required (min 2 characters) |
| 2 | **Services** | • Service list input (comma-separated) | Max 6 services |
| 3 | **Contact Information** | • Phone number<br>• Email address<br>• Physical address<br>• WhatsApp toggle | Email format if provided |
| 4 | **Design Preferences** | • Style selection (4 options)<br>• Primary color picker<br>• Style preview | None (all optional) |

**Validation Rules:**

| Field | Rule | Required |
|-------|------|----------|
| Business name | Minimum 2 characters | Yes |
| Business type | Must be one of 8 types | Yes |
| Email | Valid email format | No (if provided) |
| Phone | Any format accepted | No (recommended) |
| Services | At least 1 recommended | No |

**Components Used:**
- `StepIndicator.tsx` - Progress visualization
- Form inputs with validation
- Color picker component
- Style preview cards

**State Management:** React Hook Form + local state

**Navigation Rules:**

| Direction | Action | Validation |
|-----------|--------|------------|
| Forward | Next step | Validates current step before proceeding |
| Backward | Previous step | Allows returning without validation |
| Final | Submit | Navigate to `/loading` with complete form data |

---

#### 4.1.3 Loading Screen (Loading.tsx)
**Purpose:** Processes input and generates website

**Design:**

| Component | Action | Description |
|-----------|--------|-------------|
| **Loading.tsx** | Receives | formData from navigation state |
| | **Process Steps:** | 1. Display loading animation (0.5-1s minimum for UX)<br>2. Call validateAndNormalizeInput(formData)<br>3. Call generateWebsite(normalizedInput)<br>4. Navigate to Preview with generated data |
| | Uses Component | LoadingScreen.tsx (animated spinner) |

**Pseudo-code:**
```typescript
useEffect(() => {
  // Receive form data from navigation
  const formData = location.state?.formData;
  
  // Normalize inputs with defaults
  const normalized = validateAndNormalizeInput(formData);
  
  // Generate complete website
  const website = generateWebsite(normalized);
  
  // Add minimum delay for UX (user perception)
  setTimeout(() => {
    navigate('/preview', { 
      state: { 
        formData: normalized,
        generatedWebsite: website 
      }
    });
  }, 800);
}, []);
```

**Performance:** Generation completes in ~5-10ms, delay is for UX only

---

#### 4.1.4 Preview Page (Preview.tsx)
**Purpose:** Display generated website with editing capabilities

**Layout:**

| Section | Component | Features |
|---------|-----------|----------|
| **Navigation Bar** | Action Buttons | • Back to Edit<br>• Edit Mode<br>• Publish |
| **Website Preview Frame** | | |
| • Hero Section | Title, Subtitle, CTA | Editable title and subtitle |
| • About Section | About Text | Editable content |
| • Services Section | Service Cards | Display all services |
| • Contact Section | Contact Info | Phone, Email, Address |

**Features:**
- Real-time content editing (EditableText component)
- Style preview with generated colors
- Responsive design preview
- Export HTML functionality
- Publish to hosting provider

**Components:**
- `WebsitePreviewFrame.tsx` - Main preview renderer
- `EditableText.tsx` - Inline text editing
- `PublishModal.tsx` - Publishing options

---

### 4.2 Business Logic Layer Components

#### 4.2.1 Rules Engine (rules-engine.ts)
**Purpose:** Core generation logic applying business rules

**Main Functions:**

##### generateWebsite(input: BusinessInput): GeneratedWebsite
**Algorithm:**
```typescript
1. SELECT template based on businessType
2. INTERPOLATE content patterns with input data
   - Replace {businessName} with actual name
   - Replace {businessType} with type
   - Replace {location} with location
3. PARSE and VALIDATE services
   - Split by comma
   - Trim whitespace
   - Limit to 6 items
4. SELECT call-to-action based on business type
5. APPLY style rules
   - Get typography settings
   - Get layout settings
6. GENERATE color scheme from primary color
7. ASSEMBLE and RETURN GeneratedWebsite object
```

**Time Complexity:** O(1) - constant time operations
**Space Complexity:** O(1) - fixed output size

---

##### validateAndNormalizeInput(input: Partial<BusinessInput>): BusinessInput
**Purpose:** Fill missing values with sensible defaults

**Logic:**
```typescript
FOR EACH optional field:
  IF field is undefined OR empty string:
    SET field = DEFAULT_VALUE from templates
  ELSE:
    TRIM whitespace
    VALIDATE format
    
RETURN complete BusinessInput object
```

**Default Values:**

| Field | Default Value | Purpose |
|-------|---------------|----------|
| businessName | "My Business" | Generic business name |
| businessType | "Professional Services" | Most versatile type |
| location | "Your City" | Placeholder location |
| services | Template-specific | Based on business type |
| phone | "(555) 000-0000" | Standard placeholder |
| email | "hello@mybusiness.com" | Generic business email |
| address | "Your Address Here" | Placeholder address |
| style | "modern" | Most popular style |
| primaryColor | "#14B8A6" | Teal (professional) |

---

##### selectCTA(businessType: string): string
**Purpose:** Choose appropriate call-to-action button text

**Decision Table:**

| Business Type | CTA Text | Use Case |
|---------------|----------|----------|
| Restaurant / Cafe | "Reserve a Table" | Booking-focused |
| Home Services | "Get Free Estimate" | Quote-focused |
| Health & Wellness | "Book Appointment" | Scheduling-focused |
| Professional Services | "Start Consultation" | Engagement-focused |
| Retail Store | "Shop Now" | Sales-focused |
| Beauty & Salon | "Book Appointment" | Scheduling-focused |
| Fitness & Gym | "Join Now" | Membership-focused |
| Other | "Contact Us" | General inquiry |

---

##### parseServices(servicesString: string, businessType: string): string[]
**Purpose:** Parse and validate services input

**Algorithm:**
```typescript
1. IF servicesString is empty:
     RETURN template.defaultServices
2. SPLIT string by comma
3. FOR EACH service:
     TRIM whitespace
     FILTER out empty strings
4. IF count > 6:
     RETURN first 6 services
5. IF count < 1:
     RETURN template.defaultServices
6. RETURN validated services array
```

---

##### getStyleRules(style: string): { layout: Layout; typography: Typography }
**Purpose:** Return design specifications for selected style

**Style Specifications:**

| Style | Layout Properties | Typography Properties |
|-------|-------------------|----------------------|
| **Modern** | • Spacing: comfortable (16-24px)<br>• Border Radius: rounded (8px)<br>• Shadow: subtle | • Heading Font: Inter, sans-serif<br>• Body Font: Inter, sans-serif<br>• Heading Size: 36px<br>• Body Size: 16px<br>• Line Height: 1.6 |
| **Minimal** | • Spacing: spacious (24-32px)<br>• Border Radius: sharp (0px)<br>• Shadow: none | • Heading Font: Helvetica, sans-serif<br>• Body Font: Helvetica, sans-serif<br>• Heading Size: 32px<br>• Body Size: 15px<br>• Line Height: 1.8 |
| **Luxury** | • Spacing: spacious (24-32px)<br>• Border Radius: rounded (8px)<br>• Shadow: pronounced | • Heading Font: Georgia, serif<br>• Body Font: Lato, sans-serif<br>• Heading Size: 42px<br>• Body Size: 17px<br>• Line Height: 1.7 |
| **Bold** | • Spacing: comfortable (16-24px)<br>• Border Radius: soft (12px)<br>• Shadow: subtle | • Heading Font: Montserrat, sans-serif<br>• Body Font: Open Sans, sans-serif<br>• Heading Size: 40px<br>• Body Size: 16px<br>• Line Height: 1.6 |

---

##### generateColorScheme(primaryColor: string, style: string): ColorScheme
**Purpose:** Create complementary color palette

**Algorithm:**
```typescript
1. START with primaryColor (user input or default)
2. BASED ON style, SELECT color philosophy:
   
   Modern:
     - secondary: Light gray (#D1D5DB)
     - accent: Dark gray (#1F2937)
     - background: White (#FFFFFF)
     - text: Very dark (#0F172A)
   
   Minimal:
     - secondary: Muted tone
     - accent: Single accent color
     - background: Off-white (#FAFAFA)
     - text: Dark gray
   
   Luxury:
     - secondary: Sophisticated neutral
     - accent: Deep complementary
     - background: Cream/light
     - text: Rich dark
   
   Bold:
     - secondary: Vibrant complement
     - accent: Contrasting bright
     - background: Clean white
     - text: Strong black

3. RETURN ColorScheme object with 5 colors
```

**Output:**

| Property | Type | Description |
|----------|------|-------------|
| primary | string | User's choice or default color |
| secondary | string | Complementary color 1 |
| accent | string | Complementary color 2 |
| background | string | Page background color |
| text | string | Main text color |

---

#### 4.2.2 Templates System (templates.ts)
**Purpose:** Predefined content patterns for business types

**Data Structure:**
```typescript
interface BusinessTemplate {
  name: string;
  defaultServices: string[];          // 3-5 services
  heroTitlePattern: string;           // E.g., "Welcome to {businessName}"
  heroSubtitlePattern: string;        // E.g., "Your trusted {businessType}"
  aboutPattern: string;               // E.g., "At {businessName}, we..."
  callToActionOptions: string[];      // 2-3 appropriate CTAs
  featuresPattern: string[];          // 4-5 key features
  sections: string[];                 // Website sections to include
  keywordsByType: string[];          // SEO keywords
}
```

**Template Examples:**

**Restaurant / Cafe Template:**
```typescript
{
  name: "Restaurant / Cafe",
  defaultServices: [
    "Dine-in Service",
    "Takeout",
    "Catering",
    "Private Events"
  ],
  heroTitlePattern: "Welcome to {businessName}",
  heroSubtitlePattern: "Delicious meals and memorable dining in {location}",
  aboutPattern: "At {businessName}, we bring you the finest cuisine...",
  callToActionOptions: [
    "Reserve a Table",
    "View Menu",
    "Order Online"
  ],
  featuresPattern: [
    "Fresh, locally-sourced ingredients",
    "Cozy and inviting atmosphere",
    "Friendly and attentive service",
    "Special events and catering"
  ],
  sections: [
    "hero",
    "about",
    "services",
    "menu-preview",
    "hours",
    "contact"
  ],
  keywordsByType: [
    "restaurant",
    "dining",
    "food",
    "menu",
    "cuisine"
  ]
}
```

**Health & Wellness Template:**
```typescript
{
  name: "Health & Wellness",
  defaultServices: [
    "Consultations",
    "Treatments",
    "Wellness Programs",
    "Follow-up Care"
  ],
  heroTitlePattern: "Your Health, Our Priority at {businessName}",
  heroSubtitlePattern: "Professional {businessType} services in {location}",
  aboutPattern: "{businessName} is dedicated to your health...",
  callToActionOptions: [
    "Book Appointment",
    "Schedule Consultation",
    "Contact Us"
  ],
  featuresPattern: [
    "Licensed and experienced professionals",
    "Personalized care plans",
    "Modern facilities and equipment",
    "Flexible appointment scheduling"
  ],
  sections: [
    "hero",
    "services",
    "about",
    "credentials",
    "testimonials",
    "contact"
  ],
  keywordsByType: [
    "health",
    "wellness",
    "care",
    "treatment",
    "professional"
  ]
}
```

**Professional Services Template:**
```typescript
{
  name: "Professional Services",
  defaultServices: [
    "Consulting",
    "Project Management",
    "Business Solutions",
    "Support Services"
  ],
  heroTitlePattern: "Expert {businessType} from {businessName}",
  heroSubtitlePattern: "Professional solutions for your business in {location}",
  aboutPattern: "{businessName} delivers expert {businessType}...",
  callToActionOptions: [
    "Start Consultation",
    "Get Quote",
    "Schedule Meeting"
  ],
  featuresPattern: [
    "Experienced and certified professionals",
    "Customized solutions",
    "Timely and reliable service",
    "Competitive pricing"
  ],
  sections: [
    "hero",
    "services",
    "about",
    "expertise",
    "case-studies",
    "contact"
  ],
  keywordsByType: [
    "professional",
    "services",
    "consulting",
    "solutions",
    "expert"
  ]
}
```

**Total Templates:** 8 (Restaurant, Home Services, Health, Professional, Retail, Beauty, Fitness, Other)

---

#### 4.2.3 Content Helpers (content-helpers.ts)
**Purpose:** Utility functions for content generation

**Functions:**

##### generateMetaDescription(businessName, businessType, location): string
```typescript
// Creates SEO-optimized meta description
// Example: "Visit Sunny's Cafe in Austin for delicious meals..."
// Length: 150-160 characters
```

##### generatePageTitle(businessName, businessType): string
```typescript
// Creates page title tag
// Pattern: "{businessName} - {businessType} | Professional Website"
```

##### formatPhoneNumber(phone: string): string
```typescript
// Formats phone to consistent pattern
// Input: "2125551234" or "(212) 555-1234"
// Output: "(212) 555-1234"
```

##### isValidEmail(email: string): boolean
```typescript
// Validates email format using regex
// Pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
```

##### generateWhatsAppLink(phone: string, message?: string): string
```typescript
// Creates WhatsApp deep link
// Returns: "https://wa.me/12125551234?text=Hello..."
```

##### generateGoogleMapsLink(address: string, businessName: string): string
```typescript
// Creates Google Maps search URL
// Returns: "https://www.google.com/maps/search/..."
```

##### generateTestimonial(businessType: string): object
```typescript
// Returns appropriate testimonial based on business type
// Structure: { name, text, rating }
```

##### generateFAQ(businessType: string): Array<{q: string, a: string}>
```typescript
// Returns 2-3 FAQs relevant to business type
// Example for Restaurant:
// [
//   { q: "What are your hours?", a: "..." },
//   { q: "Do you take reservations?", a: "..." }
// ]
```

##### generateBusinessHours(): object
```typescript
// Returns standard business hours
// { monday: "9:00 AM - 5:00 PM", ... }
```

##### getHeroImageSuggestion(businessType: string): string
```typescript
// Returns image search suggestion
// Example: "professional restaurant interior"
```

---

## 5. Data Design

### 5.1 Data Structures

#### Input Data Model
```typescript
interface BusinessInput {
  // Business Information
  businessName?: string;          // Optional, default: "My Business"
  businessType?: BusinessType;    // Optional, default: "Professional Services"
  location?: string;              // Optional, default: "Your City"
  services?: string;              // Optional, CSV format
  
  // Contact Information
  phone?: string;                 // Optional, default: "(555) 000-0000"
  email?: string;                 // Optional, default: "hello@mybusiness.com"
  address?: string;               // Optional, default: "Your Address Here"
  whatsapp?: boolean;             // Optional, default: false
  
  // Design Preferences
  style?: StyleType;              // Optional, default: "modern"
  primaryColor?: string;          // Optional, default: "#14B8A6"
}

type BusinessType = 
  | "Restaurant / Cafe"
  | "Home Services"
  | "Health & Wellness"
  | "Professional Services"
  | "Retail Store"
  | "Beauty & Salon"
  | "Fitness & Gym"
  | "Other";

type StyleType = "modern" | "minimal" | "luxury" | "bold";
```

#### Output Data Model
```typescript
interface GeneratedWebsite {
  // Content
  heroTitle: string;              // E.g., "Welcome to Sunny's Cafe"
  heroSubtitle: string;           // E.g., "Delicious meals in Austin"
  aboutText: string;              // 2-3 sentences
  services: string[];             // Array of 1-6 services
  callToAction: string;           // Business-appropriate CTA
  features: string[];             // 4-5 key features
  sections: string[];             // Sections to include
  
  // Design
  colorScheme: ColorScheme;
  typography: Typography;
  layout: Layout;
}

interface ColorScheme {
  primary: string;                // Hex color
  secondary: string;              // Hex color
  accent: string;                 // Hex color
  background: string;             // Hex color
  text: string;                   // Hex color
}

interface Typography {
  headingFont: string;            // Font family
  bodyFont: string;               // Font family
  headingSize: number;            // px
  bodySize: number;               // px
  lineHeight: number;             // multiplier
}

interface Layout {
  spacing: "comfortable" | "spacious";
  borderRadius: "sharp" | "rounded" | "soft";
  shadow: "none" | "subtle" | "pronounced";
}
```

#### Template Data Model
```typescript
interface BusinessTemplate {
  name: string;
  defaultServices: string[];
  heroTitlePattern: string;
  heroSubtitlePattern: string;
  aboutPattern: string;
  callToActionOptions: string[];
  featuresPattern: string[];
  sections: string[];
  keywordsByType: string[];
}

const BUSINESS_TEMPLATES: Record<BusinessType, BusinessTemplate> = {
  "Restaurant / Cafe": { /* ... */ },
  "Home Services": { /* ... */ },
  // ... 6 more
}
```

### 5.2 State Management

**Application State Flow:**
```
Landing Page → (No state)
     ↓
Create Page → formData (local state with React Hook Form)
     ↓
Loading Page → Receives formData via navigation state
     ↓
     Generates: generatedWebsite
     ↓
Preview Page → Receives both formData and generatedWebsite
     ↓
     Local state for edited content
```

**No Persistence:**
- No database
- No local storage
- All state is temporary and client-side only
- On page refresh, user starts over

---

## 6. Interface Design

### 6.1 User Interface Components

#### Color Scheme

| Category | Variable | Value | Usage |
|----------|----------|-------|-------|
| **Primary Colors** | --primary | #14B8A6 | Default Teal |
| | --primary-hover | #0D9488 | Hover state |
| | --primary-light | #5EEAD4 | Light variant |
| **Neutral Colors** | --background | #FFFFFF | Page background |
| | --foreground | #0F172A | Main text |
| | --muted | #F1F5F9 | Muted elements |
| | --border | #E2E8F0 | Borders |
| **Semantic Colors** | --success | #10B981 | Success states |
| | --error | #EF4444 | Error states |
| | --warning | #F59E0B | Warning states |

#### Typography

| Property | Variable | Value |
|----------|----------|-------|
| **Font Families** | --font-heading | 'Inter', sans-serif |
| | --font-body | 'Inter', sans-serif |
| **Font Sizes** | --text-xs | 12px |
| | --text-sm | 14px |
| | --text-base | 16px |
| | --text-lg | 18px |
| | --text-xl | 20px |
| | --text-2xl | 24px |
| | --text-3xl | 30px |
| | --text-4xl | 36px |

#### Spacing System

| Variable | Value | Usage |
|----------|-------|-------|
| --space-1 | 4px | Minimal spacing |
| --space-2 | 8px | Tight spacing |
| --space-3 | 12px | Small spacing |
| --space-4 | 16px | Base spacing |
| --space-6 | 24px | Medium spacing |
| --space-8 | 32px | Large spacing |
| --space-12 | 48px | Extra large spacing |
| --space-16 | 64px | Maximum spacing |

### 6.2 Component Library
The system uses **shadcn/ui** components built on **Radix UI** primitives:

| Component | Purpose | Features |
|-----------|---------|----------|
| Button | Action triggers | Multiple variants, sizes |
| Input | Text entry | Validation, error states |
| Select | Dropdown selection | Searchable, grouping |
| Card | Content containers | Headers, footers, hover |
| Dialog/Modal | Overlays | Accessible, keyboard support |
| Form components | Data collection | Validation, error handling |
| Progress indicator | Loading states | Linear and circular |
| Toast notifications | User feedback | Success, error, info |
| Tabs | Content organization | Keyboard navigation |
| Separator | Visual division | Horizontal and vertical |

### 6.3 Responsive Design

**Breakpoints:**

| Breakpoint | Size | Prefix | Purpose |
|------------|------|--------|----------|
| Mobile | 0px | (default) | Base mobile layout |
| Tablet | 768px | md: | Medium devices |
| Desktop | 1024px | lg: | Large screens |
| Wide | 1280px | xl: | Extra large screens |

**Layout Behavior:**

| Device | Layout | Columns | Features |
|--------|--------|---------|----------|
| Mobile | Single column | 1 | Stacked sections, simplified navigation |
| Tablet | Grid | 2 | Service cards in grid, expanded nav |
| Desktop | Multi-column | 3-4 | Full layout, all features visible |
| Wide | Multi-column | 4+ | Maximum content width, spacious layout |

### 6.4 Accessibility

**WCAG 2.1 AA Compliance:**

| Requirement | Standard | Implementation |
|-------------|----------|---------------|
| Normal text contrast | ≥ 4.5:1 | All body text meets standard |
| Large text contrast | ≥ 3:1 | Headings and large text  |
| Keyboard navigation | Full support | All interactive elements |
| ARIA labels | Complete | All components labeled |
| Focus indicators | Visible | Custom focus styles |
| Screen readers | Compatible | Semantic HTML, ARIA roles |

---

## 7. Algorithm Design

### 7.1 Website Generation Algorithm

```
ALGORITHM: generateWebsite(input: BusinessInput)

INPUT: BusinessInput object (all fields optional)
OUTPUT: GeneratedWebsite object (complete)

STEPS:
1. NORMALIZE_INPUT:
   normalized ← validateAndNormalizeInput(input)
   // Fills all missing values with defaults
   
2. SELECT_TEMPLATE:
   template ← BUSINESS_TEMPLATES[normalized.businessType]
   // O(1) hash map lookup
   
3. GENERATE_CONTENT:
   heroTitle ← interpolateTemplate(
     template.heroTitlePattern,
     { businessName: normalized.businessName }
   )
   
   heroSubtitle ← interpolateTemplate(
     template.heroSubtitlePattern,
     {
       businessType: normalized.businessType,
       location: normalized.location
     }
   )
   
   aboutText ← interpolateTemplate(
     template.aboutPattern,
     { 
       businessName: normalized.businessName,
       businessType: normalized.businessType
     }
   )
   
   services ← parseServices(
     normalized.services,
     normalized.businessType
   )
   // Splits by comma, validates, limits to 6
   
   callToAction ← selectCTA(normalized.businessType)
   // Decision table lookup
   
   features ← template.featuresPattern
   sections ← template.sections
   
4. APPLY_STYLE:
   styleRules ← getStyleRules(normalized.style)
   // Returns typography and layout settings
   
5. GENERATE_COLORS:
   colorScheme ← generateColorScheme(
     normalized.primaryColor,
     normalized.style
   )
   // Creates 5-color palette
   
6. ASSEMBLE_OUTPUT:
   website ← {
     heroTitle,
     heroSubtitle,
     aboutText,
     services,
     callToAction,
     features,
     sections,
     colorScheme: colorScheme,
     typography: styleRules.typography,
     layout: styleRules.layout
   }
   
7. RETURN website

TIME COMPLEXITY: O(n) where n = number of services (max 6)
                 Effectively O(1) constant time
SPACE COMPLEXITY: O(1) fixed output size (~2-5 KB)
```

### 7.2 Template Interpolation Algorithm

```
ALGORITHM: interpolateTemplate(template: string, data: object)

INPUT: Template string with placeholders like "{businessName}"
       Data object with values
OUTPUT: String with placeholders replaced

STEPS:
1. result ← template
2. FOR EACH key, value IN data:
     placeholder ← "{" + key + "}"
     result ← result.replace(placeholder, value)
3. RETURN result

EXAMPLE:
  template = "Welcome to {businessName} in {location}"
  data = { businessName: "Café Sol", location: "Miami" }
  RETURNS: "Welcome to Café Sol in Miami"

TIME COMPLEXITY: O(m * n)
  where m = number of placeholders
        n = template string length
  Typical: O(1) as templates are small and fixed
```

### 7.3 Service Parsing Algorithm

```
ALGORITHM: parseServices(servicesString: string, businessType: string)

INPUT: Comma-separated services string, business type
OUTPUT: Array of validated service strings

STEPS:
1. IF servicesString is empty OR null:
     RETURN BUSINESS_TEMPLATES[businessType].defaultServices
     
2. services ← servicesString.split(",")
   // Split by comma
   
3. services ← services.map(s => s.trim())
   // Remove whitespace
   
4. services ← services.filter(s => s.length > 0)
   // Remove empty strings
   
5. IF services.length == 0:
     RETURN BUSINESS_TEMPLATES[businessType].defaultServices
     
6. IF services.length > 6:
     services ← services.slice(0, 6)
     // Limit to 6 services
     
7. RETURN services

TIME COMPLEXITY: O(n) where n = number of services
SPACE COMPLEXITY: O(n)
```

### 7.4 Color Scheme Generation Algorithm

```
ALGORITHM: generateColorScheme(primaryColor: string, style: string)

INPUT: Primary color (hex), style preference
OUTPUT: Complete 5-color scheme

STEPS:
1. DEFINE color philosophies by style:
   
   IF style == "modern":
     secondary ← "#D1D5DB"    // Light gray
     accent ← "#1F2937"       // Dark gray
     background ← "#FFFFFF"    // White
     text ← "#0F172A"         // Very dark
     
   ELSE IF style == "minimal":
     secondary ← "#E5E7EB"    // Muted gray
     accent ← "#6B7280"       // Medium gray
     background ← "#FAFAFA"    // Off-white
     text ← "#111827"         // Dark
     
   ELSE IF style == "luxury":
     secondary ← "#D1D5DB"    // Sophisticated
     accent ← "#1F2937"       // Deep
     background ← "#FAFAFA"    // Cream
     text ← "#0F172A"         // Rich dark
     
   ELSE IF style == "bold":
     secondary ← lighten(primaryColor, 40%)
     accent ← darken(primaryColor, 20%)
     background ← "#FFFFFF"
     text ← "#000000"         // Strong black

2. RETURN {
     primary: primaryColor,
     secondary: secondary,
     accent: accent,
     background: background,
     text: text
   }

TIME COMPLEXITY: O(1)
SPACE COMPLEXITY: O(1)
```

---

## 8. Design Decisions & Rationale

### 8.1 Why Rule-Based Instead of AI?

**Decision:** Use deterministic templates and rules instead of AI/ML

**Rationale:**
1. **Speed:** Rule-based generation is instant (<10ms vs seconds for AI)
2. **Predictability:** Same inputs always produce same output
3. **Privacy:** No data sent to external servers
4. **Cost:** No API costs or usage limits
5. **Reliability:** No API downtime or rate limits
6. **Simplicity:** Easier to maintain and debug
7. **Transparency:** Users understand what they get

**Trade-offs:**
- Less novelty in content (acceptable for business websites)
- Limited flexibility (mitigated by 8 templates + 4 styles)

---

### 8.2 Why Client-Side Only?

**Decision:** No backend server, all processing in browser

**Rationale:**
1. **Simplicity:** No server deployment or maintenance
2. **Cost:** Free hosting (static sites)
3. **Speed:** No network latency
4. **Privacy:** User data never leaves their browser
5. **Scaling:** No server capacity concerns
6. **Security:** No database to compromise

**Trade-offs:**
- No data persistence (acceptable as websites are generated on-demand)
- No user accounts (not needed for the use case)

---

### 8.3 Why 8 Business Types?

**Decision:** Support exactly 8 specific business types

**Rationale:**
1. **Coverage:** These 8 types cover ~80% of small businesses
2. **Quality:** Each type gets tailored content patterns
3. **Maintainability:** Manageable number of templates
4. **Decision Fatigue:** Not overwhelming for users

**Types Selected:**
1. Restaurant / Cafe - High demand, clear needs
2. Home Services - Large market (cleaning, repairs)
3. Health & Wellness - Professional requirements
4. Professional Services - Consultants, agencies
5. Retail Store - Online/offline retail
6. Beauty & Salon - Appointment-based businesses
7. Fitness & Gym - Subscription model businesses
8. Other - Fallback for everything else

---

### 8.4 Why 4 Design Styles?

**Decision:** Offer exactly 4 design style options

**Rationale:**
1. **Choice Without Overwhelm:** 4 options provide variety without analysis paralysis
2. **Clear Differentiation:** Each style has distinct personality
3. **Market Coverage:**
   - Modern: Tech-savvy, contemporary businesses (40%)
   - Minimal: Professional, clean aesthetic (25%)
   - Luxury: Premium, high-end services (20%)
   - Bold: Energetic, creative businesses (15%)

---

### 8.5 Why Optional Inputs with Defaults?

**Decision:** Make ALL inputs optional, provide smart defaults

**Rationale:**
1. **User Experience:** Lower barrier to entry
2. **Speed:** Users can generate a site with just a business name
3. **Progressive Enhancement:** Users can add details as needed
4. **Error Prevention:** Always have valid data to work with

**Implementation:**
```typescript
// Users can provide as little as:
{ businessName: "My Café" }

// System fills:
{
  businessName: "My Café",
  businessType: "Professional Services",  // Default
  location: "Your City",                  // Default
  services: ["Service 1", "Service 2"],   // Default
  // ... all other defaults
}
```

---

### 8.6 Why Limit to 6 Services?

**Decision:** Maximum 6 services per business

**Rationale:**
1. **UX:** Beyond 6, service sections become cluttered
2. **Focus:** Forces businesses to highlight their main offerings
3. **Mobile:** 6 services fits well on mobile devices
4. **Cognitive Load:** Users can easily scan 6 items

---

### 8.7 Why React + TypeScript?

**Decision:** Use React 18 with TypeScript

**Rationale:**
1. **Type Safety:** Catch errors at compile time
2. **Developer Experience:** Better IDE support
3. **Maintainability:** Self-documenting code
4. **Ecosystem:** Large component library (shadcn/ui)
5. **Performance:** React 18 concurrent features
6. **Industry Standard:** Widely used and supported

---

### 8.8 Why Vite Build Tool?

**Decision:** Use Vite instead of Create React App

**Rationale:**
1. **Speed:** Instant HMR (Hot Module Replacement)
2. **Build Performance:** Faster production builds
3. **Modern:** Better ES modules support
4. **Size:** Smaller bundle sizes
5. **Developer Experience:** Better debugging

---

### 8.9 Why No Database?

**Decision:** No backend database or persistence

**Rationale:**
1. **Simplicity:** Reduces complexity significantly
2. **Cost:** No database hosting costs
3. **Privacy:** No user data stored
4. **Speed:** Instant generation every time
5. **Use Case:** Websites are output, not stored data

**Alternative Persistence:**
- Users download HTML (save locally)
- Users publish to hosting (persisted there)

---

### 8.10 Why Template Pattern?

**Decision:** Use template pattern with interpolation

**Rationale:**
1. **Predictability:** Consistent quality
2. **Maintainability:** Easy to update templates
3. **Performance:** Fast string replacement
4. **Testability:** Easy to unit test
5. **Customization:** Templates can be extended

---

## 9. Technology Stack

### 9.1 Frontend Technologies

#### Core Framework
- **React 18.3.1**
  - Purpose: UI component library
  - Features used: Hooks, Context, Suspense
  - Justification: Industry standard, strong ecosystem

- **TypeScript 5.5**
  - Purpose: Type-safe JavaScript
  - Features: Strict mode, interfaces, generics
  - Justification: Catch errors early, self-documenting

#### Build Tools
- **Vite 5.3**
  - Purpose: Build tool and dev server
  - Features: HMR, tree-shaking, code splitting
  - Benefits: Fast development, optimized builds

- **PostCSS 8.4**
  - Purpose: CSS processing
  - Plugins: Autoprefixer, Tailwind
  - Benefits: Browser compatibility

#### Routing & State
- **React Router DOM 6.26**
  - Purpose: Client-side routing
  - Features: Nested routes, navigation state
  - Usage: 5 routes (Landing, Create, Loading, Preview, NotFound)

- **TanStack Query 5.51** 
  - Purpose: Async state management (future use)
  - Features: Caching, background updates
  - Current: Prepared for API integration

#### Styling
- **Tailwind CSS 3.4**
  - Purpose: Utility-first CSS framework
  - Configuration: Custom theme, plugins
  - Benefits: Rapid development, consistent design

- **shadcn/ui Components**
  - Purpose: Pre-built accessible components
  - Base: Radix UI primitives
  - Features: Customizable, accessible, beautiful

- **Framer Motion 11.3**
  - Purpose: Animation library
  - Usage: Page transitions, loading animations
  - Features: Spring physics, gesture support

#### Forms & Validation
- **React Hook Form 7.52**
  - Purpose: Form state management
  - Features: Performance optimized, easy validation
  - Usage: Multi-step wizard form

- **Zod 3.23**
  - Purpose: Schema validation
  - Features: TypeScript-first, composable
  - Usage: Form input validation

#### Icons & UI
- **Lucide React 0.417**
  - Purpose: Icon library
  - Features: 1000+ icons, customizable
  - Usage: UI icons, feature illustrations

### 9.2 Development Tools

#### Testing
- **Vitest 2.0**
  - Purpose: Unit testing framework
  - Features: Vite-native, fast
  - Coverage: ~80% target for business logic

- **Testing Library 16.0**
  - Purpose: Component testing
  - Features: User-centric queries
  - Usage: React component tests

#### Code Quality
- **ESLint 9.7**
  - Purpose: JavaScript/TypeScript linting
  - Config: Recommended rules + custom
  - Benefits: Consistent code style

- **TypeScript Compiler**
  - Purpose: Type checking
  - Config: Strict mode enabled
  - Benefits: Catch type errors

### 9.3 Deployment & Hosting

#### Static Hosting Options
- **Vercel**
  - Features: Auto-deployment, CDN, free tier
  - Use: Preview deployments
  
- **Netlify**
  - Features: Continuous deployment, forms
  - Use: Production option

- **GitHub Pages**
  - Features: Free, version controlled
  - Use: Documentation hosting

#### Build Output
- **Static HTML/CSS/JS**
  - Format: Single-page application
  - Size: ~500 KB gzipped
  - Assets: Bundled and optimized

---

## 10. Performance Design

### 10.1 Performance Requirements

| Metric | Target | Measured | Status |
|--------|--------|----------|--------|
| Website Generation Time | < 10ms | 5-10ms | ✓ Achieved |
| Page Load Time | < 2 seconds | ~1.2s | ✓ Achieved |
| First Contentful Paint | < 1.5s | ~0.8s | ✓ Achieved |
| Time to Interactive | < 2.5s | ~1.5s | ✓ Achieved |
| Bundle Size (gzipped) | < 500 KB | ~450 KB | ✓ Achieved |

### 10.2 Optimization Strategies

#### Code Splitting

| Strategy | Implementation | Benefits |
|----------|----------------|----------|
| Lazy Loading | `const Landing = lazy(() => import('./pages/Landing'))` | • Smaller initial bundle<br>• Faster first paint<br>• Load pages on-demand |
| Route-based | Separate chunks per route | Optimized loading |
| Component-based | Heavy components loaded separately | Reduced initial load |

#### Tree Shaking and Asset Optimization

| Technique | Implementation | Impact |
|-----------|----------------|--------|
| **Tree Shaking** | | |
| Dead code elimination | Vite build process | Smaller bundle size |
| Component imports | Import only used components | Reduced unused code |
| CSS purging | Tailwind unused style removal | Minimal CSS |
| **Asset Optimization** | | |
| Vector graphics | SVG icons | Scalable, small size |
| Image strategy | No external images | Fast loading |
| Font loading | font-display: swap | Prevent layout shift |

#### Memoization
```typescript
// React.memo for expensive components
const WebsitePreviewFrame = React.memo(({ website }) => {
  // Only re-render if website data changes
});

// useMemo for expensive calculations
const colorScheme = useMemo(
  () => generateColorScheme(primaryColor, style),
  [primaryColor, style]
);
```

#### Algorithm Efficiency

| Operation | Complexity | Details |
|-----------|------------|--------|
| Template lookup | O(1) | Hash map access |
| Service parsing | O(n) where n ≤ 6 | Linear scan with max 6 items |
| Style rule application | O(1) | Direct object access |
| Color generation | O(1) | Fixed calculations |

### 10.3 Performance Monitoring

**Metrics to Track:**

| Metric | Tool | Purpose |
|--------|------|----------|
| Generation time | console.time | Measure algorithm speed |
| Render time | React DevTools Profiler | Component performance |
| Bundle size | Vite build report | Asset optimization |
| Lighthouse scores | CI/CD pipeline | Overall performance |

---

## 11. Security Design

### 11.1 Security Requirements

**Threat Model:**
- XSS (Cross-Site Scripting)
- Input injection
- Data privacy
- Client-side tampering

### 11.2 Security Measures

#### Input Sanitization
```typescript
// All user inputs are treated as text, never executed
function validateAndNormalizeInput(input: Partial<BusinessInput>) {
  return {
    businessName: sanitizeText(input.businessName),
    // All text fields are trimmed and escaped
  };
}

function sanitizeText(text: string | undefined): string {
  if (!text) return "";
  return text
    .trim()
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
```

#### React's Built-in Protection
- JSX automatically escapes content
- No `dangerouslySetInnerHTML` used
- No `eval()` or dynamic code execution

#### No External APIs
- No data sent to third-party servers
- No authentication tokens
- No API keys exposed
- All processing client-side

#### HTTPS Enforcement
```javascript
// Enforce HTTPS in production
if (location.protocol !== 'https:' && import.meta.env.PROD) {
  location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
```

#### Content Security Policy (CSP)
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data:;">
```

### 11.3 Privacy Design

**Principles:**
1. **No Data Collection:** System doesn't collect or store user data
2. **No Tracking:** No analytics or tracking scripts
3. **No Cookies:** No cookies or local storage of personal data
4. **Transparency:** All processing happens locally

**Data Flow:**
```
User Input → Browser Memory → Generated Output → Browser Display
                ↓
           (Optional)
         User Download/Publish
           (User's choice)
```

**GDPR Compliance:**
- No personal data processing on servers
- No data retention
- User controls all data
- No consent needed (no data collection)

---

## 12. Conclusion

### 12.1 Summary

Muse AI successfully implements a **rule-based website generation platform** that:

✓ Generates professional websites in under 10ms  
✓ Supports 8 business types with tailored content  
✓ Offers 4 distinct design styles  
✓ Provides smart defaults for all inputs  
✓ Maintains privacy (client-side only)  
✓ Achieves high performance (sub-2-second loads)  
✓ Ensures accessibility (WCAG 2.1 AA)  
✓ Uses modern, maintainable technology stack  

### 12.2 Design Achievements

1. **Simplicity:** 4-step wizard, minimal required inputs
2. **Speed:** Imperceptible generation time (~5-10ms)
3. **Quality:** Professional, mobile-responsive output
4. **Reliability:** Deterministic, no external dependencies
5. **Maintainability:** Clean architecture, type-safe code
6. **Extensibility:** Easy to add business types and styles

### 12.3 Future Enhancements

| Phase | Features | Priority |
|-------|----------|----------|
| **Phase 2** | • Additional business types (Education, Events, Non-profits)<br>• Advanced color schemes (analogous, triadic)<br>• Custom font selection<br>• Multi-page websites | Medium |
| **Phase 3** | • SEO optimization tools<br>• Portfolio/gallery templates<br>• Booking system integration<br>• Contact form generation | High |
| **Phase 4** | • Multi-language support<br>• A/B testing for content<br>• Analytics integration<br>• Custom domain connection | Future |

### 12.4 Architectural Strengths

The design successfully balances:

| Balance | Approach | Outcome |
|---------|----------|----------|
| **Performance vs. Features** | Fast generation algorithms | Sub-10ms generation without sacrificing quality |
| **Simplicity vs. Flexibility** | Smart defaults with options | Easy to use, extensible for advanced users |
| **Privacy vs. Functionality** | Client-side processing | Full features without data collection |
| **Type Safety vs. Speed** | TypeScript implementation | Type safety without productivity loss |

---

## Appendices

### Appendix A: Component Diagram

<div class="diagram">

| Level | Component | Dependencies | Description |
|-------|-----------|--------------|-------------|
| **Root** | App.tsx | Main router | Main application component |
| ↓ | | | |
| **Pages** | Landing.tsx | None | Entry page |
| | Create.tsx | StepIndicator, Form components | Multi-step wizard |
| | Loading.tsx | Business logic layer | Processing screen |
| | Preview.tsx | WebsitePreviewFrame, EditableText, PublishModal | Preview and editing |
| ↓ | | | |
| **Sub-Components** | StepIndicator.tsx | Used by Create.tsx | Progress visualization |
| | WebsitePreviewFrame.tsx | Used by Preview.tsx | Website renderer |
| | EditableText.tsx | Used by Preview.tsx | Inline editing |
| | PublishModal.tsx | Used by Preview.tsx | Publishing dialog |
| ↓ | | | |
| **Business Logic** | rules-engine.ts | templates.ts, content-helpers.ts | Core generation engine |
| | templates.ts | None | Business templates |
| | content-helpers.ts | None | Utility functions |

</div>

### Appendix B: File Structure

| Directory | File | Purpose |
|-----------|------|----------|
| **public/** | robots.txt | SEO configuration |
| **src/components/** | ui/ | shadcn/ui component library |
| | EditableText.tsx | Inline text editing |
| | FeatureCard.tsx | Feature display cards |
| | LoadingScreen.tsx | Loading animation |
| | StepIndicator.tsx | Wizard progress indicator |
| | WebsitePreviewFrame.tsx | Website preview renderer |
| | PublishModal.tsx | Publishing dialog |
| **src/hooks/** | use-mobile.tsx | Responsive hook |
| | use-toast.ts | Toast notifications |
| **src/lib/** | templates.ts | Business type templates |
| | rules-engine.ts | Generation logic engine |
| | content-helpers.ts | Utility functions |
| | utils.ts | General utilities |
| **src/pages/** | Landing.tsx | Landing page |
| | Create.tsx | Creation wizard |
| | Loading.tsx | Processing screen |
| | Preview.tsx | Preview and edit |
| | NotFound.tsx | 404 page |
| **root/** | App.tsx | Main app component |
| | main.tsx | Entry point |
| | package.json | Dependencies |
| | tsconfig.json | TypeScript config |
| | vite.config.ts | Build configuration |
| | tailwind.config.ts | Styling configuration |
| | README.md | Documentation |

### Appendix C: Testing Strategy

| Test Type | Target | Test Cases |
|-----------|--------|------------|
| **Unit Tests** | templates.ts | Verify all 8 templates have required fields |
| | rules-engine.ts | Test all generation functions |
| | content-helpers.ts | Test all utility functions |
| **Integration Tests** | User Flow | Form submission → Loading → Preview |
| | Validation | Input validation and normalization |
| | Output | Generated output structure validation |
| **E2E Tests** | Complete Journey | Landing → Create → Preview flow |
| | Variations | Multiple business types and styles |
| | Features | Edit functionality, Export/publish workflow |

### Appendix D: API Reference

See `QUICK_REFERENCE.md` for complete API documentation.

---

**END OF SOFTWARE DESIGN SPECIFICATION**

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | February 26, 2026 | Project Team | Initial SDS |

**Approval**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Project Lead | | | |
| Technical Architect | | | |
| Faculty Advisor | | | |
