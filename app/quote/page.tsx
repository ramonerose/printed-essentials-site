'use client';

import { useEffect } from 'react';

export default function Quote() {
  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://server.fillout.com/embed/v1/"]');

    if (!existingScript) {
      // Load the Fillout script
      const script = document.createElement('script');
      script.src = 'https://server.fillout.com/embed/v1/';
      script.async = true;
      document.body.appendChild(script);

      // Don't remove the script on unmount - let it persist
      return undefined;
    }
  }, []);

  return (
    <div className="bg-white">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-black">
            Get a Quote
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            For an exact quote, fill out the form below. Our Instant Quote tool is great for ballpark pricing, but this form gives us the details we need to review your artwork, garments, and print specs so we can send accurate pricing.
          </p>
        </div>

        <div
          style={{ width: '100%', height: '500px' }}
          data-fillout-id="3F1pbEPazFus"
          data-fillout-embed-type="standard"
          data-fillout-inherit-parameters
          data-fillout-dynamic-resize
        ></div>
      </section>
    </div>
  );
}
