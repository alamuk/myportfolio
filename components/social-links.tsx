"use client";

import { SiLinkedin, SiGithub, SiInstagram, SiYoutube } from "react-icons/si";
import { SiX } from "react-icons/si"; // For Twitter/X

const LINKS = [

  { name: "LinkedIn", Icon: SiLinkedin, href: "https://www.linkedin.com/in/ms-alam/" },
  { name: "GitHub",   Icon: SiGithub,   href: "https://github.com/alamuk" },
  { name: "YouTube",  Icon: SiYoutube,  href: "https://www.youtube.com/@MSAlamNet" },
  { name: "X",        Icon: SiX,        href: "https://x.com/MSAlamNet" },
  { name: "Instagram",Icon: SiInstagram,href: "#" },
];

export default function SocialLinks() {
  return (
      <div className="flex space-x-6 justify-center lg:justify-start">
        {LINKS.map(({ name, Icon, href }) => (
            <a
                key={name}
                href={href}
                aria-label={name}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform hover:scale-110 hover:rotate-12"
                style={{
                  backgroundColor: "#C78100",
                  transition: "background-color 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e6ae1e")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C78100")}
            >
              <Icon className="w-5 h-5" />
            </a>
        ))}
      </div>
  );
}
