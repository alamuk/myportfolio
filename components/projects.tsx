"use client";

import { useEffect, useRef, memo } from "react";
import Image from "next/image";

/** ---------- Types ---------- */
type Project = {
    title: string;
    description: string;
    image: string;
    tags: string[];
    liveUrl?: string;
    githubUrl?: string;
    author?: string;
    date?: string;
};

/** ---------- Data (static; does not re-render) ---------- */
const PROJECTS: readonly Project[] = [
    {
        title: "Design is a form of listening",
        description:
            "A comprehensive blog covering remote work, travel, and lifestyle design for the modern professional.",
        image: "/modern-blog-design.png",
        tags: ["Content", "Travel", "Lifestyle"],
        liveUrl: "#",
        githubUrl: "#",
        author: "Corin Vale",
        date: "July 24, 2025",
    },
    {
        title: "Narrative Is a Design Tool",
        description:
            "Weekly podcast featuring interviews with industry leaders and discussions on emerging technologies.",
        image: "/placeholder-thhor.png",
        tags: ["Podcast", "Technology", "Interviews"],
        liveUrl: "#",
        githubUrl: "#",
        author: "Corin Vale",
        date: "July 24, 2025",
    },
    {
        title: "Designing for Trust",
        description:
            "A platform connecting content creators for collaborative projects and cross-promotion opportunities.",
        image: "/collaboration-platform-interface.png",
        tags: ["Platform", "Collaboration", "Community"],
        liveUrl: "#",
        githubUrl: "#",
        author: "Corin Vale",
        date: "July 24, 2025",
    },
] as const;

/** ---------- Security helpers ---------- */
function isSafeHttpUrl(href?: string): href is string {
    if (!href) return false;
    try {
        const u = new URL(href, "http://localhost"); // base to allow relative
        return u.protocol === "http:" || u.protocol === "https:" || !u.origin;
    } catch {
        return false;
    }
}

/** ---------- Component ---------- */
function ProjectsInner() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        // Respect reduced motion users
        const prefersReduced =
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

        const reveal = () => el.classList.add("reveal-visible");

        if (prefersReduced || !("IntersectionObserver" in window)) {
            reveal();
            return;
        }

        // Single observer instance; stored in a ref to avoid re-creation
        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    reveal();
                    observerRef.current?.unobserve(entry.target);
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
        );

        observerRef.current.observe(el);
        return () => {
            observerRef.current?.disconnect();
            observerRef.current = null;
        };
    }, []);

    return (
        <section
            id="projects"
            aria-labelledby="projects-heading"
            ref={sectionRef}
            style={{ backgroundColor: "#121212" }}
            className="reveal py-24 md:py-32 text-white transition-all duration-1000 motion-reduce:transition-none"
        >
            <div className="container mx-auto px-4">
                {/* Label row & browse link */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-white/70">
            <span
                className="inline-block h-1.5 w-1.5 rounded-[2px]"
                style={{ backgroundColor: "#ffc447" }}
                aria-hidden="true"
            />
                        <span>Design Notes</span>
                    </div>
                    <a
                        href="#"
                        className="hidden md:inline-flex items-center gap-2 text-xs tracking-widest uppercase text-white/70 hover:text-white"
                    >
                        Browse All Notes ↗
                    </a>
                </div>

                {/* Big title */}
                <h2
                    id="projects-heading"
                    className="mb-10 text-4xl md:text-6xl font-extrabold tracking-tight"
                >
                    Thoughts Behind the Work
                </h2>

                {/* 3-column editorial grid with thin dividers */}
                <div className="grid gap-y-12 lg:grid-cols-3 lg:gap-x-8">
                    {PROJECTS.map((p, index) => (
                        <article
                            key={`${p.title}-${index}`}
                            style={{ transitionDelay: `${index * 120}ms` }}
                            className={`
                card group
                opacity-0 translate-y-4
                lg:border-l lg:border-white/10 lg:pl-8
                first:lg:pl-0 first:lg:border-l-0
                transition-[opacity,transform] duration-700
              `}
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden">
                                <Image
                                    src={p.image || "/placeholder.svg"}
                                    alt={p.title}
                                    width={1280}
                                    height={720}
                                    sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                    priority={index === 0}
                                />
                            </div>

                            {/* Meta row */}
                            <div className="mt-3 flex items-center text-sm text-white/80">
                                <span>{p.author ?? "—"}</span>
                                <span
                                    className="mx-2 inline-block h-1 w-1 rounded-[2px]"
                                    style={{ backgroundColor: "#ffc447" }}
                                    aria-hidden="true"
                                />
                                <time>{p.date ?? "—"}</time>
                            </div>

                            {/* Title */}
                            <h3 className="mt-2 text-2xl md:text-3xl font-semibold">{p.title}</h3>

                            {/* Optional description (kept minimal to match screenshot) */}
                            <p className="mt-2 text-white/70 hidden md:block">{p.description}</p>

                            {/* Optional actions (render only if safe URLs provided) */}
                            <div className="mt-4 flex gap-3">
                                {isSafeHttpUrl(p.liveUrl) && (
                                    <a
                                        href={p.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-white/80 underline underline-offset-4 hover:text-white"
                                        aria-label={`${p.title} — Live`}
                                    >
                                        Live ↗
                                    </a>
                                )}
                                {isSafeHttpUrl(p.githubUrl) && (
                                    <a
                                        href={p.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-white/80 underline underline-offset-4 hover:text-white"
                                        aria-label={`${p.title} — Code on GitHub`}
                                    >
                                        Code ↗
                                    </a>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Reveal styles */}
            <style jsx>{`
        .reveal {
          opacity: 0;
          transform: translateY(2.5rem);
        }
        .reveal.reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal.reveal-visible .card {
          opacity: 1;
          transform: translateY(0);
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

export default memo(ProjectsInner);
