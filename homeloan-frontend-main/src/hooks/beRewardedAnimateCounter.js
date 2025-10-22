import { useEffect, useRef, useState } from "react";

const useAnimatedCounter = (targetValue = 0.3, duration = 3000) => {
  const [count, setCount] = useState(0.0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset to 0 every time it becomes visible
          setCount(0.0);

          let start = null;

          const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const newCount = Math.min((progress / duration) * targetValue, targetValue);
            setCount(parseFloat(newCount.toFixed(2)));

            if (newCount < targetValue) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [targetValue, duration]);

  return { ref, count };
};

export default useAnimatedCounter;
