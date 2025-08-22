// import React from "react";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface filtercontextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  minPrize: number | undefined;
  setMinPrize: (price: number | undefined) => void;
  maxPrize: number | undefined;
  setMaxPrize: (price: number | undefined) => void;
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
}

const FilterContext = createContext<filtercontextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPrize, setMinPrize] = useState<number | undefined>(undefined);
  const [maxPrize, setMaxPrize] = useState<number | undefined>(undefined);
  const [keywords, setKeywords] = useState<string[]>([]);

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrize,
        setMinPrize,
        maxPrize,
        setMaxPrize,
        keywords,
        setKeywords,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
