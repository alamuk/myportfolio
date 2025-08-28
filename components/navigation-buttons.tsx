"use client";

import Link from "next/link";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Mic, Users, Briefcase } from "lucide-react";

type NavButton = {
  name: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const BUTTONS: NavButton[] = [
  { name: "BLOG",            href: "#blog",           Icon: FileText },
  { name: "PODCAST",         href: "#podcast",        Icon: Mic },
  { name: "COLLABORATIONS",  href: "#collaborations", Icon: Users },
  { name: "WORK WITH ME",    href: "#contact",        Icon: Briefcase },
];

function NavigationButtonsInner() {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
        {BUTTONS.map((btn, i) => (
            <Button
                key={btn.name}
                size="lg"
                asChild
                style={{ transitionDelay: `${i * 80}ms`}}
                className={`
            group bg-[#e6ae1e] text-white border-2 border-[#e6ae1e]
            transition-all duration-300 transform hover:scale-105
            opacity-0 translate-y-4
            data-[reveal=true]:opacity-100 data-[reveal=true]:translate-y-0
            hover:bg-amber-600 hover:text-[#fff]
          `}
                data-reveal="true"
            >
              <Link href={btn.href} aria-label={btn.name} className="inline-flex items-center">
                <btn.Icon className="w-4 h-4" />
                <span className="ml-2">{btn.name}</span>
              </Link>
            </Button>
        ))}
      </div>
  );
}

export default memo(NavigationButtonsInner);
