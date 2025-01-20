import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const observer = useRef();

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
        );
        setItems((prevItems) => [...prevItems, ...response.data]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    return fetchItems;
  }, [page]);

  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div className="w-full mt-12 flex items-center justify-center flex-col gap-12">
      <h2 className="text-3xl font-semibold text-gray-700 tracking-wider">
        Infinite Scrolling
      </h2>

      <div className="w-full container mx-auto p-4">
        {items.map((item, index) => {
          if (index === items.length - 1) {
            return (
              <div ref={lastItemRef} key={item.id}>
                <ItemCard data={item} />
              </div>
            );
          }
          return <ItemCard key={item.id} data={item} />;
        })}
      </div>
    </div>
  );
};

const ItemCard = ({ data }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg my-4 transition duration-300 transform hover:-translate-y-1 hover:shadow-xl relative">
      <p className="absolute text-gray-700 font-semibold  top-2 right-2">
        {data.id}
      </p>
      <h2 className="text-2xl font-semibold text-gray-800">{data.title}</h2>
      <p className="mt-4 text-gray-600">{data.body}</p>
    </div>
  );
};

export default InfiniteScroll;
