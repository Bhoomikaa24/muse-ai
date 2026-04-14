import { BusinessInput, GeneratedWebsite } from "./rules-engine";

export async function enhanceWithAI(
  formData: BusinessInput, 
  generatedWeb: GeneratedWebsite
): Promise<GeneratedWebsite> {
  const prompt = `
You are an expert copywriter and web designer. I will give you some business details. 
Generate a highly engaging, converting, and professional website copy in valid JSON format.
Business Name: ${formData.businessName || "My Business"}
Business Type: ${formData.businessType || "Professional Services"}
Location: ${formData.location || "Local"}
Tone: ${formData.tone || "professional"}

Return EXACTLY a JSON object with this shape:
{
  "heroTitle": "Catchy headline here",
  "heroSubtitle": "Engaging subheadline",
  "aboutText": "A 2-3 sentence engaging about us section",
  "features": ["Feature 1", "Feature 2", "Feature 3"],
  "services": [ {"name": "Service 1", "desc": "Short desc"}, {"name": "Service 2", "desc": "Short desc"} ]
}
Do not return any markdown or codeblocks, ONLY clean JSON.
`;

  try {
    const response = await fetch("/api/nvidia/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "yentinglin/llama-3-taiwan-70b-instruct",
        messages: [{ "role": "user", "content": prompt }],
        temperature: 0.5,
        top_p: 1,
        max_tokens: 1024,
        stream: false
      })
    });

    if (!response.ok) {
      console.error("AI Generation failed. Status:", response.status, "Response text:", await response.text());
      return generatedWeb; // Fallback to rule-based
    }

    const data = await response.json();
    console.log("Raw AI Response:", data);
    let aiText = data.choices[0].message.content.trim();
    
    // Clean potential markdown blocks
    aiText = aiText.replace(/^```(json)?/m, '').replace(/```$/m, '');
    console.log("Cleaned AI JSON String:", aiText);
    
    let aiCopy;
    try {
      aiCopy = JSON.parse(aiText);
      console.log("Successfully parsed AI JSON:", aiCopy);
    } catch (parseError) {
      console.error("Failed to parse AI JSON:", parseError, "AI Text:", aiText);
      return generatedWeb;
    }

    // Attempt to generate a Hero Image with NVIDIA API (SD3 Medium)
    let aiHeroImage;
    try {
      const imagePrompt = `A high-quality, professional and modern background image for the hero section of a website. The business specializes in: ${formData.businessType}. Business name: ${formData.businessName}. Ensure interior or relevant ambiance, no text in image.`;
      const imageResponse = await fetch("/api/nvidia-image/v1/genai/stabilityai/stable-diffusion-3-medium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          prompt: imagePrompt
        })
      });
      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        if (imageData.image) {
          aiHeroImage = `data:image/jpeg;base64,${imageData.image}`;
          console.log("Successfully generated AI hero image!");
        }
      } else {
        console.error("AI Image Generation failed. Status:", imageResponse.status);
      }
    } catch (imageErr) {
      console.error("Failed to fetch image generation:", imageErr);
    }

    // Merge AI copy into generated website
    const updatedSections = generatedWeb.sections.map(section => {
      if (section.type === "hero") {
        return {
          ...section,
          headline: aiCopy.heroTitle || section.headline,
          subtext: aiCopy.heroSubtitle || section.subtext,
          imageUrl: aiHeroImage || section.imageUrl
        };
      }
      if (section.type === "about") {
        return {
          ...section,
          content: aiCopy.aboutText || section.content
        };
      }
      if (section.type === "services" && aiCopy.services && aiCopy.services.length > 0) {
        return {
          ...section,
          items: aiCopy.services.map((s: any) => ({ title: s.name, description: s.desc }))
        };
      }
      if (section.type === "why_us" && aiCopy.features && aiCopy.features.length > 0) {
        return {
          ...section,
          points: aiCopy.features
        };
      }
      return section;
    });
    
    const finalWeb = {
      ...generatedWeb,
      sections: updatedSections
    };
    
    console.log("Final merged website before returning:", finalWeb);
    return finalWeb;
  } catch (e) {
    console.error("Error integrating AI:", e);
    return generatedWeb;
  }
}
