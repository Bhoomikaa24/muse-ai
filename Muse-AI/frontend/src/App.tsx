import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useCallback, useState } from "react";
import Index from "./pages/Index";
import Create from "./pages/Create";
import Loading from "./pages/Loading";
import Preview from "./pages/Preview";
import NotFound from "./pages/NotFound";
import { SplashScreen } from "@/components/SplashScreen";

const queryClient = new QueryClient();
const SPLASH_SESSION_KEY = "muse-ai:splash-seen";

const App = () => {
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    const splashParam = new URLSearchParams(window.location.search).get("splash");

    if (splashParam === "reset") {
      window.sessionStorage.removeItem(SPLASH_SESSION_KEY);
      return true;
    }

    if (splashParam === "1" || splashParam === "true") {
      return true;
    }

    return window.sessionStorage.getItem(SPLASH_SESSION_KEY) !== "1";
  });

  const handleSplashComplete = useCallback(() => {
    window.sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
    setShowSplash(false);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {showSplash ? (
            <SplashScreen onComplete={handleSplashComplete} />
          ) : (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/create" element={<Create />} />
                <Route path="/loading" element={<Loading />} />
                <Route path="/preview" element={<Preview />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          )}
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
