import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTabIdx, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Extract search query from URL if on search page
  React.useEffect(() => {
    if (location.pathname === "/search") {
      const query = new URLSearchParams(location.search).get("q") || "";
      setSearchQuery(query);
    }
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-4">
          <img
            onClick={() => {
              navigate(-1);
            }}
            className="w-8 [background:var(--bg02)] [box-shadow:var(--box-shadow02)] brightness-90 p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_left}
            alt=""
          />
          <img
            onClick={() => {
              navigate(1);
            }}
            className="w-8 [background:var(--bg02)] [box-shadow:var(--box-shadow02)] brightness-90 p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_right}
            alt=""
          />
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative ml-4 flex-grow max-w-md">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for songs or artists..."
                className="w-full py-2 px-4 pl-10 rounded-full bg-[var(--bg02)] text-[var(--primary-text-color)] focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
        
        <div className="flex items-center gap-4">
          <p className="bg-[var(--btn-color01)] [box-shadow:var(--box-shadow03)] text-[var(--secondary-text-color)] text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Explore Premium
          </p>
          <p className="[background-image:var(--bg02)] border-10 border-[var(--border02)] [box-shadow:var(--box-shadow03)] text-[var(--text-color02)] py-1 px-3 rounded-2xl text-[15px] cursor-pointer">
            Install App
          </p>
          <p className="border-4 border-[var(--border02)] [box-shadow:var(--box-shadow03)] p-4 bg-[var(--profile-bg-color)] text-[var(--primary-text-color)] w-7 h-7 rounded-full cursor-pointer flex items-center justify-center">
            IJ
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        {["All", "Music", "Podcast"].map((item, idx) => {
          return (
            <p
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`
              ${
                activeTabIdx === idx
                  ? "bg-[var(--btn-color01)] [box-shadow:var(--box-shadow03)] text-[var(--secondary-text-color)]"
                  : "[background:var(--bg04)] [box-shadow:var(--box-shadow04)]"
              }
               text-[15px] px-4 py-1 rounded-2xl cursor-pointer
               transition-all duration-300 ease-in-out`}
            >
              {item}
            </p>
          );
        })}
      </div>
    </>
  );
}

export default Navbar;
