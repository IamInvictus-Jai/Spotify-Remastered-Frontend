import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const DisplaySong = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { track, isLiked, handleLike, playPreviousSong, playNextSong, playNextBtn } =
    useContext(PlayerContext);

  return (
    <div className="mb-10">
      <div className="flex justify-between">
        <div
          onClick={() => navigate("/")}
          className="p-2 [background:var(--bg02)] border-2 border-[var(--border01)] [box-shadow:var(--box-shadow01)] rounded-full cursor-pointer
        active:[box-shadow:var(--box-shadow02)]"
        >
          <img className="w-6 brightness-75" src={assets.arrow_left} alt="" />
        </div>
        <p className="text-[var(--text-color01)] mt-3">PLAYING NOW</p>
        <div
          className="p-2 [background:var(--bg02)] border-2 border-[var(--border01)] [box-shadow:var(--box-shadow01)] rounded-full cursor-pointer
        active:[box-shadow:var(--box-shadow02)]"
        >
          <img className="w-6 brightness-75" src={assets.menu_icon} alt="" />
        </div>
      </div>

      <div className="flex items-center flex-col mt-8">
        <div className="w-[90%] md:w-[30%] border-8 border-[var(--border02)] [box-shadow:var(--box-shadow03)] rounded-full ">
          <img
            className="w-full rounded-full animate-[rotate_5s_linear_infinite]"
            src={track.image}
            alt=""
          />
        </div>
        <b className="text-[var(--text-color02)] mt-4 text-2xl">{track.name}</b>
        <p className="text-[var(--text-color01)] text-sm mt-2">{track.desc}</p>
        <p className="text-[var(--text-color01)] text-xs mt-2">
          Arijit Singh • 5M views • 2h ago
        </p>
      </div>

      <div className="flex justify-around items-center mt-8">
        <div>
          {isLiked ? (
            <div
              onClick={handleLike}
              className="[filter:var(--heart-glow-filter)] cursor-pointer"
            >
              <img className="w-12" src={assets.like_icon} alt="" />
            </div>
          ) : (
            <div
              onClick={handleLike}
              className="[filter:var(--drop-shadow01)] cursor-pointer"
            >
              <img className="w-12" src={assets.unlike_icon} alt="" />
            </div>
          )}
          <p className="text-[var(--text-color01)] text-xs mt-2">❤️ 10k</p>
        </div>
        <img src={assets.stack_icon} alt="" />
      </div>

      <div className="flex justify-around items-center mt-8">
        <div
          onClick={playPreviousSong}
          className="md:hidden border-2 border-[var(--border01)] p-4 rounded-full [background:var(--bg02)] [box-shadow:var(--box-shadow01)] transition-[box-shadow] cursor-pointer duration-200 active:[box-shadow:var(--box-shadow02)]"
        >
          <img className="w-5" src={assets.prev_icon} alt="" />
        </div>
        <div
          onClick={playNextSong}
          ref={playNextBtn}
          className="md:hidden border-2 cursor-pointer border-[var(--border01)] p-4 rounded-full [background:var(--bg02)] [box-shadow:var(--box-shadow01)] transition-[box-shadow] duration-200 active:[box-shadow:var(--box-shadow02)]"
        >
          <img className="w-5" src={assets.next_icon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default DisplaySong;
