import React from "react";
import { Routes, Route} from "react-router-dom";
// import { albumsData } from "../assets/assets";
import DisplayHome from './DisplayHome';
import DisplayAlbum from './DisplayAlbum';
import DisplaySong from "./DisplaySong";
import DisplaySearch from "./DisplaySearch";

const Display = ()=> {
    return (
      <div className="w-full mb-2 mt-2 px-6 pt-4 rounded [background:var(--bg01)] text-[var(--primary-text-color)] overflow-auto lg:w-[75%] lg:ml-0">
        <Routes>
          <Route path="/" element={<DisplayHome />} />
          <Route path="/album/:id" element={<DisplayAlbum />} />
          <Route path="/song/:id" element={<DisplaySong />} />
          <Route path="/search" element={<DisplaySearch />} />
        </Routes>
      </div>
    );
}

export default Display;