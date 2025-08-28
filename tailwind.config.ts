import type { Config } from "tailwindcss";

export default {
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-manrope)", "sans-serif"],
                mono: ["var(--font-jetbrains-mono)", "monospace"],
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
    ],
} satisfies Config;

