import Image from "next/image";

const BRANDS = [
  { src: "/brands/adidas-logo.png", alt: "Adidas logo" },
  { src: "/brands/american-apparel-logo.png", alt: "American Apparel logo" },
  { src: "/brands/as-colour-web-logo-half-inch.png", alt: "AS Colour logo" },
  { src: "/brands/bella-canvas-logo.png", alt: "Bella+Canvas logo" },
  { src: "/brands/champion-logo.png", alt: "Champion logo" },
  { src: "/brands/comfort-colors-logo.png", alt: "Comfort Colors logo" },
  { src: "/brands/flexfit-logo.png", alt: "Flexfit logo" },
  { src: "/brands/gildan-logo.png", alt: "Gildan logo" },
  { src: "/brands/indpendent-logo.png", alt: "Independent logo" },
  { src: "/brands/new-era-logo.png", alt: "New Era logo" },
  { src: "/brands/next-level-apparel-logo.png", alt: "Next Level Apparel logo" },
  { src: "/brands/nike-logo.png", alt: "Nike logo" },
  { src: "/brands/ogio-logo.png", alt: "Ogio logo" },
  { src: "/brands/richardson-logo.png", alt: "Richardson logo" },
  { src: "/brands/team-365-logo.png", alt: "Team 365 logo" },
  { src: "/brands/under-armor-logo.png", alt: "Under Armour logo" },
  { src: "/brands/yupoong-logo.png", alt: "Yupoong logo" },
];

export function BrandMarquee() {
  return (
    <section className="border-y border-gray-800 bg-black py-8">
      <div className="mx-auto flex flex-col gap-6 px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400 text-center">
          Brands we print on
        </p>
        <div className="relative overflow-hidden w-full">
          <div className="inline-flex gap-20 whitespace-nowrap will-change-transform animate-marquee">
            {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, idx) => (
              <div key={`brand-${idx}`} className="flex items-center justify-center flex-shrink-0 min-w-[200px]">
                <Image
                  src={brand.src}
                  alt={brand.alt}
                  width={200}
                  height={100}
                  className={`w-auto object-contain ${
                    brand.src.includes('as-colour')
                      ? 'h-12 max-w-[110px]'
                      : 'h-24 max-w-[200px]'
                  }`}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
