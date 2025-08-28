"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

// Lazy-load client widgets
const NavigationButtons = dynamic(() => import("@/components/navigation-buttons"), {
  ssr: false,
  loading: () => null,
});
const SocialLinks = dynamic(() => import("@/components/social-links"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  const imgWrapRef = useRef<HTMLDivElement | null>(null);
  const textWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const reduced = mql?.matches;

    const reveal = () => {
      imgWrapRef.current?.classList.add("reveal-visible");
      textWrapRef.current?.classList.add("reveal-visible");
    };

    if (reduced) {
      reveal();
      return;
    }

    const id = requestAnimationFrame(reveal);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
      <section
          id="home"
          aria-labelledby="hero-heading"
          style={{ background: "linear-gradient(135deg, #C78100 0%, #8b540a 100%)" }}
          className="relative min-h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Background */}
        <div style={{ background: "linear-gradient(135deg, #aa6a0d 0%, #8b540a 100%)" }} className="absolute inset-0" />

        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Profile Image */}
            <div ref={imgWrapRef} className="reveal flex justify-center lg:justify-start">
              <div className="relative">
                <div className="h-80 w-80 overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105 md:h-96 md:w-96">
                  <Image
                      src="/shah1.png"
                      alt="Portrait of MD SHAH ALAM"
                      width={768}
                      height={768}
                      sizes="(min-width: 1024px) 24rem, 20rem"
                      priority
                      className="h-full w-full object-cover"
                  />
                </div>

                {/* Decorative dots */}
                <div
                    className="absolute -right-4 -top-4 h-6 w-6 rounded-full bg-amber-300 motion-reduce:animate-none animate-bounce"
                    aria-hidden="true"
                />
                <div
                    className="absolute -left-4 -bottom-4 h-6 w-6 rounded-full bg-white motion-reduce:animate-none animate-pulse"
                    aria-hidden="true"
                />
              </div>
            </div>

            {/* Content */}
            <div ref={textWrapRef} className="reveal text-center lg:text-left">
              <h1
                  id="hero-heading"
                  style={{ wordSpacing: "0.1em" }}
                  className="font-mono mb-6 text-6xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl"
              >
              <span className="animate-pulse text-white-700 motion-reduce:animate-none ">
                MD SHAH ALAM
              </span>
              </h1>
              <p
                  style={{ wordSpacing: "0.1em", color: "#ffc447" }}
                  className="mb-8 text-l font-medium leading-relaxed md:text-2xl"
              >
                Cloud Engineer
              </p>
              <p className="mb-8 text-m leading-relaxed text-white md:text-2xl">
                AWS &amp; Azure Certified  .  MSc Cloud Computing  .  Hybrid Cloud Architect
              </p>
              <NavigationButtons />
              <div className="mt-12">
                <SocialLinks />
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 motion-reduce:animate-none animate-bounce"
              aria-label="Scroll down"
          >
            <ArrowDown
                className="h-6 w-6"
                style={{ color: "#ffc447" }}
                aria-hidden="true"
            />

          </div>
        </div>

        {/* Reveal transitions */}
        <style jsx>{`
          .reveal {
            opacity: 0;
            transform: translateY(2.5rem);
            transition: opacity 1000ms ease, transform 1000ms ease;
          }
          .reveal.reveal-visible {
            opacity: 1;
            transform: translateY(0);
          }
          @media (prefers-reduced-motion: reduce) {
            .reveal,
            .reveal.reveal-visible {
              transition: none !important;
              transform: none !important;
              opacity: 1 !important;
            }
          }
        `}</style>
      </section>
  );
}
