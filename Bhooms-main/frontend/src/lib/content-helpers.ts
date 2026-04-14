/**
 * Content Generation Utilities
 * Helper functions for generating website content
 */

/**
 * Generate meta description based on business info
 */
export function generateMetaDescription(
  businessName: string,
  businessType: string,
  location: string
): string {
  return `Discover ${businessName}, your trusted ${businessType.toLowerCase()} in ${location}. Professional service, quality results.`;
}

/**
 * Generate page title
 */
export function generatePageTitle(businessName: string, businessType: string): string {
  return `${businessName} - ${businessType}`;
}

/**
 * Format phone number (simple formatting)
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate WhatsApp link
 */
export function generateWhatsAppLink(phone: string, message?: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const baseUrl = "https://wa.me/" + cleaned;
  if (message) {
    return baseUrl + "?text=" + encodeURIComponent(message);
  }
  return baseUrl;
}

/**
 * Generate Google Maps link
 */
export function generateGoogleMapsLink(address: string, businessName: string): string {
  const query = encodeURIComponent(`${businessName}, ${address}`);
  return `https://www.google.com/maps/search/${query}`;
}

/**
 * Generate testimonial placeholder
 */
export function generateTestimonial(businessType: string): string {
  const testimonials: Record<string, string> = {
    "Restaurant / Cafe": "Excellent food and wonderful atmosphere. Highly recommend!",
    "Home Services": "Professional, reliable, and trustworthy. Will definitely use again.",
    "Health & Wellness": "Caring staff and excellent care. Very satisfied with the service.",
    "Professional Services": "Expert advice and professional service. Exceeded my expectations.",
    "Retail Store": "Great selection and friendly service. Always my first choice.",
    "Beauty & Salon": "Amazing results and relaxing atmosphere. Love coming here!",
    "Fitness & Gym": "Great equipment and supportive staff. Highly motivated to achieve my goals.",
    Other: "Excellent service and great value. Highly satisfied.",
  };

  return testimonials[businessType] || testimonials["Other"];
}

/**
 * Generate FAQ based on business type
 */
export function generateFAQ(
  businessType: string
): Array<{ question: string; answer: string }> {
  const faqs: Record<string, Array<{ question: string; answer: string }>> = {
    "Restaurant / Cafe": [
      {
        question: "Do you offer catering services?",
        answer:
          "Yes, we offer catering for events and gatherings. Please contact us for details.",
      },
      {
        question: "Can I make a reservation online?",
        answer: "Yes, you can book a table through our website or call us directly.",
      },
    ],
    "Home Services": [
      {
        question: "Do you offer free estimates?",
        answer: "Yes, we provide free estimates for all our services.",
      },
      {
        question: "Are you insured?",
        answer: "Yes, we are fully licensed and insured for your protection.",
      },
    ],
    "Health & Wellness": [
      {
        question: "Do you accept insurance?",
        answer:
          "We accept most insurance plans. Please contact us to verify your coverage.",
      },
      {
        question: "How do I schedule an appointment?",
        answer:
          "You can schedule an appointment online, by phone, or by visiting us in person.",
      },
    ],
    "Professional Services": [
      {
        question: "What is your consultation process?",
        answer:
          "We start with a free initial consultation to understand your needs and recommend solutions.",
      },
      {
        question: "Do you work with businesses like mine?",
        answer:
          "We have extensive experience across various industries and would be happy to discuss your specific needs.",
      },
    ],
    "Retail Store": [
      {
        question: "Do you ship nationwide?",
        answer: "Yes, we ship to most locations. Check our shipping policy for details.",
      },
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy on most items. See our return policy for details.",
      },
    ],
    "Beauty & Salon": [
      {
        question: "Do I need an appointment?",
        answer: "Appointments are recommended but we also accept walk-ins when available.",
      },
      {
        question: "What products do you use?",
        answer: "We use premium, professional-grade products for all our services.",
      },
    ],
    "Fitness & Gym": [
      {
        question: "Do you offer trial memberships?",
        answer: "Yes, we offer a free trial week. Come visit us to get started!",
      },
      {
        question: "Do you provide personal training?",
        answer:
          "Yes, our certified trainers offer personalized training sessions and plans.",
      },
    ],
  };

  return faqs[businessType] || [];
}

/**
 * Generate business hours structure
 */
export function generateBusinessHours(): Record<string, { open: string; close: string }> {
  return {
    Monday: { open: "09:00 AM", close: "06:00 PM" },
    Tuesday: { open: "09:00 AM", close: "06:00 PM" },
    Wednesday: { open: "09:00 AM", close: "06:00 PM" },
    Thursday: { open: "09:00 AM", close: "06:00 PM" },
    Friday: { open: "09:00 AM", close: "08:00 PM" },
    Saturday: { open: "10:00 AM", close: "08:00 PM" },
    Sunday: { open: "11:00 AM", close: "05:00 PM" },
  };
}

/**
 * Generate hero image suggestion based on business type
 */
export function getHeroImageSuggestion(businessType: string): string {
  const suggestions: Record<string, string> = {
    "Restaurant / Cafe": "Food, dining, kitchen, warm lighting, people enjoying meals",
    "Home Services": "Professional work, tools, home improvement, before-and-after",
    "Health & Wellness": "Wellness, fitness, people exercising, healthy lifestyle",
    "Professional Services": "Office, meetings, professionals, productivity, success",
    "Retail Store": "Products on display, shopping, customers browsing, shelves",
    "Beauty & Salon": "Salon interior, styling, happy customers, beauty products",
    "Fitness & Gym": "Equipment, people exercising, gym interior, motivation",
    Other: "Professional workspace, people working, modern office",
  };

  return suggestions[businessType] || suggestions["Other"];
}
