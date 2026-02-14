import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className, ...props }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            className={className}
            fill="none"
            {...props}
        >
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
            </defs>

            {/* Hexagon Background */}
            <path
                d="M100 10L186.6 60V140L100 190L13.4 140V60L100 10Z"
                fill="url(#logoGradient)"
                stroke="#334155"
                strokeWidth="2"
            />

            {/* Top Teal Geometric Accents */}
            <path
                d="M100 10L186.6 60H13.4L100 10Z"
                fill="#0d9488"
                fillOpacity="0.9"
            />

            {/* Left Teal Triangle */}
            <path
                d="M13.4 60L56.7 85V60H13.4Z"
                fill="#14b8a6"
                fillOpacity="0.8"
            />

            {/* Right Teal Triangle */}
            <path
                d="M186.6 60L143.3 85V60H186.6Z"
                fill="#14b8a6"
                fillOpacity="0.8"
            />

            {/* Bottom Orange/Pink Accent */}
            <path
                d="M100 190L13.4 140H186.6L100 190Z"
                fill="#ec4899"
            />

            {/* Inner Structure / Bridge Stylization */}
            <path
                d="M60 85L100 50L140 85"
                stroke="#ec4899"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <path
                d="M80 68V85M100 50V85M120 68V85"
                stroke="#ec4899"
                strokeWidth="3"
                strokeLinecap="round"
            />

            {/* Text Group */}
            <g transform="translate(0, 10)">
                <text
                    x="100"
                    y="115"
                    textAnchor="middle"
                    fill="white"
                    fontFamily="sans-serif"
                    fontWeight="bold"
                    fontSize="36"
                    letterSpacing="1"
                >
                    BRIDGE
                </text>
                <text
                    x="100"
                    y="155"
                    textAnchor="middle"
                    fill="white"
                    fontFamily="sans-serif"
                    fontWeight="bold"
                    fontSize="36"
                    letterSpacing="1"
                >
                    UP
                </text>
            </g>
        </svg>
    );
};
