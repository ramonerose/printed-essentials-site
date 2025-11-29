'use client';

import { useState } from 'react';

interface Review {
  text: string;
  author: string;
  company: string;
}

const REVIEWS: Review[] = [
  {
    text: "We had such a good time designing and building uniforms for StumPro with Moe. He was genuinely respectful and invested in our product. Our order was generally small, but he treated us with as much respect as he would treat any other company, and ensured the process was smooth and professional. We would recommend Moe and his products to any company or individual in need of apparel. Thank-you Moe for all you did for StumPro!",
    author: "Christian M.",
    company: "StumPro"
  },
  {
    text: "We have been using Printed Essentials for our merch for several months now. Great customer service and quick turn on orders. We have really enjoyed the quality and crispness of the Direct to Film product.",
    author: "Vince S.",
    company: "Finding Full Throttle"
  },
  {
    text: "We have been using Printed Essentials exclusively for all of our printed needs from hats, to shirts, to custom cups. The quality never disappoints and Moe is a pleasure to work with! The passion and precision Moe puts into his work shows. 5 stars all day long!",
    author: "Will S.",
    company: "Thunder Bunny Racing"
  },
  {
    text: "Absolutely 5 stars for Printed Essentials! Moe was incredible throughout the entire process—from helping us choose the perfect t-shirt to making sure every detail was just right. The quality of the shirts is outstanding, and we've gotten tons of compliments on them already. Moe made the experience smooth and stress-free, and his attention to detail really shows in the final product. We're beyond happy with how everything turned out and already have more projects planned. Thanks again, Moe and Printed Essentials, for the amazing service!",
    author: "Patrick W.",
    company: "Cars & Coffee / Do Better"
  },
  {
    text: "The business I work for has used Printed Essentials for several uniform needs, and Moe always comes through with the right product and great communication.",
    author: "Timothy J.",
    company: "Eastergard"
  },
  {
    text: "This is the only place I've gone for my crew's shirts since our first order with them! The prints on the shirts are high quality and have lasted through a ton of abuse in the gym without any issues! Highly recommend them!",
    author: "Michael M.",
    company: "Sons of Benches"
  },
  {
    text: "Printed Essentials is professional, efficient and communicative. They reply quickly to any questions we had during the ordering process and once we placed our order we received it sooner than we expected and the quality was even better than we expected. It is important for us to find companies that work with integrity and we found that with them. We will definitely be using Printed Essentials for all of our future printed needs!",
    author: "Priscilla C.",
    company: "Next Gen Collision Specialists"
  },
  {
    text: "We used printed essentials for shirts, hoodies, hats, and more! Everything came out great, and the Customer service is phenomenal! I will definitely be using them for years to come.",
    author: "Shane V.",
    company: "SAV Landscaping"
  },
  {
    text: "These guys are top notch! We love our shirts and will be ordering again when the time comes. Thanks!",
    author: "Dana",
    company: "Coffee Underground"
  },
  {
    text: "Moe over at Printed Essentials did some work for my small business and the turnaround time was impeccable!! The communication was clear, concise and professional and I LOVED the outcome of the hats and hoodies they did for us! I would definitely recommend them to anyone in need of quality merchandise for their business!",
    author: "Rickie A.",
    company: "First Love Cheesecakery"
  },
  {
    text: "I cannot recommend Printed Essentials enough! We needed custom t-shirts for the nonprofit I work with, and had previously made an order through Custom Ink. When we needed more on short notice, Moe delivered: the quality, affordability, and efficiency are top notch, and he perfectly replicated the previous design with ease. I've continued to wear the shirt for the past year with tons of washes and wears and the quality has held up great. We've continued to order from Printed Essentials ever since and will continue to do so; making the switch was a no-brainer!",
    author: "Dara L.",
    company: "Adoption Helpers"
  },
  {
    text: "Huge thanks to Moe for his work on our basketball team sweatshirts! Communication and quality of work are top notch.",
    author: "Annemieke C.",
    company: ""
  },
  {
    text: "Ordered 10 shirts and a hoodie. Excellent quality and service. Will definitely be using again in the future A++",
    author: "Johnny",
    company: "ParmiJohnny"
  },
  {
    text: "Extremely responsive, friendly and can get things done for you in a crunch! Needed them for some company shirts and they were spot on with everything we needed from speed of service to price.",
    author: "Dustin L.",
    company: ""
  },
  {
    text: "Highly recommend Printed Essentials! They did great work, phenomenal customer service. Will be back!",
    author: "Lisa R.",
    company: ""
  },
  {
    text: "Could not be happier with this business!! The quality of the shirts is top notch and the design is fantastic! Fantastic people to work with!",
    author: "Angela D.",
    company: ""
  }
];

export function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate how many slides we have (groups of 3 reviews)
  const reviewsPerSlide = 3;
  const totalSlides = Math.ceil(REVIEWS.length / reviewsPerSlide);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  // Get the reviews for the current slide
  const startIdx = currentIndex * reviewsPerSlide;
  const currentReviews = REVIEWS.slice(startIdx, startIdx + reviewsPerSlide);

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-black text-center mb-12 uppercase tracking-tight">
          What Our Customers Are Saying
        </h2>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 bg-white hover:bg-gray-100 text-black rounded-full p-3 shadow-lg transition-all z-10 border border-gray-300"
            aria-label="Previous reviews"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 bg-white hover:bg-gray-100 text-black rounded-full p-3 shadow-lg transition-all z-10 border border-gray-300"
            aria-label="Next reviews"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {currentReviews.map((review, idx) => (
              <div key={idx} className="bg-white border border-gray-300 rounded-lg p-8">
                <div className="mb-4 text-[#00a3ad]">
                  <span className="text-2xl">★★★★★</span>
                </div>
                <p className="text-black leading-relaxed mb-6 italic">
                  {review.text}
                </p>
                <p className="text-black font-bold">
                  — {review.author}
                </p>
                <p className="text-gray-600 text-sm">
                  {review.company}
                </p>
              </div>
            ))}
          </div>

          {/* Indicator Dots */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'bg-[#00a3ad] w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
