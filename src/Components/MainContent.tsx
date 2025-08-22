import { useState, useEffect } from "react";
import { Tally3 } from "lucide-react";

import { useFilter } from "./Filtercontext";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrize, maxPrize, keywords } =
    useFilter();

  const [product, setProduct] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropDownMenu, setDropDownMenu] = useState(true);
  const itemsPerPage = 12;

  useEffect(() => {
    // Fetch products based on filters
    let url = `https://dummyjson.com/products/search?q=${keywords}&limit=${itemsPerPage}&page=${currentPage}`;
  }, [keywords, currentPage]);

  return (
    <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative mb-5 mt-5">
            <button className="border px-4 py-2 rounded-full flex  items-center">
              <Tally3 className="mr-2" />
              {/* <span>Filter</span> */}

              {filter !== "all"
                ? filter.charAt(0).toLowerCase() + filter.slice(1)
                : "Filter"}
            </button>

            {dropDownMenu && (
              <div className="absolute bg-white border border-gray-200 rounded mt-2 w-full sm:w-40">
                <button
                  onClick={() => setFilter("cheap")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Cheap
                </button>
                <button
                  onClick={() => setFilter("expensive")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Expensive
                </button>
                <button
                  onClick={() => setFilter("popular")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
