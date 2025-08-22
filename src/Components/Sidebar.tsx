import { useState, useEffect } from "react";
import { useFilter } from "./Filtercontext";

interface product {
  category: string;
}

interface FetchResponse {
  products: product[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrize,
    setMinPrize,
    maxPrize,
    setMaxPrize,
    // keywords,
    setKeywords,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMinPrizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrize(value ? parseFloat(value) : undefined);
  };

  const handleMaxPrizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrize(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordClicked = (keyword: string[]) => {
    setKeywords(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrize(undefined);
    setMaxPrize(undefined);
    setKeywords([]);
  };

  return (
    <div className="w-64 p-5 h-screen">
      <h2 className="text-2xl font-bold mb-7">Categories</h2>

      <section>
        <input
          type="text"
          className="border px-2 py-2 sm:mb-0"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex justify-center items-center mt-4">
          <input
            type="text"
            className="border mr-2 px-5 py-2 mb-3 w-full"
            placeholder="min"
            value={minPrize ?? ""}
            onChange={handleMinPrizeChange}
          />
          <input
            type="text"
            className="border  mr-2 px-5 py-2 mb-3 w-full"
            placeholder="max"
            value={maxPrize ?? ""}
            onChange={handleMaxPrizeChange}
          />
        </div>

        {/* category section */}
        <div className="mb-5">
          <h2 className="text-xl font-bold mb-3">Categories</h2>
        </div>

        <section>
          {categories.map((category, index) => (
            <label key={index} className="block mb-2">
              <input
                type="radio"
                name="category"
                value={category}
                onChange={() => handleRadioChangeCategory(category)}
                className="mr-2 w-[16px] h-[16px]"
                checked={selectedCategory === category}
              />
              {category.toUpperCase()}
            </label>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Keywords</h2>
          <div>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeywordClicked([keyword])}
                className="block mb-2 px-4 py-2 w-full text-left  rounded hover:bg-gray-200"
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </section>

        <button
          onClick={handleResetFilters}
          className="mt-5 w-full mb-[4rem] bg-black text-white py-2 rounded "
        >
          Reset Filters
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
