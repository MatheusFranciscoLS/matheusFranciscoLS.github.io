import { useEffect, useRef, useState } from 'react';
import './Reveal.css';

const Reveal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (currentRef) observer.unobserve(currentRef);
        }
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div ref={ref} className={`reveal-wrapper ${isVisible ? 'reveal-visible' : ''}`}>
      {children}
    </div>
  );
};

export default Reveal;
