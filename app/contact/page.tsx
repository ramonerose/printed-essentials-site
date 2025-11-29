export default function Contact() {
  return (
    <div className="bg-white">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-black">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12">
            Have a question or need help with an order? Reach out and we will get back to you as soon as possible.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-black mb-2">Email</h2>
            <a
              href="mailto:info@printedessentials.com"
              className="text-lg text-[#00a3ad] hover:text-[#008a93] transition-colors"
            >
              info@printedessentials.com
            </a>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-bold text-black mb-2">Phone</h2>
            <a
              href="tel:864-800-6445"
              className="text-lg text-[#00a3ad] hover:text-[#008a93] transition-colors"
            >
              864-800-6445
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
