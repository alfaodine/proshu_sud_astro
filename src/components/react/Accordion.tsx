import { useState, useRef } from 'react';
import type { FaqItem } from '../../types';
interface Props {
  items: FaqItem[];
}
export default function Accordion({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className="faq__questions">
      <p className="title">Часті питання</p>
      {items.map((item, index) => (
        <div
          key={index}
          className={`faq__question ${activeIndex === index ? 'active-answer' : ''}`}
          onClick={() => toggle(index)}
          style={{ cursor: 'pointer' }}
        >
          <div className="faq__btn">+</div>
          <p>{item.question}</p>
          <div
            ref={(el) => { answerRefs.current[index] = el; }}
            className="faq__answer"
            style={{
              height: activeIndex === index
                ? (answerRefs.current[index]?.scrollHeight ?? 0) + 35 + 'px'
                : 0,
              overflow: 'hidden',
              transition: 'height 0.2s ease-out',
            }}
          >
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}