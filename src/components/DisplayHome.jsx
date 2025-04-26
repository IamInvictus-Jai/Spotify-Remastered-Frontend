import React, { useRef, useEffect, useState } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { assets, albumsData, songsData } from "../assets/assets";


const DisplayHome = () => {
  // const albumWrapRef = useRef(null);
  // const trendingWrapRef = useRef(null);
  // const [isAlbumEndReached, setIsEndReached] = useState(false);
  // const [isTrendingEndReached, setIsTrendingEndReached] = useState(false);

  // Toggle Scroll Indicator for trending
  // useEffect(() => {
  //   if (albumWrapRef.current) {
  //     const albummWrap = albumWrapRef.current;

  //     const checkScroll = () => {
  //       // Check if scrolled to end (considering rounding errors)
  //       const isAtEnd =
  //         Math.abs(
  //           albummWrap.scrollWidth -
  //             albummWrap.clientWidth -
  //             albummWrap.scrollLeft
  //         ) < 1;

  //       setIsEndReached(isAtEnd);
  //     };

  //     albummWrap.addEventListener("scroll", checkScroll);

  //     // Clean up event listener
  //     return () => albummWrap.removeEventListener("scroll", checkScroll);
  //   }
  // }, []);

  // // Toggle Scroll Indicator for trending
  // useEffect(() => {
  //   if (trendingWrapRef.current) {
  //     const trendingWrap = trendingWrapRef.current;

  //     const checkScroll = () => {
  //       // Check if scrolled to end (considering rounding errors)
  //       const isAtEnd =
  //         Math.abs(
  //           trendingWrap.scrollWidth -
  //             trendingWrap.clientWidth -
  //             trendingWrap.scrollLeft
  //         ) < 1;

  //       setIsTrendingEndReached(isAtEnd);
  //     };

  //     trendingWrap.addEventListener("scroll", checkScroll);

  //     // Clean up event listener
  //     return () => trendingWrap.removeEventListener("scroll", checkScroll);
  //   }
  // }, []);

  return (
    <>
      <Navbar />
      <div className="mb-4 relative">
        <h1 className="my-5 font-bold text-2xl">Featured</h1>
        <div
          // ref={albumWrapRef}
          className="flex overflow-auto text-[var(--text-color02)]"
        >
          {albumsData.map((item, idx) => {
            return (
              <AlbumItem
                key={idx}
                name={item.name}
                desc={item.desc}
                id={item.id}
                image={item.image}
              />
            );
          })}
        </div>
        {/* {!isAlbumEndReached && (
          <div className="w-10 h-10 p-2 rounded-full bg-[var(--bg05)] absolute top-1/2 right-0">
            <img className="w-full h-full" src={assets.arrow_right} alt="" />
          </div>
        )} */}
      </div>
      <div className="mb-4 relative">
        <h1 className="my-5 font-bold text-2xl">Trending</h1>
        <div
          // ref={trendingWrapRef}
          className="flex overflow-auto text-[var(--text-color02)]"
        >
          {songsData.map((item, idx) => {
            return (
              <SongItem
                key={idx}
                name={item.name}
                desc={item.desc}
                id={item.id}
                image={item.image}
              />
            );
          })}
        </div>
        {/* {!isTrendingEndReached && (
          <div className="w-10 h-10 p-2 rounded-full bg-[var(--bg05)] absolute top-1/2 right-0">
            <img className="w-full h-full" src={assets.arrow_right} alt="" />
          </div>
        )} */}
      </div>
    </>
  );
}

export default DisplayHome;