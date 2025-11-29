import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-black italic mb-4">Printed Essentials</h3>
            <p className="text-gray-400 text-sm">
              Where quality printing meets genuine customer care.
            </p>
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
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Printed Essentials. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
