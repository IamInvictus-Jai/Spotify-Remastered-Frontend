import React, { useEffect, useRef, useContext } from "react";
import { assets, songsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";

function Player() {
  const navigate = useNavigate();
  const songNameRef = useRef(null);
  const {
    seekBar,
    seekBarController,
    seekBg,
    track,
    time,
    playStatus,
    playPauseBtnRef,
    handlePlayPauseWrapper,
    playPreviousSong,
    playNextSong,
    seekSong,
    playNextBtn,
    loopSong,
    isLoopActive,
    volumeBar,
    handleVolumeControl,
    isPlayerMuted,
    muteUnmuteVolume,
  } = useContext(PlayerContext);
  const currentSong = track;

  useEffect(() => {
    if (songNameRef.current) {
      const textWidth = songNameRef.current.offsetWidth;
      const duration = Math.max(textWidth / 20, 5);
      songNameRef.current.style.animationDuration = `${duration}s`;
    }
  }, [currentSong]);

  return (
    <div className="relative h-[15%] [background-image:var(--bg01)] flex justify-between items-center text-[var(--text-color02)] px-4">
      <div className="flex items-center gap-4 absolute md:static -translate-y-1/2 md:translate-y-0">
        <div className="border-4 border-[var(--border02)] [box-shadow:var(--box-shadow03)] rounded-full md:mt-0">
          <img
            onClick={() => {
              navigate("/song/" + currentSong.id);
            }}
            className="w-12 rounded-full lg:w-12 cursor-pointer"
            src={currentSong.image}
            alt=""
          />
        </div>
        <div>
          <div className="max-w-[120px] h-8 overflow-hidden [mask-image:var(--mask)]">
            <div className="inline-block whitespace-nowrap">
              <p ref={songNameRef} className=" animate-marquee">
                {currentSong.name}
              </p>
            </div>
          </div>
          <p>{currentSong.desc.slice(0, 21)}...</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 m-auto text-[var(--text-color01)]">
        <div className="flex gap-8 ml-auto md:ml-0">
          <img
            className="w-4 h-5 mt-2 cursor-pointer brightness-75 hidden md:inline-block"
            src={assets.shuffle_icon}
            alt=""
          />
          <div
            onClick={playPreviousSong}
            className=" hidden md:inline-block border-2 border-[var(--border01)] p-2 rounded-full [background:var(--bg02)] [box-shadow:var(--box-shadow01)] transition-[box-shadow] cursor-pointer duration-200 active:[box-shadow:var(--box-shadow02)]"
          >
            <img className="w-4 mt-1" src={assets.prev_icon} alt="" />
          </div>
          {
            <div
              ref={playPauseBtnRef}
              onClick={handlePlayPauseWrapper}
              className="border-2 cursor-pointer border-[var(--border01)] p-3 md:p-2 rounded-full [background:var(--bg02)] [box-shadow:var(--box-shadow01)] transition-[box-shadow] duration-200 active:[box-shadow:var(--box-shadow02)]"
            >
              {playStatus ? (
                <img className="w-5" src={assets.pause_icon} alt="" />
              ) : (
                <img className="w-5" src={assets.play_icon} alt="" />
              )}
            </div>
          }
          <div
            onClick={playNextSong}
            ref={playNextBtn}
            className=" hidden md:inline-block border-2 cursor-pointer border-[var(--border01)] p-2 rounded-full [background:var(--bg02)] [box-shadow:var(--box-shadow01)] transition-[box-shadow] duration-200 active:[box-shadow:var(--box-shadow02)]"
          >
            <img className="w-4 mt-1" src={assets.next_icon} alt="" />
          </div>
          {!isLoopActive && (
            <img
              onClick={() => {
                loopSong();
              }}
              className="w-6 h-6 mt-2 cursor-pointer brightness-75"
              src={assets.repeat_icon}
              alt=""
            />
          )}
          {isLoopActive && (
            <img
              onClick={() => {
                loopSong();
              }}
              className="w-6 h-6 mt-2 cursor-pointer brightness-75"
              src={assets.repeat_on_icon}
              alt=""
            />
          )}
        </div>
        <div className="flex items-center gap-5 mt-4 lg:mt-0">
          <p>
            {time.currentTime.min}:{time.currentTime.second < 10 ? "0" : ""}
            {time.currentTime.second}
            {/* 0:00 */}
          </p>
          <div
            onClick={(e) => {
              seekSong(e);
            }}
            ref={seekBg}
            className="w-[60dvw] max-w-[500px] h-2 relative [background:var(--bg04)] [box-shadow:var(--box-shadow04)] rounded-full cursor-pointer"
          >
            <div
              ref={seekBar}
              className="relative [background:var(--play-btn-bg-gradient)] [box-shadow:var(--glow-shadow)] w-[0%] rounded-full h-2
              
              before:content-[''] before:absolute before:[background:var(--bg02)] before:[box-shadow:var(--box-shadow05)] before:rounded-full before:top-1/2 before:-right-[14px] before:z-[2] before:w-[28px] before:h-[28px] before:outline-none before:border-none  before:pointer-events-none before:-translate-y-1/2 before:transition-all before:duration-200
              
              after:content-[''] after:absolute after:bg-[var(--play-btn-bg)] after:rounded-full after:top-1/2 after:-right-[5px] after:z-[2] after:w-[10px] after:h-[10px] after:outline-none after:border-none after:-translate-y-1/2 after:transition-all after:duration-200"
            >
              <div
                ref={seekBarController}
                className="bg-transparent w-[28px] h-[28px] rounded-full absolute left-full -translate-x-3 top-1/2 -translate-y-1/2 z-[3]"
              ></div>
            </div>
          </div>
          <p>
            {time.duration.min}:{time.duration.second < 10 ? "0" : ""}
            {time.duration.second}
            {/* 3:00 */}
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="w-4" src={assets.plays_icon} title="Plays" alt="" />
        {/* <img className="w-4" src={assets.queue_icon} alt="" /> */}
        <img
          onClick={muteUnmuteVolume}
          className="w-4 cursor-pointer"
          src={
            isPlayerMuted.current
              ? assets.volume_mute_icon
              : assets.volume_unmute_icon
          }
          alt=""
        />
        <div
          onClick={handleVolumeControl}
          className="w-24 h-1 relative [background:var(--bg04)] [box-shadow:var(--box-shadow04)] rounded-full cursor-pointer"
        >
          <div
            ref={volumeBar}
            className="relative bg-white w-[50%] rounded-full h-1 pointer-events-none"
          ></div>
        </div>
        <img
          onClick={() => {
            navigate("/song/" + currentSong.id);
          }}
          className="w-6 cursor-pointer"
          src={assets.open_song_display}
          title="Full Screen"
          alt=""
        />
      </div>
    </div>
  );
}

export default Player;
