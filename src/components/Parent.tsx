// @ts-nocheck
import useMyStore from "../store";
import SegmentListComponent from "./SegmentList";

const modifyJSON = (json, parentKey, newKey, setSegmentJson) => {
  if (json.key === parentKey) {
    console.log("Adding new segment", parentKey);

    json.segments.push({
      key: newKey - 1,
      operatorType: "AND",
      value: "",
      segments: [
        {
          key: newKey,
          type: "text",
          value: "",
        },
      ],
    });
    setSegmentJson(json);
  } else {
    for (let i = 0; i < json.segments.length; i++) {
      if (json.segments[i].key === parentKey) {
        console.log("Adding new segment HEREE", parentKey);
        if (!json.segments[i].segments) {
          json.segments[i].segments = [];
        }
        json.segments[i].segments.push({
          key: newKey - 1,
          operatorType: "AND",
          value: "",
          segments: [
            {
              key: newKey,
              type: "text",
              value: "",
            },
          ],
        });
      } else if (json.segments[i].segments) {
        modifyJSON(json.segments[i], parentKey, newKey);
      }
    }
  }
};

const Parent = ({
  parent,
  parentKey,
  onDeleteGroup,
  showDeleteGroupBtn = true,
}) => {
  const segmentJson = useMyStore((state) => state.segmentJson);
  const setSegmentJson = useMyStore((state) => state.setSegmentJson);
  const key = useMyStore((state) => state.key);
  const setKey = useMyStore((state) => state.setKey);

  const onAddFilterGroup = () => {
    setKey(key + 2);
    console.log("parentKey", parentKey);
    let newSegmentJson = JSON.parse(JSON.stringify(segmentJson));
    console.log(newSegmentJson.key, parentKey);
    if (newSegmentJson.key === parentKey) {
      newSegmentJson = {
        ...newSegmentJson,
        segments: [
          ...newSegmentJson.segments,
          {
            key: key - 1,
            operatorType: "AND",
            value: "",
            segments: [
              {
                key: key,
                type: "text",
                value: "",
              },
            ],
          },
        ],
      };
      setSegmentJson(newSegmentJson);
    } else {
      for (let i = 0; i < newSegmentJson.segments.length; i++) {
        if (newSegmentJson.segments[i].key === parentKey) {
          console.log("Adding new segment HEREE", parentKey);
          if (!newSegmentJson.segments[i].segments) {
            newSegmentJson.segments[i].segments = [];
          }
          newSegmentJson.segments[i].segments.push({
            key: key - 1,
            operatorType: "AND",
            value: "",
            segments: [
              {
                key: key,
                type: "text",
                value: "",
              },
            ],
          });

          setSegmentJson(newSegmentJson);
        } else if (newSegmentJson.segments[i].segments) {
          modifyJSON(newSegmentJson.segments[i], parentKey, key);
        }
      }
    }
  };
  const onAddFilterRule = () => {
    setKey(key + 2);
    console.log("parentKey", parentKey);
    let newSegmentJson = JSON.parse(JSON.stringify(segmentJson));
    console.log(newSegmentJson.key, parentKey);
    if (newSegmentJson.key === parentKey) {
      newSegmentJson = {
        ...newSegmentJson,
        segments: [
          ...newSegmentJson.segments,
          {
            key,
            type: "text",
            value: "",
          },
        ],
      };
      setSegmentJson(newSegmentJson);
    } else {
      for (let i = 0; i < newSegmentJson.segments.length; i++) {
        if (newSegmentJson.segments[i].key === parentKey) {
          console.log("Adding new segment HEREE", parentKey);
          if (!newSegmentJson.segments[i].segments) {
            newSegmentJson.segments[i].segments = [];
          }
          newSegmentJson.segments[i].segments.push({
            key,
            type: "text",
            value: "",
          });

          setSegmentJson(newSegmentJson);
        } else if (newSegmentJson.segments[i].segments) {
          for (let j = 0; j < newSegmentJson.segments[i].segments.length; j++) {
            if (newSegmentJson.segments[i].segments[j].key === parentKey) {
              console.log("Adding new segment HEREEEEEE", parentKey);
              if (!newSegmentJson.segments[i].segments[j].segments) {
                newSegmentJson.segments[i].segments[j].segments = [];
              }
              newSegmentJson.segments[i].segments[j].segments.push({
                key,
                type: "text",
                value: "",
              });
              setSegmentJson(newSegmentJson);
            }
          }
        }
      }
    }
  };
  const handleOperatorChange = (e) => {
    let newSegmentJson = JSON.parse(JSON.stringify(segmentJson));
    console.log(newSegmentJson.key, parentKey);
    if (newSegmentJson.key === parentKey) {
      newSegmentJson = {
        ...newSegmentJson,
        operatorType: e.target.value,
      };
      setSegmentJson(newSegmentJson);
    } else {
      for (let i = 0; i < newSegmentJson.segments.length; i++) {
        if (newSegmentJson.segments[i].key === parentKey) {
          console.log("Adding new segment HEREE", parentKey);
          if (!newSegmentJson.segments[i].segments) {
            newSegmentJson.segments[i].segments = [];
          }
          newSegmentJson.segments[i] = {
            ...newSegmentJson.segments[i],
            operatorType: e.target.value,
          };

          setSegmentJson(newSegmentJson);
        } else if (newSegmentJson.segments[i].segments?.length > 0) {
          for (let j = 0; j < newSegmentJson.segments[i].segments.length; j++) {
            if (newSegmentJson.segments[i].segments[j].key === parentKey) {
              console.log("CHANING", parentKey);
              newSegmentJson.segments[i].segments[j] = {
                ...newSegmentJson.segments[i].segments[j],
                operatorType: e.target.value,
              };
              setSegmentJson(newSegmentJson);
            }
          }
        }
      }
    }
  };
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        margin: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "40px"
        }}
      >
        <select value={parent.operatorType} onChange={handleOperatorChange}>
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
        {showDeleteGroupBtn && (
          <button onClick={onDeleteGroup}>Delete Filter Group</button>
        )}
      </div>
      <SegmentListComponent list={parent} />

      <div>
        <button onClick={onAddFilterGroup}>Add Filter Group</button>
        <button onClick={onAddFilterRule}>Add Filter Rule</button>
      </div>
    </div>
  );
};

export default Parent;
