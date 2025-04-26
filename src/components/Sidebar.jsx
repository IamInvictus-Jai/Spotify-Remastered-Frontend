import React from "react";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-[var(--primary-text-color)] hidden lg:flex">
      {/* Sidebar Top -> Home and Search */}
      <div className="[background-image:var(--bg01)] h-[15%] p-2 rounded-lg flex flex-col justify-around">
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <img className="w-6" src={assets.home_icon} alt="" />
          <p className="font-bold">Home</p>
        </div>
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <img className="w-6" src={assets.search_icon} alt="" />
          <p className="font-bold">Search</p>
        </div>
      </div>

      {/* Sidebar Middle -> Your Library, Playlists, Podcasts */}
      <div className="[background-image:var(--bg01)] h-[80%] p-2 rounded-lg">
        <div className="p-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-5" src={assets.arrow_icon} alt="" />
            <img className="w-5" src={assets.plus_icon} alt="" />
          </div>
        </div>
        <div className="p-4 [background-image:var(--bg02)] border-10 border-[var(--border02)] [box-shadow:var(--box-shadow03)] rounded m-2 font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1 className="text-[var(--text-color02)]">
            Create your first playlist
          </h1>
          <p className="font-light text-[var(--text-color02)]">
            It's easy, we'll help you
          </p>
          <button className="px-4 py-1.5 bg-[var(--btn-color01)] [box-shadow:var(--box-shadow03)] text-[15px] text-[var(--secondary-text-color)] rounded full mt-4">
            Create playlist
          </button>
        </div>
        <div className="p-4 [background-image:var(--bg02)] border-10 border-[var(--border02)] [box-shadow:var(--box-shadow03)] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
          <h1 className="text-[var(--text-color02)]">Find podcasts</h1>
          <p className="font-light text-[var(--text-color02)]">
            We'll help you find the right podcasts
          </p>
          <button className="px-4 py-1.5 bg-[var(--btn-color01)] [box-shadow:var(--box-shadow03)] text-[15px] text-[var(--secondary-text-color)] rounded full mt-4">
            Browse podcasts
          </button>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;