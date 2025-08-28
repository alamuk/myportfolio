// Server component
import ClientSocialLinks from "./ClientSocialLinks";
import Image from "next/image";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            role="contentinfo"
            aria-labelledby="site-footer-heading"
            style={{ backgroundColor: "#2a2a2a" }}
            className="text-white"
        >
            <div className="container mx-auto px-4 py-8">
                {/* Top row: brand left, socials right (stack on mobile) */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="text-center md:text-left">
                        <a href="#home" className="flex items-center" aria-label="Go to home">
                            <Image
                                src="/MSLOGO.png"
                                alt="MD Shah Alam logo"
                                width={60}
                                height={60}
                                priority
                                className="h-12 w-auto object-contain"
                            />
                            <span className="sr-only">MD SHAH ALAM</span>
                        </a>
                        <p className="text-gray-400">Designing the Future of Cloud</p>
                    </div>

                    <nav aria-label="Social links" className="w-full md:w-auto">
                        {/* Keep width predictable on mobile so no jump */}
                        <div className="flex items-center justify-center md:justify-end">
                            <ClientSocialLinks />
                        </div>
                    </nav>
                </div>

                {/* Bottom row: © year centered */}
                <div className="mt-8 border-t border-gray-800 pt-6">
                    <p className="text-center text-gray-400">
                        © <time dateTime={`${year}`}>{year}</time> by MD SHAH ALAM.
                    </p>
                </div>
            </div>
        </footer>
    );
}
