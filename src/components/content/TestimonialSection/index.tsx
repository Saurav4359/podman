import React from 'react';
import Testimonial from '@site/src/components/ui/Testimonial';
import { testimonials } from '@site/static/data/testimonials';

function TestimonialSection() {
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section className="border-t border-gray-200 bg-gray-50 py-10 dark:border-gray-700 dark:bg-white/[0.02] md:py-12">
      <h2 className="mb-8 text-center text-2xl font-bold !text-gray-900 dark:!text-gray-50 md:mb-10 md:text-3xl">
        What people are saying about Podman
      </h2>

      <div className="testimonial-marquee overflow-hidden">
        <div className="testimonial-marquee__track flex w-max">
          {marqueeItems.map((testimonial, index) => (
            <div key={`${testimonial.handle}-${index}`} className="shrink-0 px-3">
              <Testimonial {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
