import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BrandMark } from "@/components/BrandMark";

interface SplashScreenProps {
    onComplete: () => void;
    durationMs?: number;
}

export const SplashScreen = ({ onComplete, durationMs = 1800 }: SplashScreenProps) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setIsExiting(true);
        }, durationMs);

        return () => window.clearTimeout(timer);
    }, [durationMs]);

    useEffect(() => {
        if (!isExiting) {
            return;
        }

        const exitTimer = window.setTimeout(() => {
            onComplete();
        }, 280);

        return () => window.clearTimeout(exitTimer);
    }, [isExiting, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed inset-0 z-[999] overflow-hidden bg-white"
        >
            <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center"
                >
                    <motion.div
                        initial={{ scale: 0.92, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.12, duration: 0.45 }}
                        className="mb-5"
                    >
                        <BrandMark className="h-28 w-28 sm:h-32 sm:w-32" iconClassName="h-full w-full" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.24, duration: 0.35 }}
                        className="text-[2rem] font-semibold tracking-[0.04em] text-[#202124]"
                    >
                        Muse AI
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.34, duration: 0.35 }}
                        className="mt-1 text-sm text-slate-500"
                    >
                        Intelligent Website Generation
                    </motion.p>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55, duration: 0.35 }}
                    className="pointer-events-none absolute bottom-8 text-xs text-slate-400"
                >
                    Powered by Muse Engine
                </motion.p>
            </div>
        </motion.div>
    );
};