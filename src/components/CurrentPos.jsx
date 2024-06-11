import React, { useEffect } from "react";
import { CurrentButton } from "../styles/main";

const CurrentPos = ({ setMap, currentPos, map }) => {
  useEffect(() => {
    var container = document.getElementById("map");

    var options = {
      center: new window.kakao.maps.LatLng(35.837967501223, 127.065321365341),
      level: 3,
    };

    setMap(new window.kakao.maps.Map(container, options));
  }, []);

  return (
    <CurrentButton>
      <button
        onClick={() => map.setCenter(currentPos)}
        disabled={currentPos.length === 0}
      >
        {currentPos.length === 0 ? "현재 위치 가져오는 중..." : "현재 위치"}
      </button>
    </CurrentButton>
  );
};

export default CurrentPos;
