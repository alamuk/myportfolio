"use client";

import dynamic from "next/dynamic";

const SocialLinks = dynamic(() => import("./SocialLinks"), {
    ssr: false,
    loading: () => (
        // Keeps layout stable while icons hydrate
        <div className="h-6 w-48 animate-pulse rounded bg-gray-800/40" aria-hidden="true" />
    ),
});

export default function ClientSocialLinks() {
    return <SocialLinks />;
}
