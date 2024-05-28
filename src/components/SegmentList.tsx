// @ts-nocheck 
import useMyStore from "../store";
import Parent from "./Parent";
import Segment from "./Segment";

const SegmentListComponent = ({ list }) => {
  const segmentJson = useMyStore((state) => state.segmentJson);
  const setSegmentJson = useMyStore((state) => state.setSegmentJson);

  return list.segments.map((segment, index) => {
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

    if (segment.segments) {
      return (
        <div>
          <Parent parent={segment} parentKey={segment.key} onDeleteGroup={onDelete} />
        </div>
      );
    }
    // if (segment.operatorType) {
    //   return (
    //     <div>
    //       <SegmentListComponent parent={segment} />
    //     </div>
    //   );
    // }
    return (
      <div
        style={{
          marginLeft: 20,
        }}
      >
        <Segment
          key={index}
          index={index}
          segment={segment}
          operatorType={list.operatorType}
        />
      </div>
    );
  });
};

export default SegmentListComponent;
