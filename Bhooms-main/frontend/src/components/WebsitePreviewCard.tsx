import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WebsitePreviewCardProps {
  title: string;
  category: string;
  imageUrl?: string;
  className?: string;
}

export const WebsitePreviewCard = ({ title, category, imageUrl, className }: WebsitePreviewCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group cursor-pointer overflow-hidden rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300",
        className
      )}
    >
      {/* Browser Frame */}
      <div className="bg-muted px-4 py-3 flex items-center gap-2 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
          <div className="w-3 h-3 rounded-full bg-green-400/60" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-background rounded-md px-3 py-1 text-xs text-muted-foreground truncate">
            {title.toLowerCase().replace(/\s+/g, '')}.com
          </div>
        </div>
      </div>
      
      {/* Preview Content */}
      <div className="aspect-[4/3] bg-gradient-to-br from-accent/50 to-muted relative overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-[80%] space-y-3">
              <div className="h-6 bg-foreground/10 rounded-md w-3/4 mx-auto" />
              <div className="h-3 bg-foreground/5 rounded w-full" />
              <div className="h-3 bg-foreground/5 rounded w-5/6" />
              <div className="h-8 gradient-primary rounded-lg w-1/2 mx-auto mt-4" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Info */}
      <div className="p-4">
        <span className="text-xs font-medium text-primary uppercase tracking-wide">{category}</span>
        <h3 className="text-foreground font-semibold mt-1">{title}</h3>
      </div>
    </motion.div>
  );
};
