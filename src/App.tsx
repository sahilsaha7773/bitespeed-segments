// @ts-nocheck
import { useState } from "react";
import "./App.css";
import useMyStore from "./store";
import Parent from "./components/Parent";

function App() {
  const segmentJson = useMyStore((state) => state.segmentJson);
  const setSegmentJson = useMyStore((state) => state.setSegmentJson);
  const [customSegmentJson, setCustomSegmentJson] = useState();

  return (
    <>
      <Parent parent={segmentJson} parentKey={segmentJson.key} showDeleteGroupBtn={false} />
      <div>
        <div>{JSON.stringify(segmentJson)}</div>
        <textarea
          type="text"
          onChange={(e) => setCustomSegmentJson(e.target.value)}
        />
        <button onClick={() => setSegmentJson(JSON.parse(customSegmentJson))}>
          Set Segment
        </button>
      </div>
    </>
  );
}

export default App;
