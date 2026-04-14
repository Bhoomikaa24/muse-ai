/**
 * Website Templates by Business Type
 * Rule-based template system with sensible defaults
 */

export interface BusinessTemplate {
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

export const BUSINESS_TEMPLATES: Record<string, BusinessTemplate> = {
  "Restaurant / Cafe": {
    name: "Restaurant & Cafe",
    defaultServices: ["Dine-in Service", "Takeout", "Catering", "Private Events"],
    heroTitlePattern: "Welcome to {businessName}",
    heroSubtitlePattern:
      "Experience exceptional cuisine at {businessName} in {location}. Fresh ingredients, authentic flavors, and unforgettable dining.",
    aboutPattern:
      "At {businessName}, we believe great food brings people together. Our chefs craft every dish with passion, using the finest ingredients to deliver an unforgettable culinary experience.",
    callToActionOptions: ["Reserve a Table", "Order Online", "View Menu", "Make a Reservation"],
    featuresPattern: [
      "Authentic recipes and fresh ingredients",
      "Cozy ambiance and friendly service",
      "Daily specials and seasonal menus",
      "Perfect for celebrations and events",
    ],
    sections: ["hero", "about", "services", "menu-preview", "hours", "contact"],
    keywordsByType: ["dining", "cuisine", "reservations", "catering", "menu"],
  },
  "Home Services": {
    name: "Home Services",
    defaultServices: ["Cleaning", "Maintenance", "Repairs", "Installation"],
    heroTitlePattern: "Your Trusted {businessName} Experts",
    heroSubtitlePattern:
      "Professional home services you can rely on. Serving {location} with excellence since day one.",
    aboutPattern:
      "We provide reliable, professional home services with attention to detail. Our experienced team is committed to exceeding your expectations on every job.",
    callToActionOptions: ["Get Free Estimate", "Schedule Service", "Book Now", "Request Quote"],
    featuresPattern: [
      "Licensed and insured professionals",
      "Quick response times",
      "Transparent pricing",
      "Satisfaction guaranteed",
    ],
    sections: ["hero", "services", "about", "process", "testimonials", "contact"],
    keywordsByType: ["professional", "reliable", "experienced", "licensed", "insured"],
  },
  "Health & Wellness": {
    name: "Health & Wellness",
    defaultServices: ["Consultations", "Treatments", "Wellness Programs", "Follow-up Care"],
    heroTitlePattern: "Your Health Matters",
    heroSubtitlePattern:
      "Quality healthcare and wellness services in {location}. {businessName} is dedicated to your well-being.",
    aboutPattern:
      "We provide compassionate, professional health and wellness services. Our team is committed to helping you achieve optimal health and quality of life.",
    callToActionOptions: ["Book Appointment", "Schedule Consultation", "Learn More", "Contact Us"],
    featuresPattern: [
      "Licensed practitioners",
      "Personalized care plans",
      "Modern facilities",
      "Patient-centered approach",
    ],
    sections: ["hero", "services", "about", "credentials", "testimonials", "contact"],
    keywordsByType: ["healthcare", "wellness", "professional", "quality", "personalized"],
  },
  "Professional Services": {
    name: "Professional Services",
    defaultServices: ["Consulting", "Strategy", "Implementation", "Support"],
    heroTitlePattern: "Professional Solutions for {businessType}",
    heroSubtitlePattern:
      "Expert {businessType} services delivered with precision. {businessName} helps businesses succeed in {location}.",
    aboutPattern:
      "With extensive industry experience, {businessName} delivers strategic solutions tailored to your business needs. We're committed to your success.",
    callToActionOptions: ["Start Consultation", "Request Proposal", "Get in Touch", "Learn More"],
    featuresPattern: [
      "Experienced professionals",
      "Custom solutions",
      "Proven track record",
      "Results-driven approach",
    ],
    sections: ["hero", "services", "about", "expertise", "case-studies", "contact"],
    keywordsByType: ["professional", "expertise", "strategic", "results", "solution"],
  },
  "Retail Store": {
    name: "Retail Store",
    defaultServices: ["Shopping", "Product Selection", "Deliveries", "Returns"],
    heroTitlePattern: "Shop at {businessName}",
    heroSubtitlePattern:
      "Discover quality products and exceptional service at {businessName} in {location}. Your shopping destination.",
    aboutPattern:
      "{businessName} is your one-stop shop for quality products and outstanding customer service. We're dedicated to making your shopping experience enjoyable.",
    callToActionOptions: ["Shop Now", "View Collection", "Browse Products", "Visit Store"],
    featuresPattern: [
      "Wide selection of products",
      "Competitive pricing",
      "Fast delivery options",
      "Easy returns",
    ],
    sections: ["hero", "featured-products", "about", "services", "promotions", "contact"],
    keywordsByType: ["shopping", "products", "quality", "variety", "service"],
  },
  "Beauty & Salon": {
    name: "Beauty & Salon",
    defaultServices: ["Haircut", "Styling", "Coloring", "Treatments", "Manicure"],
    heroTitlePattern: "Beautiful You at {businessName}",
    heroSubtitlePattern:
      "Premium beauty and salon services in {location}. Let us help you look and feel your best.",
    aboutPattern:
      "{businessName} is your sanctuary for beauty and wellness. Our skilled professionals use premium products to deliver exceptional results.",
    callToActionOptions: ["Book Appointment", "View Services", "Reserve Now", "Get Pampered"],
    featuresPattern: [
      "Professional stylists",
      "Premium products",
      "Relaxing atmosphere",
      "Customized services",
    ],
    sections: ["hero", "services", "about", "gallery", "team", "contact"],
    keywordsByType: ["beauty", "salon", "styling", "professional", "premium"],
  },
  "Fitness & Gym": {
    name: "Fitness & Gym",
    defaultServices: ["Gym Membership", "Personal Training", "Group Classes", "Nutrition Coaching"],
    heroTitlePattern: "Transform Your Fitness Journey",
    heroSubtitlePattern:
      "State-of-the-art fitness center in {location}. Join {businessName} and achieve your health goals.",
    aboutPattern:
      "We're dedicated to helping you achieve your fitness goals in a supportive, motivating environment. {businessName} is your partner in health.",
    callToActionOptions: ["Join Now", "Start Trial", "Get Details", "Schedule Tour"],
    featuresPattern: [
      "Modern equipment",
      "Expert trainers",
      "Flexible membership plans",
      "Supportive community",
    ],
    sections: ["hero", "services", "about", "trainers", "testimonials", "contact"],
    keywordsByType: ["fitness", "gym", "training", "health", "wellness"],
  },
  Other: {
    name: "General Business",
    defaultServices: ["Service 1", "Service 2", "Service 3"],
    heroTitlePattern: "Welcome to {businessName}",
    heroSubtitlePattern:
      "Quality service and exceptional value in {location}. {businessName} is here to serve you.",
    aboutPattern:
      "{businessName} is committed to providing excellent service and value. We take pride in everything we do and the relationships we build.",
    callToActionOptions: ["Contact Us", "Learn More", "Get Started", "Book Now"],
    featuresPattern: [
      "Professional service",
      "Quality focus",
      "Customer satisfaction",
      "Reliable support",
    ],
    sections: ["hero", "services", "about", "contact"],
    keywordsByType: ["professional", "quality", "service", "reliable"],
  },
};

/**
 * Default values for optional fields
 */
export const DEFAULTS = {
  businessName: "My Business",
  businessType: "Professional Services",
  location: "Your City",
  services: "Service 1, Service 2, Service 3",
  phone: "(555) 000-0000",
  email: "hello@mybusiness.com",
  address: "Your Address Here",
  style: "modern" as const,
  primaryColor: "#14B8A6",
};

export const BUSINESS_TYPES = Object.keys(BUSINESS_TEMPLATES);
