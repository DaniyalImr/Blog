import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Creators() {
  const [creators, setCreators] = useState([]);
  console.log(creators)

  useEffect(() => {
    const fetchCreators = async () => {
      const { data } = await axios.get("http://localhost:4001/api/users/admins", {
        withCredentials: true,
      });
      setCreators(data);
    };
    fetchCreators();
  }, []);
 
  return (
    <div className="container mx-auto my-12 p-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Popular Creators</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {creators && creators.length > 0 ? (
          creators.slice(0, 10).map((element) => (
            <div className="px-2" key={element._id}>
             <div className="bg-white rounded-full p-4 hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="relative flex flex-col items-center">
                  <img
                    src={element.photo.url}
                    alt={element.name}
                    className="md:w-56 md:h-56 rounded-full border-4 border-gray-300 object-cover mb-4"
                  />
                    <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
                  <img
                    src={element.photo.url}
                    alt={element.name}
                    className="w-16 h-16 rounded-full mx-auto border-4 border-gray-700"
                  />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">{element.name}</h2>
                  <p className="text-gray-500">{element.role}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No creators found</div>
        )}
      </div>
    </div>
  );
}

export default Creators
