"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  // refs
  const sectionRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);

  // minimal UI state for submission only
  const [submitting, setSubmitting] = useState(false);

  // a11y IDs
  const firstId = useId();
  const lastId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();
  const statusId = useId();

  useEffect(() => {
    mountedRef.current = true;
    const el = sectionRef.current;
    if (!el) return;

    // Respect reduced motion
    const mql =
        typeof window !== "undefined"
            ? window.matchMedia("(prefers-reduced-motion: reduce)")
            : null;

    if (mql?.matches || !("IntersectionObserver" in window)) {
      el.classList.add("reveal-visible");
      return;
    }

    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("reveal-visible");
            observer.unobserve(entry.target); // stop after first reveal
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => {
      mountedRef.current = false;
      observer.disconnect();
      abortRef.current?.abort(); // cancel in-flight submit if unmounting
    };
  }, []);

  const handleSubmit = useCallback(
      async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (submitting) return;

        const form = e.currentTarget;
        // spam honeypot: if filled, drop silently
        const honeypot = (form.querySelector('input[name="company"]') as HTMLInputElement)?.value;
        if (honeypot) return;

        setSubmitting(true);
        abortRef.current?.abort();
        abortRef.current = new AbortController();

        try {
          const fd = new FormData(form);
          // Example POST – replace with your endpoint or Server Action
          const res = await fetch("/api/contact", {
            method: "POST",
            body: fd,
            signal: abortRef.current.signal,
          });

          if (!res.ok) throw new Error("Request failed");

          // Clear fields on success
          form.reset();
          // announce success
          const live = document.getElementById(statusId);
          if (live) live.textContent = "Message sent. Thanks!";
        } catch {
          const live = document.getElementById(statusId);
          if (live) live.textContent = "Something went wrong. Please try again.";
        } finally {
          if (mountedRef.current) setSubmitting(false);
        }
      },
      [submitting, statusId]
  ); // closes handleSubmit

  return (
      <section
          id="contact"
          ref={sectionRef}
          aria-labelledby="contact-heading"
          style={{ backgroundColor: "#121212" }}
          className="py-40 text-white reveal transition-all duration-1000 motion-reduce:transition-none"
      >
        <div className="container mx-auto px-4">
          <div>
            <h2
                id="contact-heading"
                className="text-4xl md:text-5xl font-bold text-center mb-16"
            >
              Get In <span style={{ color: "#ffc447" }}>Touch</span>
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-white">Let&apos;s Work Together</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    I am always open to exploring new opportunities, collaborating on innovative cloud or development projects,
                    or discussing the latest trends in cloud computing, DevOps, and AI-driven solutions.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg grid place-items-center" style={{ backgroundColor: "#e6ae1e" }}>
                      <Mail className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Email</h4>
                      <p className="text-gray-300">
                        <a className="underline underline-offset-2" href="mailto:charlie@charliecash.com">
                          shahmd.alam@ymail.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg grid place-items-center" style={{ backgroundColor: "#e6ae1e" }}>
                      <Phone className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Phone</h4>
                      <p className="text-gray-300">
                        <a className="underline underline-offset-2" href="tel:+15551234567">
                          (+44) 07983415267
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg grid place-items-center" style={{ backgroundColor: "#e6ae1e" }}>
                      <MapPin className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Location</h4>
                      <p className="text-gray-300">London, UK</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <form
                      ref={formRef}
                      className="space-y-6"
                      onSubmit={handleSubmit}
                      noValidate
                  >
                    {/* Honeypot (hidden to humans) */}
                    <div className="sr-only" aria-hidden="true">
                      <label htmlFor="hp-company">Company</label>
                      <input id="hp-company" name="company" tabIndex={-1} autoComplete="off" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={firstId} className="block text-sm font-medium text-gray-300 mb-2">
                          First Name
                        </label>
                        <Input
                            id={firstId}
                            name="firstName"
                            placeholder="John"
                            autoComplete="given-name"
                            required
                        />
                      </div>
                      <div>
                        <label htmlFor={lastId} className="block text-sm font-medium text-gray-300 mb-2">
                          Last Name
                        </label>
                        <Input
                            id={lastId}
                            name="lastName"
                            placeholder="Doe"
                            autoComplete="family-name"
                            required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor={emailId} className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <Input
                          id={emailId}
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          autoComplete="email"
                          inputMode="email"
                          required
                      />
                    </div>

                    <div>
                      <label htmlFor={subjectId} className="block text-sm font-medium text-gray-300 mb-2">
                        Subject
                      </label>
                      <Input
                          id={subjectId}
                          name="subject"
                          placeholder="Let&apos;s collaborate!"
                          maxLength={120}
                          required
                      />
                    </div>

                    <div>
                      <label htmlFor={messageId} className="block text-sm font-medium text-gray-300 mb-2">
                        Message
                      </label>
                      <Textarea
                          id={messageId}
                          name="message"
                          placeholder="Tell me about your project or idea..."
                          className="h-32 resize-y"
                          maxLength={2000}
                          required
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                          ref={submitBtnRef}
                          type="submit"
                          disabled={submitting}
                          className="w-full text-white py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-200 disabled:opacity-60 disabled:hover:scale-100 hover:opacity-90"
                          style={{ backgroundColor: "#e6ae1e" }}
                      >
                        <Send className="w-5 h-5 mr-2" aria-hidden="true" />
                        {submitting ? "Sending..." : "Send Message"}
                      </Button>
                    </div>

                    <p id={statusId} role="status" aria-live="polite" className="sr-only" />
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Reveal styles (no re-render): default hidden, becomes visible when observer adds .reveal-visible */}
        <style jsx>{`
        .reveal {
          opacity: 0;
          transform: translateY(2.5rem);
        }
        .reveal.reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      </section>
  );
}
