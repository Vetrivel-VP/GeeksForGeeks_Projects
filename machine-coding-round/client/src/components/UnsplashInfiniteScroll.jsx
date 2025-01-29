import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";

const UnsplashInfiniteScroll = () => {
  const [items, setItems] = useState([]); // store the images
  const [loading, setLoading] = useState(false); // loading state
  const [hasMore, setHasMore] = useState(true); // if more data is available
  const [page, setPage] = useState(1); // page number

  //   ref for infite scrolling
  const observer = useRef();

  const UNSPLASH_API = "https://api.unsplash.com/photos";
  const ACCESS_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

  //   fetch images from unsplash

  const fetchItems = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    console.log(`Fetching page ... ${page} `);

    try {
      const response = await axios.get(UNSPLASH_API, {
        params: {
          page,
          per_page: 10,
          client_id: ACCESS_API_KEY,
        },
      });

      console.log(`API Response : ${response.data}`);

      //   append unique items only
      setItems((prevItems) => {
        const newItems = response.data.filter(
          (newItem) => !prevItems.some((prevItem) => prevItem.id === newItem.id)
        );

        return [...prevItems, ...newItems];
      });

      //   stop if there is no items
      if (response.data.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //   trigger fetchItems when page changes
  useEffect(() => {
    fetchItems();
  }, [page]);

  //   infinite scroll logic

  const lastItemRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log(`Intersecting last items, fetching next page...`);
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="w-full mt-12 flex items-center justify-center flex-col gap-12">
      <h2 className="text-3xl font-semibold text-gray-700 tracking-wider">
        Infinte scrolling with Unpslash Images
      </h2>

      <div className="w-full container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => {
          if (index === items.length - 1) {
            return (
              <div ref={lastItemRef} key={item.id}>
                <ImageCard data={item} />
              </div>
            );
          }
          return <ImageCard key={item.id} data={item} />;
        })}
      </div>

      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more images to load...</p>}
    </div>
  );
};

const ImageCard = ({ data }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg my-4 transition duration-300 transform hover:translate-y-1 hover:shadow-xl">
      <img
        src={data.urls.small}
        alt=""
        className="w-full h-64 object-cover rounded-lg"
      />

      <h2 className="mt-2 text-gray-800 text-lg font-semibold">
        {data.user.name}
      </h2>
    </div>
  );
};

export default UnsplashInfiniteScroll;
