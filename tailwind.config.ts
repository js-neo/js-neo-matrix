// src/config/tailwind.config.ts

import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                matrix: {
                    dark: "#0a0a0a",
                    green: "#00ff41",
                    blue: "#00f0ff",
                    purple: "#9d00ff",
                    red: "#ff003c",
                },
            },
            fontFamily: {
                matrix: ["'Fira Code'", "monospace"],
                orbitron: ["Orbitron", "sans-serif"],
            },
            animation: {
                "text-glitch": "glitch 1s infinite alternate",
                "terminal-cursor": "blink 1s infinite",
            },
            keyframes: {
                glitch: {
                    "0%": {
                        transform: "translate(0)",
                        clipPath: "inset(0 0 95% 0)"
                    },
                    "20%": {
                        transform: "translate(-2px, 2px)",
                        clipPath: "inset(0 0 60% 0)"
                    },
                    "40%": {
                        transform: "translate(-2px, -2px)",
                        clipPath: "inset(0 0 30% 0)"
                    },
                    "60%": {
                        transform: "translate(2px, 2px)",
                        clipPath: "inset(0 0 70% 0)"
                    },
                    "80%": {
                        transform: "translate(2px, -2px)",
                        clipPath: "inset(0 0 40% 0)"
                    },
                    "100%": {
                        transform: "translate(0)",
                        clipPath: "inset(0 0 85% 0)"
                    },
                },
                blink: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0" },
                },
            },
        },
    },
    plugins: [],
} satisfies Config;