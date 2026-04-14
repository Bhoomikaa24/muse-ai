import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, Crown, Check, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessName: string;
}

export const PublishModal = ({ isOpen, onClose, businessName }: PublishModalProps) => {
  const [copied, setCopied] = useState(false);
  const subdomain = businessName.toLowerCase().replace(/\s+/g, '-');
  const freeUrl = `${subdomain}.sitecraft.app`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${freeUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-card rounded-2xl shadow-lg max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Publish Your Website</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Free Option */}
              <div className="p-4 rounded-xl bg-accent/50 border border-border">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1">Free Subdomain</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Your website will be live at:
                    </p>
                    <div className="flex items-center gap-2 bg-background rounded-lg p-2">
                      <span className="text-sm text-foreground truncate flex-1">
                        {freeUrl}
                      </span>
                      <button
                        onClick={handleCopy}
                        className="flex-shrink-0 p-1.5 rounded-md hover:bg-muted transition-colors"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-primary" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pro Option */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent border border-primary/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Crown className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Custom Domain</h3>
                    <p className="text-sm text-muted-foreground">
                      Upgrade to connect your own domain like <span className="font-medium text-foreground">{subdomain}.com</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border bg-muted/30">
              <Button variant="hero" size="lg" className="w-full">
                Publish Website
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                You can always change your domain later
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
