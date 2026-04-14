import { motion } from "framer-motion";
import { BrandMark } from "@/components/BrandMark";

const loadingSteps = [
  "Analyzing your business details...",
  "Creating your content...",
  "Designing your layout...",
  "Optimizing for mobile...",
  "Adding finishing touches...",
];

interface LoadingScreenProps {
  currentStep?: number;
}

const monogramSegments = [
  {
    id: "left-column",
    color: "#0f2740",
    points: "28,24 52,24 52,132 28,132",
    initial: { x: 22, y: 12, opacity: 0, scaleY: 0.4 },
  },
  {
    id: "left-peak",
    color: "#20d3b4",
    points: "52,24 78,24 112,82 86,82",
    initial: { x: -12, y: 18, opacity: 0, scale: 0.7 },
  },
  {
    id: "right-peak",
    color: "#15bfa3",
    points: "112,82 146,24 172,24 138,82",
    initial: { x: 12, y: 18, opacity: 0, scale: 0.7 },
  },
  {
    id: "right-column",
    color: "#0b1d31",
    points: "148,24 172,24 172,132 148,132",
    initial: { x: -22, y: 12, opacity: 0, scaleY: 0.4 },
  },
] as const;

export const LoadingScreen = ({ currentStep = 0 }: LoadingScreenProps) => {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#f6f8fa] text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(32,211,180,0.18),_transparent_32%),linear-gradient(135deg,_rgba(15,39,64,0.06),_transparent_45%)]" />
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(15,39,64,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,39,64,0.06)_1px,transparent_1px)] [background-size:72px_72px]" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex min-h-screen w-full items-center justify-center p-6"
      >
        <div className="w-full max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-xl rounded-[2rem] border border-white/70 bg-white/80 px-6 py-10 shadow-[0_30px_80px_rgba(11,29,49,0.12)] backdrop-blur"
          >
            <div className="relative mx-auto mb-10 flex h-48 w-48 items-center justify-center">
              <motion.div
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{ duration: 16, ease: "linear", repeat: Infinity }}
                className="absolute inset-2 rounded-full border border-dashed border-[#20d3b4]/35"
              />
              <motion.div
                aria-hidden="true"
                animate={{ scale: [1, 1.04, 1], opacity: [0.35, 0.55, 0.35] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-6 rounded-full bg-[radial-gradient(circle,_rgba(32,211,180,0.18),_transparent_68%)]"
              />

              <svg viewBox="0 0 200 160" className="relative z-10 h-40 w-40 overflow-visible">
                {monogramSegments.map((segment, index) => (
                  <motion.polygon
                    key={segment.id}
                    points={segment.points}
                    fill={segment.color}
                    initial={segment.initial}
                    animate={{ x: 0, y: 0, opacity: 1, scale: 1, scaleY: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.18,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                ))}
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4"
            >
              <div className="flex items-center justify-center gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.88, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#0f2740]/10 bg-slate-50 shadow-[0_12px_30px_rgba(11,29,49,0.08)] sm:h-16 sm:w-16"
                >
                  <BrandMark className="h-9 w-9 sm:h-10 sm:w-10" />
                </motion.div>
                <div className="text-left">
                  <p className="text-[1.9rem] font-semibold tracking-[0.08em] text-[#0b1d31] sm:text-[2.2rem]">
                    Muse - AI
                  </p>
                  <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.44em] text-slate-500 sm:text-[0.72rem]">
                    Website Generation Engine
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.45 }}
              className="mb-3 text-xl font-semibold text-slate-800 sm:text-2xl"
            >
              Constructing your website...
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.45 }}
              className="mx-auto mb-8 max-w-md text-sm leading-6 text-slate-500 sm:text-base"
            >
              Layer by layer, Muse is assembling a precise layout, polished content, and a clean responsive structure.
            </motion.p>

            <div className="mx-auto mb-8 h-px w-full max-w-sm bg-[linear-gradient(90deg,transparent,rgba(11,29,49,0.18),transparent)]" />

            <div className="mx-auto space-y-3 text-left sm:max-w-sm">
              {loadingSteps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: index <= currentStep ? 1 : 0.35,
                    x: 0,
                  }}
                  transition={{ delay: 1.15 + index * 0.12 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <motion.div
                    animate={index === currentStep ? { scale: [1, 1.12, 1] } : {}}
                    transition={{ duration: 1.1, repeat: index === currentStep ? Infinity : 0 }}
                    className={`h-2.5 w-2.5 rounded-full ${index < currentStep
                      ? "bg-[#20d3b4]"
                      : index === currentStep
                        ? "bg-[#0f2740]"
                        : "bg-slate-300"
                      }`}
                  />
                  <span className={index <= currentStep ? "text-slate-700" : "text-slate-400"}>
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.35 }}
              className="mx-auto mt-8 max-w-sm"
            >
              <motion.div
                className="h-1.5 overflow-hidden rounded-full bg-slate-200"
                initial={false}
              />
              <motion.div
                className="-mt-1.5 h-1.5 rounded-full bg-[linear-gradient(90deg,#0f2740,#20d3b4)]"
                initial={{ width: "20%" }}
                animate={{ width: `${((currentStep + 1) / loadingSteps.length) * 100}%` }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
