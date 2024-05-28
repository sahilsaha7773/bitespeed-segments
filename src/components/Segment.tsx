// @ts-nocheck
import { useState } from "react";
import useMyStore from "../store";

const Segment = ({ index, segment, operatorType }) => {
  const [type, setType] = useState(segment.type);
  const [segmentValue, setSegmentValue] = useState(segment.value);
  const segmentJson = useMyStore((state) => state.segmentJson);
  const setSegmentJson = useMyStore((state) => state.setSegmentJson);
  const onValueUpdate = (newValue) => {
    const newSegmentJson = JSON.parse(JSON.stringify(segmentJson));
    if (newSegmentJson.key == segment.key) {
      newSegmentJson.segments.splice(index, 1);
      setSegmentJson(newSegmentJson);
    } else if (newSegmentJson.segments) {
      for (let i = 0; i < newSegmentJson.segments.length; i++) {
        if (newSegmentJson.segments[i].key == segment.key) {
          newSegmentJson.segments[i].value = newValue;
          setSegmentJson(newSegmentJson);
        } else if (newSegmentJson.segments[i].segments) {
          for (let j = 0; j < newSegmentJson.segments[i].segments.length; j++) {
            if (newSegmentJson.segments[i].segments[j].key == segment.key) {
              newSegmentJson.segments[i].segments[j].value = newValue;
              setSegmentJson(newSegmentJson);
            } else if (newSegmentJson.segments[i].segments[j].segments) {
              for (
                let k = 0;
                k < newSegmentJson.segments[i].segments[j].segments.length;
                k++
              ) {
                if (
                  newSegmentJson.segments[i].segments[j].segments[k].key ==
                  segment.key
                ) {
                  newSegmentJson.segments[i].segments[j].segments[k].value =
                    newValue;
                  setSegmentJson(newSegmentJson);
                }
              }
            }
          }
        }
      }
    }
  };
  const onTypeUpdate = (newType) => {
    const newSegmentJson = JSON.parse(JSON.stringify(segmentJson));
    if (newSegmentJson.key == segment.key) {
      newSegmentJson.segments.splice(index, 1);
      setSegmentJson(newSegmentJson);
    } else if (newSegmentJson.segments) {
      for (let i = 0; i < newSegmentJson.segments.length; i++) {
        if (newSegmentJson.segments[i].key == segment.key) {
          newSegmentJson.segments[i].type = newType;
          setSegmentJson(newSegmentJson);
        } else if (newSegmentJson.segments[i].segments) {
          for (let j = 0; j < newSegmentJson.segments[i].segments.length; j++) {
            if (newSegmentJson.segments[i].segments[j].key == segment.key) {
              newSegmentJson.segments[i].segments[j].type = newType;
              setSegmentJson(newSegmentJson);
            } else if (newSegmentJson.segments[i].segments[j].segments) {
              for (
                let k = 0;
                k < newSegmentJson.segments[i].segments[j].segments.length;
                k++
              ) {
                if (
                  newSegmentJson.segments[i].segments[j].segments[k].key ==
                  segment.key
                ) {
                  newSegmentJson.segments[i].segments[j].segments[k].type =
                    newType;
                  setSegmentJson(newSegmentJson);
                }
              }
            }
          }
        }
      }
    }
  };
  const onDelete = () => {
    const newSegmentJson = JSON.parse(JSON.stringify(segmentJson));
    if (newSegmentJson.key == segment.key) {
      newSegmentJson.segments.splice(index, 1);
      setSegmentJson(newSegmentJson);
    } else if (newSegmentJson.segments) {
      for (let i = 0; i < newSegmentJson.segments.length; i++) {
        if (newSegmentJson.segments[i].key == segment.key) {
          newSegmentJson.segments.splice(index, 1);
          setSegmentJson(newSegmentJson);
        } else if (newSegmentJson.segments[i].segments) {
          for (let j = 0; j < newSegmentJson.segments[i].segments.length; j++) {
            if (newSegmentJson.segments[i].segments[j].key == segment.key) {
              newSegmentJson.segments[i].segments.splice(index, 1);
              setSegmentJson(newSegmentJson);
            } else if (newSegmentJson.segments[i].segments[j].segments) {
              for (
                let k = 0;
                k < newSegmentJson.segments[i].segments[j].segments.length;
                k++
              ) {
                if (
                  newSegmentJson.segments[i].segments[j].segments[k].key ==
                  segment.key
                ) {
                  newSegmentJson.segments[i].segments[j].segments.splice(
                    index,
                    1
                  );
                  setSegmentJson(newSegmentJson);
                }
              }
            }
          }
        }
      }
    }
  };

  return (
    <div>
      <div>{index === 0 && "WHERE"}</div>
      <select
        name="segmentType"
        value={type}
        onChange={(e) => {
          setType(e.target.value);
          onTypeUpdate(e.target.value);
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
            onValueUpdate(e.target.value);
          }}
        />
      )}
      {type === "dropdown" && (
        <select
          value={segmentValue}
          onChange={(e) => {
            setSegmentValue(e.target.value);
            onValueUpdate(e.target.value);
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
