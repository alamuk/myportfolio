"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const mql = typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    if (mql?.matches) {
      setIsVisible(true);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
      <section
          id="about"
          aria-labelledby="about-heading"
          ref={sectionRef}
          style={{ backgroundColor: "#121212" }}
          className="py-40 text-white"
      >
        <div className="container mx-auto px-4">
          <div
              className={`transition-all duration-1000 will-change-transform motion-reduce:transition-none ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <h2
                id="about-heading"
                className="text-4xl md:text-5xl font-bold text-center mb-16"
            >
              About{" "}
              <span style={{ color: "#ffc447" }}>
              Me
            </span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  I am a Cloud Solution Engineer with hands-on experience in AWS and Azure,
                  building secure, scalable, and high-performing solutions. My skills span hybrid
                  cloud architectures and AI-driven automation to help businesses modernise
                  and optimise their systems.
                </p>
                <p className="text-lg leading-relaxed">
                  I am currently pursuing an MSc in Cloud Computing at the University of East London,
                  focusing on cloud-native architecture, DevOps,
                  and infrastructure automation. This blends academic insight with real-world expertise.
                </p>
                <p className="text-lg leading-relaxed">
                  I combine technical skills with a strong commitment to security, reliability,
                  and performance, creating cloud environments that drive efficiency and innovation.
                </p>
              </div>

              <Card
                  style={{ background: "linear-gradient(135deg, #f5b544 0%, #C78100 50%, #8b540a 100%)" }}
                  className="border-none text-white transform hover:scale-105 transition-transform duration-300 motion-reduce:transform-none"
              >
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Quick Facts</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-amber-300 rounded-full mr-3" />
                      AWS & Azure
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-amber-300 rounded-full mr-3" />
                      Hybrid Cloud Architect
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-amber-300 rounded-full mr-3" />
                      MSc Cloud Computing
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-amber-300 rounded-full mr-3" />
                      AI Agent and Integration
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-amber-300 rounded-full mr-3 " />
                      DevOps Enthusiast
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
  );
}
