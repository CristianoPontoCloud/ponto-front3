import {
  type RefObject,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface BottomOffsetContextType {
  offset: number;
}

const BottomOffsetContext = createContext<BottomOffsetContextType | undefined>(undefined);

interface BottomOffsetProviderProps {
  children: React.ReactNode;
  refTarget: RefObject<HTMLElement>;
}

export const BottomOffsetProvider = ({ children, refTarget }: BottomOffsetProviderProps) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function calculateOffset() {
      if (refTarget.current) {
        const bottom = refTarget.current.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        setOffset(windowHeight - bottom);
      }
    }

    calculateOffset();
    window.addEventListener("resize", calculateOffset);
    return () => window.removeEventListener("resize", calculateOffset);
  }, [refTarget]);

  return (
    <BottomOffsetContext.Provider value={{ offset }}>
      {children}
    </BottomOffsetContext.Provider>
  );
};

export const useBottomOffsetContext = () => {
  const context = useContext(BottomOffsetContext);
  if (!context) {
    throw new Error("useBottomOffsetContext must be used within a BottomOffsetProvider");
  }
  return context;
};
