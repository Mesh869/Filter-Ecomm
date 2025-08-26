import React, { useEffect, useState } from "react";

interface Author {
  name: string;
  isFollowing: boolean;
  image: string;
}

const Topsellers = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=5");
        const data = await response.json();

        const authorsData: Author[] = data.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          isFollowing: false,
          image: user.picture.medium,
        }));

        setAuthors(authorsData);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchData();
  }, []);

  const handleFollowClick = (index: number) => {
    setAuthors((prevAuthors) =>
      prevAuthors.map((author, i) =>
        i === index ? { ...author, isFollowing: !author.isFollowing } : author
      )
    );
  };

  return (
    <div className="bg-white p-3 mx-3 mt-[6.5rem] border w-[18rem] rounded">
      <h2 className="text-xl font-bold mb-5">Topsellers</h2>
      <ul>
        {authors.map((author, index) => (
          <li key={index} className="flex items-center mb-4">
            <section className="flex items-center justify-center">
              <img
                src={author.image}
                alt={author.name}
                className="w-[15%] h-[15%] justify-center rounded-full"
              />
              <span className="ml-4 w-30 text-sm">{author.name}</span>
            </section>

            <button
              onClick={() => handleFollowClick(index)}
              className={`py-1 px-3 rounded ${
                author.isFollowing
                  ? "bg-red-500 text-white"
                  : "bg-black text-white"
              }`}
            >
              {author.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Topsellers;
