import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SongItem from "./SongItem";
import Navbar from "./Navbar";

const DisplaySearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/search?q=${encodeURIComponent(searchQuery)}`
        );
        const data = await response.json();
        setSearchResults(data.songs_list || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div className="h-full overflow-auto">
      <Navbar />
      <div className="mt-8">
        <h1 className="text-3xl font-bold mb-6">
          {searchQuery ? `Search results for "${searchQuery}"` : "Search"}
        </h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-10">
            {searchQuery ? (
              <p className="text-gray-400">No results found for "{searchQuery}"</p>
            ) : (
              <p className="text-gray-400">Enter a search term to find songs</p>
            )}
          </div>
        ) : (
          <div className="mt-4">
            <div className="flex text-xs text-[var(--text-color01)] uppercase mb-2 px-3 font-medium">
              <div className="w-12 mr-4"></div>
              <div className="flex-grow">Title & Artist</div>
              <div className="ml-4 w-16 text-right">Duration</div>
            </div>
            <div className="bg-[#ffffff0a] rounded-md overflow-hidden">
              {searchResults.map((song) => (
                <SongItem key={song.id} song={song} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplaySearch;
