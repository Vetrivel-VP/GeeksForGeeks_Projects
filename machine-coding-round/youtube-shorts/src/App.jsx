import React from "react";
import VideoPlayer from "./components/VideoPlayer";
import "./App.css";
import { shortsData } from "./utils/data";

const App = () => {
  return (
    <div className="App">
      <div className="app__video">
        {/* render the shorts videos */}
        {shortsData.map((vid) => (
          <VideoPlayer key={vid.id} src={vid.videoUrl} id={vid.id} />
        ))}
      </div>
    </div>
  );
};

export default App;
