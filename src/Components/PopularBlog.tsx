import { MessageCircle, ThumbsUp } from "lucide-react";
// import React from "react";

const PopularBlog = () => {
  const blogs = [
    {
      title: "Understanding React Hooks",
      author: "Jane Doe",
      likes: 142,
      comments: 12,
    },
    {
      title: "My Amazing Blog Title 2",
      author: "Jordan",
      likes: 153,
      comments: 25,
    },
    {
      title: "Mastering JavaScript Closures", // changed to unique title
      author: "Baily",
      likes: 52,
      comments: 14,
    },
  ];

  return (
    <div className="bg-white p-5 w-[18rem] mt-4 border ml-3 rounded">
      <h2 className="text-xl font-bold mb-5">Popular Blogs</h2>
      <ul>
        {blogs.map((blog, index) => {
          return (
            <li key={index} className="mb-4 ">
              <h3 className="font-semibold mt-2">{blog.title}</h3>
              <p className="text-sm text-gray-600 mt-2">
                published by {blog.author}
              </p>
              <div className=" flex mt-3 text-sm text-gray-600">
                <MessageCircle size={14} />
                <span className="text-gray-500 mr-5 ml-1">
                  {blog.likes} Likes
                </span>{" "}
                <ThumbsUp size={14} />
                <span className="text-gray-500 mr-2 ml-2">
                  {blog.comments} Comments
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PopularBlog;
