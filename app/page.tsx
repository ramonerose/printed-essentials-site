import Link from 'next/link';
import { BrandMarquee } from './components/BrandMarquee';
import { ReviewsCarousel } from './components/ReviewsCarousel';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-black min-h-[600px] flex items-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-8 text-white">
              Where Quality Printing Meets Genuine Customer Care.
            </h1>
            <p className="text-2xl md:text-3xl mb-6 font-semibold text-white">
              Clear communication, attention to detail, and work done with integrity so your brand always looks its best.
            </p>
            <div className="google-rating">
              <svg className="google-icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              <span className="rating-main">5.0 ★★★★★</span>
              <span className="rating-sub">on Google</span>
            </div>
            <div className="flex justify-center mt-16">
              <Link
                href="/services"
                className="inline-block bg-[#00a3ad] text-white px-8 py-4 rounded font-bold uppercase text-sm tracking-wide hover:bg-[#008a93] transition-all hover:shadow-lg text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Marquee */}
      <BrandMarquee />

      {/* Why Choose Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold italic mb-6 text-black text-center">
            Why Choose Printed Essentials?
          </h2>

          <p className="text-base md:text-lg mb-6 leading-relaxed text-black">
            From local businesses to growing brands, the reason people choose us is simple — we treat your order like it matters. You get respectful service, clear communication, and prints done with care and integrity every step of the way.
          </p>

          <p className="text-base md:text-lg mb-6 leading-relaxed text-black">
            We don't rush jobs or disappear on you. We walk you through options, set honest expectations, and deliver work that meets a higher standard so your brand looks its best.
          </p>

          <p className="text-base md:text-lg leading-relaxed text-black">
            If you value quality, communication, and a smooth process, you'll feel right at home here.
          </p>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <ReviewsCarousel />

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
            href="/quote"
            className="inline-block bg-[#00A3AD] text-white px-10 py-5 rounded font-bold uppercase text-lg tracking-wide hover:bg-[#008a93] transition-all hover:shadow-lg"
          >
            Get a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
