import { useState } from "react";
import useMyStore from "../store";

const Segment = ({ index, segment, operatorType }) => {
  const [type, setType] = useState(segment.type);
  const [segmentValue, setSegmentValue] = useState(segment.value);
  const setSegmentJson = useMyStore((state) => state.setSegmentJson);

  const onDelete = () => {
    const newSegmentJson = JSON.parse(JSON.stringify(data));
    newSegmentJson.segments.splice(index, 1);
    setSegmentJson(newSegmentJson);
  };

  return (
    <div>
      <div>{index === 0 && "WHERE"}</div>
      <select
        name="segmentType"
        value={type}
        onChange={(e) => {
          setType(e.target.value);
        }}
      >
        <option value="text">Text</option>
        <option value="dropdown">Dropdown</option>
      </select>
      {type === "text" && (
        <input
          type="text"
          value={segmentValue}
          onChange={(e) => {
            setSegmentValue(e.target.value);
          }}
        />
      )}
      {type === "dropdown" && (
        <select
          value={segmentValue}
          onChange={(e) => {
            setSegmentValue(e.target.value);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      )}
      <button onClick={onDelete}>Delete</button>
      <div>{operatorType}</div>
    </div>
  );
};

export default Segment;