"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type NavItem = { name: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const SCROLL_THRESHOLD = 50;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const rafIdRef = useRef<number | null>(null);
  const lastScrolledRef = useRef<boolean>(false);
  const mountedRef = useRef<boolean>(false);

  useEffect(() => {
    mountedRef.current = true;

    const onScroll = () => {
      if (rafIdRef.current != null) return;
      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null;
        const scrolledNow = window.scrollY > SCROLL_THRESHOLD;
        if (scrolledNow !== lastScrolledRef.current) {
          lastScrolledRef.current = scrolledNow;
          if (mountedRef.current) setIsScrolled(scrolledNow);
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      mountedRef.current = false;
      window.removeEventListener("scroll", onScroll);
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setIsMenuOpen(false);
      }
    };
    const onHashChange = () => setIsMenuOpen(false);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  useEffect(() => {
    const { documentElement } = document;
    if (isMenuOpen) {
      documentElement.classList.add("overflow-hidden", "md:overflow-auto");
    } else {
      documentElement.classList.remove("overflow-hidden");
    }
    return () => documentElement.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  return (
      <header
          className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
              isScrolled ? "backdrop-blur-sm shadow-sm" : "bg-transparent"
          }`}
          style={{
            backgroundColor: isScrolled ? "#121212" : "transparent"
          }}
          role="banner"
      >

        <nav className="container mx-auto px-4 py-4" aria-label="Primary">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="flex items-center" aria-label="Go to home">
              <Image
                  src="/MSLOGO.png"
                  alt="MD Shah Alam logo"
                  width={80}
                  height={80}
                  priority
                  className="h-12 w-auto object-contain"
              />
              <span className="sr-only">MD SHAH ALAM</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                  <a
                      key={item.name}
                      href={item.href}
                      className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:text-yellow-400"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav"
                onClick={() => setIsMenuOpen((v) => !v)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div
              id="mobile-nav"
              className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-200 ${
                  isMenuOpen ? "max-h-96 opacity-100 mt-4 pb-4" : "max-h-0 opacity-0"
              }`}
          >
            <div className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                  <a
                      key={item.name}
                      href={item.href}
                      className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium py-2"
                      onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
              ))}
            </div>
          </div>
        </nav>
      </header>
  );
}
