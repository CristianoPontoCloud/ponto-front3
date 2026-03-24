import { useEffect, useState } from "react";

export function useTopOffset(ref: React.RefObject<HTMLElement>) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function calculateOffset() {
      if (ref.current) {
        const bottom = ref.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        setOffset(windowHeight - bottom);
      }
    }

    calculateOffset(); // calcular no mount
    window.addEventListener('resize', calculateOffset);

    return () => {
      window.removeEventListener('resize', calculateOffset);
    };
  }, [ref]);

  return offset;
}
