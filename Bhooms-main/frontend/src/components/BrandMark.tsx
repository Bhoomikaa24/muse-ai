type BrandMarkProps = {
    className?: string;
    framed?: boolean;
    iconClassName?: string;
};

const segments = [
    { id: "left-column", color: "#0f2740", points: "28,24 52,24 52,132 28,132" },
    { id: "left-peak", color: "#20d3b4", points: "52,24 78,24 112,82 86,82" },
    { id: "right-peak", color: "#15bfa3", points: "112,82 146,24 172,24 138,82" },
    { id: "right-column", color: "#0b1d31", points: "148,24 172,24 172,132 148,132" },
] as const;

export const BrandMark = ({
    className = "h-10 w-10",
    framed = false,
    iconClassName = "h-[68%] w-[68%]",
}: BrandMarkProps) => {
    const icon = (
        <svg viewBox="0 0 200 160" className={iconClassName} aria-hidden="true">
            {segments.map((segment) => (
                <polygon key={segment.id} points={segment.points} fill={segment.color} />
            ))}
        </svg>
    );

    if (!framed) {
        return <div className={`inline-flex items-center justify-center ${className}`}>{icon}</div>;
    }

    return (
        <div
            className={`inline-flex items-center justify-center rounded-xl border border-[#0f2740]/10 bg-white shadow-[0_10px_24px_rgba(11,29,49,0.08)] ${className}`}
        >
            {icon}
        </div>
    );
};
