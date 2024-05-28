import { useState } from "react";
import "./App.css";
import data from "./segmentConfig";
import useMyStore from "./store";
import Parent from "./components/Parent";

function App() {
  const segmentJson = useMyStore((state) => state.segmentJson);
  const setSegmentJson = useMyStore((state) => state.setSegmentJson);

  return (
    <>
      <Parent parent={segmentJson} parentKey={segmentJson.key} />
      {JSON.stringify(segmentJson)}
    </>
  );
}

export default App;
