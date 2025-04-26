import React, { useContext } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { albumsData, assets, songsData } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";


const DisplayAlbum = () => {
    const { id } = useParams();
    const albumData = albumsData[id];
    const { playWithId } = useContext(PlayerContext);

    return (
      <>
        <Navbar />
        <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end text-[var(--text-color02)]">
          <img
            className="w-48 rounded-xl [background-image:var(--bg02)] border-10 border-[var(--border02)] [box-shadow:var(--box-shadow03)]"
            src={albumData.image}
            alt=""
          />
          <div className="flex flex-col">
            <p>Playlist</p>
            <h2 className="text-5xl font-bold mb-4 md:text-7xl text-[var(--primary-text-color)]">
              {albumData.name}
            </h2>
            <h4>{albumData.desc}</h4>
            <p className="mt-1">
              <img
                className="inline-block w-5 mr-2"
                src={assets.spotify_logo}
                alt=""
              />
              <span className="mr-4">Spotify</span>❤️ {10}k likes •{" "}
              <b>{songsData.length} songs, </b>
              about {20} mins
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 mt-10 mb-4 text-[var(--text-color02)]">
          <p>
            <b className="mr-4">#</b>Title
          </p>
          <p className="hidden sm:block">Album</p>
          <p className="hidden sm:block">Date Added</p>
          <img className="m-auto w-4" src={assets.clock_icon} alt="" />
        </div>
        <hr />
        {songsData.map((item, idx) => {
          return (
            <div
              onClick={() => playWithId(item.id)}
              key={idx}
              className="grid grid-cols-2 pl-2 sm:grid-cols-4 gap-2 py-2 items-center text-[var(--text-color01)] hover:bg-[var(--bg05)] hover:text-[var(--primary-text-color)] cursor-pointer"
            >
              <p className="text-[var(--text-color02)] hover:text-[var(--primary-text-color)]">
                <b className="mr-4 text-[#7a7a7]">{idx + 1}</b>
                <img className="inline w-10 mr-2" src={item.image} alt="" />
                {item.name}
              </p>
              <p className="text-[15px] hidden sm:block">{albumData.name}</p>
              <p className="text-[15px] hidden sm:block">10000 yrs ago</p>
              <p className="text-[15px] text-center">{item.duration}</p>
            </div>
          );
        })}
      </>
    );
}

export default DisplayAlbum