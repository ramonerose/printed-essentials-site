import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
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
              className="h-32 w-auto md:h-36 lg:h-40 object-contain"
              priority
            />
          </Link>
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
            <Link href="/instant-quote" className="text-base font-bold uppercase tracking-wide text-white hover:text-[#00a3ad] transition-colors">
              INSTANT QUOTE
            </Link>
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
      </div>
    </nav>
  );
}
