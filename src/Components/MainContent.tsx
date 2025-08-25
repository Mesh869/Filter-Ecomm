import { useState, useEffect } from "react";
import { Tally3 } from "lucide-react";
import axios from "axios";
import { useFilter } from "./Filtercontext";
import Bookcard from "./Bookcard";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrize, maxPrize, keywords } =
    useFilter();

  interface Product {
    category: string;
    id: number;
    title: string;
    price: number;
    rating: number;
  }

  const [product, setProduct] = useState<Product[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    // Fetch products based on filters
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;

    if (keywords) {
      url = `https://dummyjson.com/products/search?q=${keywords}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProduct(response.data.products);
        // console.log(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [keywords, currentPage]);

  const getFilteredProducts = () => {
    let filteredProducts = product;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );

      console.log(filteredProducts);
    }

    if (minPrize !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrize
      );
    }

    if (maxPrize !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrize
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case "cheap":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "expensive":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "popular":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        return filteredProducts;
    }
  };

  const filteredProducts = getFilteredProducts();
  console.log(filteredProducts);

  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    let startPages = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPages, endPage + (2 - currentPage - 1));
    }

    if (currentPage + 2 > totalPages) {
      startPages = Math.max(1, startPages - (currentPage + 2 - totalPages));
    }

    for (let pages = startPages; pages <= endPage; pages++) {
      buttons.push(pages);
    }

    return buttons;
  };

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

        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {filteredProducts.map((product: any) => (
            <Bookcard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
              rating={product.rating}
            />
          ))}
        </div>

        {/** Pagination Controls **/}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-10">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className=" px-4 py-2"
          >
            Previous
          </button>
          {/* <span>Page {currentPage}</span> */}
          <div className="flex flex-wrap justify-content">
            {getPaginationButtons().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`border px-4 py-2 rounded-3xl m-1 ${
                  page === currentPage ? "bg-black text-white" : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className=" px-4 py-2 "
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
