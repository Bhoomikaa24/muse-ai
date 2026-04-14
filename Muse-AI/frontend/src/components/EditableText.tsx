import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export const EditableText = ({ value, onChange, className, as: Component = "span" }: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue.trim()) {
      onChange(editValue);
    } else {
      setEditValue(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn(
          "bg-transparent border-b-2 border-primary outline-none w-full",
          className
        )}
      />
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="group relative cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      <Component className={cn("transition-colors", className)}>
        {value}
      </Component>
      <div className="absolute inset-0 rounded-md border-2 border-transparent group-hover:border-primary/30 group-hover:bg-primary/5 transition-all -m-1 p-1" />
    </motion.div>
  );
};
