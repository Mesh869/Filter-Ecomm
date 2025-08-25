import React from "react";
import { Link } from "react-router-dom";

interface BookcardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
}

const Bookcard: React.FC<BookcardProps> = ({
  id,
  title,
  image,
  price,
  rating,
}) => {
  return (
    <div className="border p-4 rounded-md">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover mb-2"
        />
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">${price}</p>
        <p className="text-yellow-500">{rating} ★</p>
      </Link>
    </div>
  );
};

export default Bookcard;
