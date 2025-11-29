import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-black italic mb-4">Printed Essentials</h3>
            <p className="text-gray-400 text-sm mb-3">
              Custom apparel and screen printing in Greenville SC
            </p>
            <p className="text-gray-400 text-sm">Greenville SC</p>
            <p className="text-gray-400 text-sm">Phone: <a href="tel:864-800-6445" className="hover:text-[#00A3AD] transition-colors">864-800-6445</a></p>
            <p className="text-gray-400 text-sm">Email: <a href="mailto:info@printedessentials.com" className="hover:text-[#00A3AD] transition-colors">info@printedessentials.com</a></p>
          </div>

          <div>
            <h4 className="font-bold uppercase text-sm tracking-wide mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services#dtf" className="text-gray-400 hover:text-[#00A3AD] transition-colors text-sm">
                  DTF
                </Link>
              </li>
              <li>
                <Link href="/services#screen-printing" className="text-gray-400 hover:text-[#00A3AD] transition-colors text-sm">
                  Screen Printing
                </Link>
              </li>
              <li>
                <Link href="/services#embroidery" className="text-gray-400 hover:text-[#00A3AD] transition-colors text-sm">
                  Embroidery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#00A3AD] transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase text-sm tracking-wide mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/instant-quote" className="text-gray-400 hover:text-[#00A3AD] transition-colors text-sm">
                  Instant Quote
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-[#00A3AD] transition-colors text-sm">
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-gray-400 hover:text-[#00A3AD] transition-colors text-sm">
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Printed Essentials. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
