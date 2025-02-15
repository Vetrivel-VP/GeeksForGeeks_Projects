import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";

const InfiniteScroll = () => {
  const [items, setItems] = useState([]); // Store images
  const [loading, setLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // If more data is available
  const [page, setPage] = useState(1); // Page number

  const observer = useRef(); // Ref for infinite scrolling

  const UNSPLASH_API = "https://api.unsplash.com/photos";
  const ACCESS_KEY = "swH2LslVeDBk7-9krSmusKANrll6YaR7cnrx0QnNah0"; // Replace with your API key

  // Fetch images from Unsplash
  const fetchItems = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    console.log(`Fetching page ${page}...`); // Debugging: log page number

    try {
      const response = await axios.get(UNSPLASH_API, {
        params: {
          page,
          per_page: 10,
          client_id: ACCESS_KEY,
        },
      });

      console.log("API response:", response.data); // Debugging: log API response

      // Append unique items only
      setItems((prevItems) => {
        const newItems = response.data.filter(
          (newItem) => !prevItems.some((prevItem) => prevItem.id === newItem.id)
        );
        return [...prevItems, ...newItems];
      });

      // Stop if no new items are returned
      if (response.data.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetchItems when page changes
  useEffect(() => {
    fetchItems();
  }, [page]); // Depend only on `page`

  // Infinite scroll logic
  const lastItemRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log("Intersecting last item, fetching next page...");
          setPage((prevPage) => prevPage + 1); // Increment page
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="w-full mt-12 flex items-center justify-center flex-col gap-12">
      <h2 className="text-3xl font-semibold text-gray-700 tracking-wider">
        Infinite Scrolling with Unsplash Images
      </h2>

      <div className="w-full container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      {!hasMore && <p>No more images to load.</p>}
    </div>
  );
};

const ImageCard = ({ data }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg my-4 transition duration-300 transform hover:-translate-y-1 hover:shadow-xl relative">
      <img
        className="w-full h-64 object-cover rounded-lg"
        src={data.urls.small}
        alt={data.alt_description || "Unsplash Image"}
      />
      <h2 className="mt-2 text-gray-800 text-lg font-semibold">
        {data.user.name}
      </h2>
    </div>
  );
};

export default InfiniteScroll;
