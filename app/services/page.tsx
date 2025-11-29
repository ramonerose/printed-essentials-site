import Link from 'next/link';

export default function PrintOptions() {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-white pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-black">
              Find the Right Printing Method for Your Project
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              A simple guide to help you choose the best route based on your quantities, artwork, and the type of garments you are ordering. Clear direction, honest expectations, and quality results across every service.
            </p>
          </div>
        </div>
      </section>

      {/* DTF Section */}
      <section id="dtf" className="bg-white pt-8 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-black">
            DTF
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold mb-3 text-black">
            Got a smaller order or want the fastest turnaround?
          </h3>
          <p className="text-lg font-bold mb-4 text-black">
            DTF is your best option.
          </p>
          <p className="text-base md:text-lg mb-3 leading-relaxed text-black font-semibold">
            What is DTF?
          </p>
          <p className="text-base md:text-lg mb-6 leading-relaxed text-black">
            DTF stands for direct-to-film. Your design is digitally printed onto a special film and then heat pressed onto the garment. And don't worry, this isn't that old thick stuff that cracks or peels. This is the good modern tech. Smooth feel, full color detail, and excellent durability that holds up wash after wash.
          </p>
          <p className="text-base font-semibold mb-3 text-black">
            Best for:
          </p>
          <ul className="list-disc list-inside mb-8 space-y-2 text-base md:text-lg text-black">
            <li>Small and mid sized orders</li>
            <li>Full color or detailed artwork</li>
            <li>Fast turnaround needs</li>
            <li>Mixed style garments</li>
            <li>Brands wanting predictable, straightforward pricing</li>
          </ul>
          <Link
            href="/quote"
            className="inline-block w-full sm:w-auto bg-[#00a3ad] text-white px-8 py-4 rounded font-bold uppercase text-sm tracking-wide hover:bg-[#008a93] transition-all hover:shadow-lg text-center"
          >
            GET A QUOTE
          </Link>
        </div>
      </section>

      {/* Screen Printing Section */}
      <section id="screen-printing" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-black">
            Screen Printing
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold mb-3 text-black">
            Have a higher quantity order or a simple design?
          </h3>
          <p className="text-lg font-bold mb-4 text-black">
            Screen printing might be the better route.
          </p>
          <p className="text-base md:text-lg mb-6 leading-relaxed text-black">
            Ideal for larger runs, classic printed feel, and bulk apparel needs. Best value when ordering multiple sizes or stocking up on merch.
          </p>
          <p className="text-base font-semibold mb-3 text-black">
            Best for:
          </p>
          <ul className="list-disc list-inside mb-8 space-y-2 text-base md:text-lg text-black">
            <li>Order quantities of 36 plus</li>
            <li>Event shirts</li>
            <li>Brand merchandise</li>
            <li>Bulk orders</li>
            <li>Simple artwork or designs with fewer color changes</li>
          </ul>
          <Link
            href="/quote"
            className="inline-block w-full sm:w-auto bg-[#00a3ad] text-white px-8 py-4 rounded font-bold uppercase text-sm tracking-wide hover:bg-[#008a93] transition-all hover:shadow-lg text-center"
          >
            GET A QUOTE
          </Link>
        </div>
      </section>

      {/* Embroidery Section */}
      <section id="embroidery" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-black">
            Embroidery
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold mb-3 text-black">
            Want your logo on hats, polos, or jackets?
          </h3>
          <p className="text-lg font-bold mb-4 text-black">
            Embroidery handles those garments perfectly.
          </p>
          <p className="text-base md:text-lg mb-6 leading-relaxed text-black">
            Crisp stitching and durable results that look professional in any setting.
          </p>
          <p className="text-base font-semibold mb-3 text-black">
            Best for:
          </p>
          <ul className="list-disc list-inside mb-8 space-y-2 text-base md:text-lg text-black">
            <li>Hats</li>
            <li>Polos</li>
            <li>Jackets and outerwear</li>
            <li>Staff uniforms</li>
            <li>Anything needing a clean, professional appearance</li>
          </ul>
          <Link
            href="/quote"
            className="inline-block w-full sm:w-auto bg-[#00a3ad] text-white px-8 py-4 rounded font-bold uppercase text-sm tracking-wide hover:bg-[#008a93] transition-all hover:shadow-lg text-center"
          >
            GET A QUOTE
          </Link>
        </div>
      </section>

      {/* Not Sure Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-black">
            Not Sure What You Need?
          </h2>
          <p className="text-base md:text-lg mb-8 leading-relaxed text-black">
            Send over your idea and we will point you to the best option based on your garment type, artwork, and turnaround needs.
          </p>
          <Link
            href="/contact"
            className="inline-block w-full sm:w-auto bg-[#00a3ad] text-white px-8 py-4 rounded font-bold uppercase text-sm tracking-wide hover:bg-[#008a93] transition-all hover:shadow-lg text-center"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black italic mb-6">
            READY TO GET STARTED?
          </h2>
          <p className="text-xl mb-8">
            Contact us today to discuss the details of your printing project.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#00A3AD] text-white px-10 py-5 rounded font-bold uppercase text-lg tracking-wide hover:bg-[#008a93] transition-all hover:shadow-lg"
          >
            Get a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
