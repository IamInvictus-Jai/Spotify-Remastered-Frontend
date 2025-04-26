import React, { useContext } from 'react'
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display from './components/Display';
import { PlayerContext } from "./context/PlayerContext";

function App() {
  const { audioRef, track } = useContext(PlayerContext);
  return (
    <div className="h-screen bg-[var(--primary-bg-color)]">
      <div className="h-[85%] flex">
        <Sidebar />
        <Display />
      </div>
      <Player />
      <audio
        data-track-id={track.id}
        ref={audioRef}
        src={track.file}
        preload="auto"
      ></audio>
    </div>
  );
}

export default App