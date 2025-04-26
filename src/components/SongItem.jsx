import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

function SongItem({ song }) {
  const { playWithId } = useContext(PlayerContext);

  // Create a placeholder image for songs
  const placeholderImage = "https://placehold.co/180x180/1DB954/FFF?text=🎵";

  // Format duration (e.g., 4:44)
  const formatDuration = (duration) => {
    return duration || "0:00";
  };

  // Clean the title if needed (remove special characters)
  const cleanTitle = (title) => {
    // Replace any problematic characters
    return title ? title.replace(/â€"/g, "-") : "";
  };

  return (
    <div
      onClick={() => playWithId(song.id)}
      className="flex items-center w-full p-3 rounded cursor-pointer hover:bg-[#ffffff26] transition-colors"
    >
      <div className="h-12 w-12 flex-shrink-0 mr-4">
        <img className="h-full w-full rounded object-cover" src={placeholderImage} alt="" />
      </div>
      <div className="flex-grow overflow-hidden">
        <p className="font-bold text-white truncate">{cleanTitle(song.title)}</p>
        <p className="text-[var(--text-color01)] text-sm truncate">{song.artist}</p>
      </div>
      <div className="text-[var(--text-color01)] text-sm ml-4 flex-shrink-0">
        {formatDuration(song.duration)}
      </div>
    </div>
  );
}

export default SongItem;
