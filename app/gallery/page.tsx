'use client';

import { useState } from 'react';
import Image from 'next/image';

const GALLERY_IMAGES = [
  'IMG_0028.jpg',
  'IMG_0030.jpg',
  'IMG_0031.jpg',
  'IMG_0282.jpg',
  'IMG_0286.jpg',
  'IMG_0349.jpg',
  'IMG_0367.jpg',
  'IMG_0368.jpg',
  'IMG_0369.jpg',
  'IMG_0386.jpg',
  'IMG_0713.jpg',
  'IMG_0714.jpg',
  'IMG_0716.jpg',
  'IMG_0717.jpg',
  'IMG_6697.jpg',
  'IMG_7024-1.jpg',
  'IMG_7243.jpg',
  'IMG_7246.jpg',
  'IMG_7261 2.jpg',
  'IMG_7283.jpg',
  'IMG_7302 2.jpg',
  'IMG_8306.jpg',
  'IMG_8921.jpg',
  'IMG_9036.jpg',
  'IMG_9041.jpg',
  'IMG_9412.jpg',
  'IMG_9413.jpg',
  'IMG_9417.jpg',
  'IMG_9430.jpg',
  'IMG_9432.jpg',
  'IMG_9434.jpg',
  'IMG_9437.jpg',
  'IMG_9778.jpg',
  'IMG_9938.jpg',
  'IMG_9944.jpg',
  'IMG_9947.jpg',
  'IMG_9962.jpg',
  'IMG_9966.jpg',
  'IMG_9999.jpg',
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-black">
            Our Work
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Take a look at some of the custom apparel and branded merchandise we've created for our customers.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {GALLERY_IMAGES.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group border-2 border-gray-200 hover:border-[#00a3ad] transition-all"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={`/gallery/${image}`}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-[#00a3ad] transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={`/gallery/${selectedImage}`}
              alt="Selected gallery image"
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
