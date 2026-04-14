import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoadingScreen } from "@/components/LoadingScreen";
import { generateWebsite, validateAndNormalizeInput } from "@/lib/rules-engine";
import { enhanceWithAI } from "@/lib/ai-generator";

const Loading = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Simulate AI generation steps
    let isGenerating = false;
    const interval = setInterval(async () => {
      if (isGenerating) return;
      setCurrentStep((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          isGenerating = true;
          
          (async () => {
            // Generate website using rule-based engine
            const formData = location.state?.formData;
            const normalizedInput = validateAndNormalizeInput(formData || {});    
            const generatedWebsite = generateWebsite(normalizedInput);
            
            // Enhance website dynamically using NVIDIA Llama-3 API
            const aiEnhancedWebsite = await enhanceWithAI(normalizedInput, generatedWebsite);

            // Navigate to preview after loading
            setTimeout(() => {
              navigate("/preview", {
                state: {
                  formData,
                  generatedWebsite: aiEnhancedWebsite,
                },
              });
            }, 500);
          })();

          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [navigate, location.state]);

  return <LoadingScreen currentStep={currentStep} />;
};

export default Loading;
