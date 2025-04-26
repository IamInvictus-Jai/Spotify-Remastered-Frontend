import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const detectDevice = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return isMobile;
};

const PlayerProvider = ({ children }) => {
  const isTouchDevice = detectDevice();

  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();
  const seekBarController = useRef();
  const playNextBtn = useRef();
  const playPauseBtnRef = useRef();
  const isFirstRender = useRef(true);
  const isPlayerControlerDragging = useRef(false);
  const volumeBar = useRef();
  const isPlayerMuted = useRef(false);

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [isLoopActive, setIsLoopActive] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      min: 0,
    },
    duration: {
      second: parseInt(track.duration.split(":")[1]) || 0,
      min: parseInt(track.duration.split(":")[0]) || 0,
    },
  });
  const [volume, setVolume] = useState(1);

  const handlePlay = () => {
    if (isFirstRender.current) isFirstRender.current = false;
    audioRef.current.play();
    setPlayStatus(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const handlePlayPauseWrapper = ()=> {
    if (playStatus) handlePause();
    else handlePlay();
  }

  const playWithId = (id) => {
    setTrack(songsData[id]);
  };

  const playPreviousSong = () => {
    if (track.id > 0) {
      setTrack(songsData[track.id - 1]);
    }
  };

  const playNextSong = () => {
    if (track.id < songsData.length - 1) {
      setTrack(songsData[track.id + 1]);
    } else {
        handlePause();
        playPauseBtnRef.current.click();
    }
  };

  const loopSong = () => {
    if (audioRef.current && !audioRef.current.loop) {
      audioRef.current.loop = true;
      setIsLoopActive(true);
    } else {
      audioRef.current.loop = false;
      setIsLoopActive(false);
    }
  };

  const seekSong = async (e) => {
    if (e.target === seekBarController.current) return;
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  // Handles Dragging of the player controller bar
  const seekBarControlEvent = (e) => {
    let seekPercentage = null;

    const handleMouseDrag = (e) => {
      const bounds = seekBg.current.getBoundingClientRect(); // Get the bounding rectangle of the seek bar
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;

      // Calculate the relative X position within the seek bar
      const relativeX = Math.min(
        Math.max(0, clientX - bounds.left),
        bounds.width
      );
      // Calculate the seek percentage based on the relative X position
      seekPercentage = relativeX / bounds.width;
      seekBar.current.style.width = `${seekPercentage * 100}%`;
      isPlayerControlerDragging.current = true;

      setTime({
        currentTime: {
          second: Math.floor((seekPercentage * audioRef.current.duration) % 60),
          min: Math.floor((seekPercentage * audioRef.current.duration) / 60),
        },
        duration: {
          second: Math.floor(audioRef.current.duration % 60) || 0,
          min: Math.floor(audioRef.current.duration / 60) || 0,
        },
      });
    };

    const handleRelease = async () => {
      if (isTouchDevice) {
        document.removeEventListener("touchmove", handleMouseDrag);
        document.removeEventListener("touchend", handleRelease);
      } else {
        document.removeEventListener("mousemove", handleMouseDrag);
        document.removeEventListener("mouseup", handleRelease);
      }

      if (seekPercentage) {
        audioRef.current.currentTime =
          seekPercentage * audioRef.current.duration;
      }
      isPlayerControlerDragging.current = false;
    };

    const handleHoldDown = (e) => {
      e.preventDefault();

      if (isTouchDevice) {
        document.addEventListener("touchmove", handleMouseDrag);
        document.addEventListener("touchend", handleRelease);
      } else {
        document.addEventListener("mousemove", handleMouseDrag);
        document.addEventListener("mouseup", handleRelease);
      }

      //   console.log("Mouse down");
    };

    // set up initial event listeners
    if (isTouchDevice) {
      seekBarController.current.addEventListener("touchstart", handleHoldDown);
    } else {
      seekBarController.current.addEventListener("mousedown", handleHoldDown);
    }

    // clean up event listeners
    return () => {
      if (seekBarController.current) {
        seekBarController.current.removeEventListener(
          "mousedown",
          handleHoldDown
        );
        if (isTouchDevice)
          seekBarController.current.removeEventListener(
            "touchstart",
            handleHoldDown
          );
      }

      if (isTouchDevice) {
        document.removeEventListener("touchmove", handleMouseDrag);
        document.removeEventListener("touchend", handleRelease);
      } else {
        document.removeEventListener("mousemove", handleMouseDrag);
        document.removeEventListener("mouseup", handleRelease);
      }
    };
  };

  const handleVolumeControl = (e)=> {
    setVolume(e.nativeEvent.offsetX / e.target.offsetWidth);
  }

  const muteUnmuteVolume = ()=> {
    if (audioRef.current.muted) {
      audioRef.current.muted = false;
      isPlayerMuted.current = false;
    } else {
      isPlayerMuted.current = true;
      audioRef.current.muted = true;
    }
  }

  const handleLike = ()=> {
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
    }
  }

  // Add to useEffect for cleanup
  useEffect(() => {
    const cleanup = seekBarControlEvent();
    return cleanup;
  }, []);

  useEffect(() => {
    if (track && !isFirstRender.current) {
      audioRef.current.load();
      audioRef.current.onloadeddata = async () => {
        await audioRef.current.play();
        setPlayStatus(true);
      };
    }
  }, [track]);

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        if (isPlayerControlerDragging.current) return;
        seekBar.current.style.width = `${Math.floor(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        )}%`;
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            min: Math.floor(audioRef.current.currentTime / 60),
          },
          duration: {
            second: Math.floor(audioRef.current.duration % 60) || 0,
            min: Math.floor(audioRef.current.duration / 60) || 0,
          },
        });

        if (audioRef.current.ended) {
          playNextBtn.current.click();
        }
      };
    }, 1000);
  }, [audioRef]);

  useEffect(()=> {
    if (volume >= 0 && volume <= 1) {
      audioRef.current.volume = volume
      volumeBar.current.style.width = `${Math.ceil(volume * 100)}%`
    }
  }, [volume])

  const value = {
    audioRef,
    seekBg,
    seekBar,
    seekBarController,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    handlePlay,
    handlePause,
    handlePlayPauseWrapper,
    playWithId,
    playPreviousSong,
    playNextSong,
    seekSong,
    playPauseBtnRef,
    playNextBtn,
    loopSong,
    isLoopActive,
    volumeBar, handleVolumeControl,
    muteUnmuteVolume, isPlayerMuted,
    isLiked, handleLike
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

export default PlayerProvider;
