import useMyStore from "../store";
import SegmentListComponent from "./SegmentList";

const modifyJSON = (json, parentKey, newKey) => {
  if (json.key === parentKey) {
    json.segments.push({
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
  } else {
    for (let i = 0; i < json.segments.length; i++) {
      if (json.segments[i].key === parentKey) {
        json.segments[i].segments.push({
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
const Parent = ({ parent, parentKey }) => {
  const segmentJson = useMyStore((state) => state.segmentJson);
  const setSegmentJson = useMyStore((state) => state.setSegmentJson);
  const key = useMyStore((state) => state.key);
  const setKey = useMyStore((state) => state.setKey);

  const onAddFilterGroup = () => {
    setKey(key + 1);
    const newSegmentJson = JSON.parse(JSON.stringify(parent));
    console.log(newSegmentJson.key, parentKey);
    if (newSegmentJson.key === parentKey) {
      newSegmentJson.segments.push({
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
    } else {
      for (let i = 0; i < newSegmentJson.segments.length; i++) {
        if (newSegmentJson.segments[i].key === parentKey) {
          newSegmentJson.segments[i].segments.push({
            operatorType: "AND",
            value: "",
            segments: [
              {
                key,
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
    setKey(key + 1);
    const newSegmentJson = JSON.parse(JSON.stringify(parent));
    newSegmentJson.segments.push({
      key,
      type: "text",
      value: "",
    });
    setSegmentJson(newSegmentJson);
  };

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        margin: "10px",
      }}
    >
      <select
        value={parent.operatorType}
        onChange={(e) => {
          const newSegmentJson = JSON.parse(JSON.stringify(parent));
          newSegmentJson.operatorType = e.target.value;
          setSegmentJson(newSegmentJson);
        }}
      >
        <option value="AND">AND</option>
        <option value="OR">OR</option>
      </select>
      <SegmentListComponent list={parent} />
      <div>
        <button onClick={onAddFilterGroup}>Add Filter Group</button>
        <button onClick={onAddFilterRule}>Add Filter Rule</button>
      </div>
    </div>
  );
};

export default Parent;
