'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-black sticky top-0 z-50 shadow-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/printed-essentials-logo.png"
              alt="Printed Essentials"
              width={300}
              height={300}
              className="h-24 w-auto md:h-32 lg:h-36 object-contain"
              priority
            />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/" className="text-base font-bold uppercase tracking-wide text-white hover:text-[#00a3ad] transition-colors">
              HOME
            </Link>
            <Link href="/services" className="text-base font-bold uppercase tracking-wide text-white hover:text-[#00a3ad] transition-colors">
              SERVICES
            </Link>
            <Link href="/gallery" className="text-base font-bold uppercase tracking-wide text-white hover:text-[#00a3ad] transition-colors">
              OUR WORK
            </Link>
            {/* Temporarily hidden - uncomment when pricing is updated */}
            {/* <Link href="/instant-quote" className="text-base font-bold uppercase tracking-wide text-white hover:text-[#00a3ad] transition-colors">
              INSTANT QUOTE
            </Link> */}
            <Link href="/contact" className="text-base font-bold uppercase tracking-wide text-white hover:text-[#00a3ad] transition-colors">
              CONTACT
            </Link>
            <Link
              href="/quote"
              className="bg-[#00a3ad] text-white px-6 py-3 rounded font-bold uppercase text-base tracking-wide hover:bg-[#008a93] transition-all hover:shadow-lg"
            >
              GET A QUOTE!
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link
              href="/"
              className="block text-base font-bold uppercase tracking-wide text-white hover:text-[#00a3ad] transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              href="/services"
              className="block text-base font-bold uppercase tracking-wide text-white hover:text-[#00a3ad] transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              SERVICES
            </Link>
            <Link
              href="/gallery"
              className="block text-base font-bold uppercase tracking-wide text-white hover:text-[#00a3ad] transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              OUR WORK
            </Link>
            {/* Temporarily hidden - uncomment when pricing is updated */}
            {/* <Link
              href="/instant-quote"
              className="block text-base font-bold uppercase tracking-wide text-white hover:text-[#00a3ad] transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              INSTANT QUOTE
            </Link> */}
            <Link
              href="/contact"
              className="block text-base font-bold uppercase tracking-wide text-white hover:text-[#00a3ad] transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              CONTACT
            </Link>
            <Link
              href="/quote"
              className="block bg-[#00a3ad] text-white px-6 py-3 rounded font-bold uppercase text-base tracking-wide hover:bg-[#008a93] transition-all hover:shadow-lg text-center mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              GET A QUOTE!
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
