import { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { Testimonial } from '../../types';

interface Props {
  testimonials: Testimonial[];
}

export default function Carousel({ testimonials }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: false,
    slidesToScroll: 1,
    loop: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="reviews">
      <div className="reviews__nav">
        <p className="reviews__title">Відгуки клієнтів</p>
        <div className="reviews__btns">
          <div className="reviews__btn prev-btn" onClick={scrollPrev} style={{ cursor: 'pointer' }}>&#60;</div>
          <div className="reviews__btn next-btn" onClick={scrollNext} style={{ cursor: 'pointer' }}>&#62;</div>
        </div>
      </div>
      <div ref={emblaRef} style={{ overflow: 'hidden', cursor: 'grab' }}>
        <div style={{ display: 'flex' }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                flex: '0 0 370px',
                minWidth: 0,
                marginRight: '30px',
                border: '1px solid rgba(0, 0, 0, 0.03)',
                boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
                borderRadius: '20px',
                padding: '30px',
              }}
            >
              <p className="reviews__block-title">{t.title}</p>
              <p className="reviews__block-text">"{t.text}"</p>
              <p className="reviews__block-info">{t.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
