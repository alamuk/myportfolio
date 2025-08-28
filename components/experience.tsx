"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
};

const EXPERIENCES: ExperienceItem[] = [
  {
    title: "Cloud Engineer",
    company: "GMAX Card",
    period: "Mar 2025 – Present",
    description:
        "Leading content strategy and creation across multiple platforms, managing a team of writers and editors.",
    achievements: ["Maintained 99.9% uptime", "Reduced setup time by 30% through automation", "Improved incident resolution by 25%+ with proactive monitoring"],
  },
  {
    title: "AWS Support Engineer",
    company: "GETSHOP.TODAY",
    period: "Jan 2023 – Jun 2024",
    description:
        "Developed scalable React applications, integrated APIs, and deployed builds on AWS for high-performance solutions.",
    achievements: ["Cut development time by 25% with optimized component architecture", "Achieved 100% feature parity via AWS Lambda + API Gateway", "Streamlined deployments using GitHub Actions CI/CD"],
  },
  {
    title: "Front-End Developer",
    company: "London Hats and Accessories UK Ltd",
    period: "May 2020 – Dec 2022",
    description:
        "Built responsive, cloud-hosted e-commerce websites with mobile compatibility and improved user experience.",
    achievements: ["Increased engagement by 25% with enhanced UI/UX", "Delivered 100% mobile-compatible sites", "Developed and integrated React and Next.js components, boosting engagement"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const mql = typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
    if (mql?.matches || !("IntersectionObserver" in window)) {
      el.classList.add("reveal-visible");
      return;
    }

    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("reveal-visible");
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
          id="experience"
          aria-labelledby="experience-heading"
          ref={sectionRef}
          style={{ backgroundColor: "#C78100" }}
          className="py-40 text-white reveal transition-all duration-1000 motion-reduce:transition-none"
      >
        <div className="container mx-auto px-4">
          <div>
            <h2 id="experience-heading" className="text-4xl md:text-5xl font-bold text-center mb-16">
              My <span style={{ color: "#ffc447" }}>Experience</span>
            </h2>

            <div className="max-w-4xl mx-auto">
              {EXPERIENCES.map((exp, index) => (
                  <Card
                      key={`${exp.title}-${exp.period}`}
                      style={{ transitionDelay: `${index * 120}ms` }}
                      className="card mb-8 bg-gray-900 border-gray-700 text-white transform transition-transform duration-300 hover:scale-105"
                  >
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold" style={{ color: "#ffc447" }}>
                            {exp.title}
                          </h3>
                          <p className="text-xl text-gray-300">{exp.company}</p>
                        </div>
                        <span className="text-gray-400 font-medium mt-2 md:mt-0">{exp.period}</span>
                      </div>

                      <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-white">Key Achievements:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-300 marker:text-amber-300">
                          {exp.achievements.map((achievement, i) => (
                              <li style={{ }} key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </div>

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
          transform: translateX(-1rem);
        }
        .reveal.reveal-visible .card {
          opacity: 1;
          transform: translateX(0);
          transition-property: opacity, transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal,
          .card,
          .reveal.reveal-visible .card {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
      </section>
  );
}
