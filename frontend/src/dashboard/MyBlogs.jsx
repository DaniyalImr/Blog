import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/blogs/myblog",
          { withCredentials: true }
        );
        setMyBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:4001/api/blogs/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message || "Blog deleted successfully");
        setMyBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to delete blog");
      });
  };

  return (
    <div className="container mx-auto my-12 p-4 md:ml-72"> {/* Adjusted left margin */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {myBlogs && myBlogs.length > 0 ? (
          myBlogs.map((element) => (
            <Link to={`/blog/${element._id}`}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer w-72" // Reduced width of each card
              key={element._id}
              onClick={() => navigate(`/blog/${element._id}`)}
            >
              {element?.blogImage && (
                <img
                  src={element.blogImage.url}
                  alt="blogImg"
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <span className="text-sm text-gray-500">{element.category}</span>
                <h4 className="text-xl font-semibold my-2">{element.title}</h4>
                <div className="flex justify-between mt-4">
                  <Link
                    to={`/blog/update/${element._id}`}
                    className="text-blue-500 bg-white rounded-md shadow-md px-3 py-1 border border-gray-300 hover:bg-blue-100 transition"
                  >
                    UPDATE
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(element._id);
                    }}
                    className="text-red-500 bg-white rounded-md shadow-md px-3 py-1 border border-gray-300 hover:bg-red-100 transition"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">
            You have not posted any blog to see!
          </p>
        )}
      </div>
    </div>
  );
}

export default MyBlogs;
