"use client";

import React from "react";
import {
    SiGithub,
    SiLinkedin,
    SiX, // Twitter/X
    SiInstagram,
    SiYoutube,
} from "react-icons/si";

type Item = {
    href: string;
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
};

const ITEMS: Item[] = [

    { href: "https://www.linkedin.com/in/ms-alam/", label: "LinkedIn", Icon: SiLinkedin },
    { href: "https://github.com/alamuk", label: "GitHub", Icon: SiGithub },
    { href: "https://www.youtube.com/@MSAlamNet", label: "YouTube", Icon: SiYoutube },
    { href: "https://x.com/MSAlamNet", label: "Twitter / X", Icon: SiX },
    { href: "https://instagram.com/", label: "Instagram", Icon: SiInstagram },
];

export default function SocialLinks() {
    return (
        <ul className="flex items-center justify-center gap-6">
            {ITEMS.map(({ href, label, Icon }) => (
                <li key={label}>
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-150 hover:scale-105 focus:outline-none"
                        style={{
                            backgroundColor: "#e6ae1e",
                            color: "white",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#ffc447";
                            e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#e6ae1e";
                            e.currentTarget.style.color = "#fff";
                        }}
                    >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                </li>
            ))}
        </ul>
    );
}
