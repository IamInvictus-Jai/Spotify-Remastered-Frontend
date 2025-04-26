import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [activeTabIdx, setActiveTab] = useState(0);

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
