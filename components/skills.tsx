"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Cloud,
  CloudCog,
  Workflow,
  FileCode,
  Brain,
  ShieldCheck
} from "lucide-react";

type Skill = { name: string; icon: React.ComponentType<{ className?: string }>; level: number };

const SKILLS: Skill[] = [
  { name: "AWS & Azure Cloud Services", icon: Cloud,        level: 95 },
  { name: "Hybrid Cloud Architecture",     icon: CloudCog,     level: 85 },
  { name: "DevOps & CI/CD Automation", icon: Workflow,       level: 80 },
  { name: "Infrastructure as Code (Terraform)",    icon: FileCode,  level: 95 },
  { name: "AI-Integrated Cloud Solutions",   icon: Brain,      level: 90 },
  { name: "Cloud Security & Compliance",      icon: ShieldCheck,        level: 90 },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const reveal = () => el.classList.add("reveal-visible");

    if (reduced || !("IntersectionObserver" in window)) {
      reveal();
      return;
    }

    const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            reveal();
            io.unobserve(entry.target);
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
      <section
          id="skills"
          aria-labelledby="skills-heading"
          ref={sectionRef}
          style={{ backgroundColor: "#2a2a2a" }}
          className="reveal py-40 transition-all duration-1000 motion-reduce:transition-none text-white"
      >
        <div className="container mx-auto px-4">
          <h2
              id="skills-heading"
              className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            My <span style={{ color: "#ffc447" }}>Skills</span>
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" role="list">
            {SKILLS.map((skill, index) => (
                <Card
                    key={skill.name}
                    role="listitem"
                    style={{ transitionDelay: `${index * 100}ms` }}
                    className="card group transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center">
                      <div
                          className="mr-4 grid h-12 w-12 place-items-center rounded-lg transition-colors duration-300 group-hover:bg-black"
                          style={{ backgroundColor: "#e6ae1e" }}
                      >
                        <skill.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-semibold">{skill.name}</h3>
                    </div>

                    {/* Progress bar */}
                    <div
                        className="w-full rounded-full bg-gray-200"
                        aria-hidden="true"
                    >
                      <div
                          className="bar h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            background: "linear-gradient(135deg, #f5b544 0%, #C78100 50%, #8b540a 100%)",
                            "--w": `${skill.level}%`,
                            transitionDelay: `${index * 120}ms`,
                          } as React.CSSProperties}
                      />
                    </div>

                    <div
                        className="sr-only"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={skill.level}
                        aria-label={`${skill.name} skill level`}
                    />
                    <p className="mt-2 text-sm text-amber-700">{skill.level}%</p>
                  </CardContent>
                </Card>
            ))}
          </div>
        </div>

        {/* Reveal & card styles */}
        <style jsx>{`
        .reveal {
          opacity: 0;
          transform: translateY(2.5rem);
        }
        .reveal.reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .card {
          opacity: 0;
          transform: translateY(1rem);
          transition-property: opacity, transform;
        }
        .reveal.reveal-visible .card {
          opacity: 1;
          transform: translateY(0);
        }
        .bar {
          width: 0%;
        }
        .reveal.reveal-visible .bar {
          width: var(--w, 0%);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal,
          .card,
          .reveal.reveal-visible .card {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
          .bar,
          .reveal.reveal-visible .bar {
            transition: none !important;
            width: var(--w, 100%) !important;
          }
        }
      `}</style>
      </section>
  );
}