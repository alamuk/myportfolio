"use client";

import { useEffect, useRef, memo } from "react";
import Image from "next/image";
import Link from "next/link";

type Project = {
    title: string;
    excerpt: string;
    image: string;
    href?: string;
    author?: string;
    date?: string;
};

const BRAND = "#ffc447";

const PROJECTS: readonly Project[] = [
    {
        title: "Design is a form of listening",
        excerpt:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        image: "/modern-blog-design.png",
        href: "#",
        author: "Corin Vale",
        date: "July 24, 2025",
    },
    {
        title: "Narrative Is a Design Tool",
        excerpt:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        image: "/placeholder-thhor.png",
        href: "#",
        author: "Corin Vale",
        date: "July 24, 2025",
    },
    {
        title: "Designing for Trust",
        excerpt:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        image: "/collaboration-platform-interface.png",
        href: "#",
        author: "Corin Vale",
        date: "July 24, 2025",
    },
    {
        title: "Designing for Trust",
        excerpt:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        image: "/collaboration-platform-interface.png",
        href: "#",
        author: "Corin Vale",
        date: "July 24, 2025",
    },
    {
        title: "Designing for Trust",
        excerpt:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        image: "/collaboration-platform-interface.png",
        href: "#",
        author: "Corin Vale",
        date: "July 24, 2025",
    },
] as const;

function ProjectsListInner() {
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const prefersReduced =
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

        const show = () => el.classList.add("reveal-visible");

        if (prefersReduced || !("IntersectionObserver" in window)) {
            show();
            return;
        }

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    show();
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
            id="projects-list"
            ref={sectionRef}
            aria-labelledby="projects-heading"
            style={{ backgroundColor: "#121212" }}
            className="reveal text-white"
        >
            <div className="container mx-auto px-4 py-24 md:py-28">
                {/* Tiny label row */}
                <div className="mb-4 flex items-center gap-2 text-xs tracking-widest uppercase text-white/70">
          <span
              className="inline-block h-1.5 w-1.5 rounded-[2px]"
              style={{ backgroundColor: BRAND }}
              aria-hidden="true"
          />
                    <span>Recent Notes</span>
                </div>

                {/* Big headline */}
                <h1
                    id="projects-heading"
                    className="mb-10 text-4xl md:text-6xl font-extrabold tracking-wide"
                    style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
                >
                    Collected Writings
                </h1>

                {/* List */}
                <ul role="list" className="divide-y divide-white/10">
                    {PROJECTS.map((p, i) => {
                        const Item = (
                            <article
                                className={`
                  group grid grid-cols-1 gap-6 py-8 md:grid-cols-12
                  opacity-0 translate-y-4 transition-[opacity,transform] duration-700
                `}
                                style={{ transitionDelay: `${i * 120}ms` }}
                            >
                                {/* Image */}
                                <div className="md:col-span-5">
                                    <div className="relative overflow-hidden">
                                        <Image
                                            src={p.image}
                                            alt={p.title}
                                            width={1200}
                                            height={800}
                                            sizes="(min-width:1024px) 38vw, (min-width:768px) 45vw, 100vw"
                                            className="h-56 w-full object-cover md:h-60 lg:h-64 transition-transform duration-500 group-hover:scale-[1.03]"
                                            priority={i === 0}
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="md:col-span-7 md:pl-8">
                                    {/* Meta row */}
                                    <div className="mb-2 flex items-center text-xs text-white/70">
                                        <span>{p.author ?? "—"}</span>
                                        <span
                                            className="mx-2 inline-block h-1 w-1 rounded-[2px]"
                                            style={{ backgroundColor: BRAND }}
                                            aria-hidden="true"
                                        />
                                        <time>{p.date ?? "—"}</time>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-2xl md:text-3xl font-semibold tracking-wide">
                                        {p.title}
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="mt-2 text-sm text-white/60 max-w-prose">
                                        {p.excerpt}
                                    </p>
                                </div>
                            </article>
                        );

                        return (
                            <li key={`${p.title}-${i}`} className="first:pt-0">
                                {p.href ? (
                                    <Link
                                        href={p.href}
                                        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212] focus-visible:ring-white/60 rounded"
                                    >
                                        {Item}
                                    </Link>
                                ) : (
                                    Item
                                )}
                            </li>
                        );
                    })}
                </ul>
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
        .reveal.reveal-visible article {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal,
          .reveal .group,
          .reveal.reveal-visible .group {
            transition: none !important;
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
        </section>
    );
}

export default memo(ProjectsListInner);
