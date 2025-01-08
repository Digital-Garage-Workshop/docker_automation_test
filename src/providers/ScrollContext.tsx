"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useRef,
  MutableRefObject,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { boolean } from "yup";

interface ScrollContextType {
  ref: MutableRefObject<HTMLDivElement | null>;
  scrollToSection: () => void;
  setCarSelection: Dispatch<SetStateAction<boolean>>;
  isCarSelectionFocused: boolean;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider = ({ children }: ScrollProviderProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isCarSelectionFocused, setCarSelection] = useState(false);

  useEffect(() => {
    if (isCarSelectionFocused)
      setTimeout(() => {
        setCarSelection(false);
      }, 2000);
  }, [isCarSelectionFocused]);

  const scrollToSection = () => {
    if (ref.current) {
      const elementTop =
        ref.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementTop - 120,
        behavior: "smooth",
      });
      setTimeout(() => {
        setCarSelection(true);
      }, 700);
    }
  };

  return (
    <ScrollContext.Provider
      value={{ ref, scrollToSection, setCarSelection, isCarSelectionFocused }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error("useScrollContext must be used within a ScrollProvider");
  }
  return context;
};
