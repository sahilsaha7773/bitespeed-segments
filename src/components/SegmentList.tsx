// @ts-nocheck 
import useMyStore from "../store";
import Parent from "./Parent";
import Segment from "./Segment";

const SegmentListComponent = ({ list }) => {
  const segmentJson = useMyStore((state) => state.segmentJson);
  const setSegmentJson = useMyStore((state) => state.setSegmentJson);

  return list.segments.map((segment, index) => {
    if (segment.segments) {
      return (
        <div>
          <Parent parent={segment} parentKey={segment.key} />
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
