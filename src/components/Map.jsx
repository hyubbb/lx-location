import React, { useEffect, useRef, useState } from "react";
import Navigations from "./Navigations";
import SearchAddressData from "./SearchAddress";
import CurrentPos from "./CurrentPos";
import { MapContainer, MapDiv } from "../styles/mapStyle";
import SearchInput from "./SearchInput";
import Polyline from "../libs/Polyline";

const { kakao } = window;
const Map = () => {
  const [map, setMap] = useState();
  const [currentPos, setCurrentPos] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [activePos, setActivePos] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  let INDEX = 0;
  const positions = [
    {
      title: "올림픽공원역",
      coords: ["37.515762096", "127.1323992064898"],
    },
    {
      title: "잠실역",
      coords: ["37.514010282819726", "127.1022803889544"],
    },
    {
      title: "고터역",
      coords: ["37.506125643303676", "127.00441651052637"],
    },
  ];

  const getCurrentPosBtn = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const currentPos = new kakao.maps.LatLng(
          pos.coords.latitude, // 위도
          pos.coords.longitude // 경도
        );
        setCurrentPos(currentPos);
        getPosSuccess(currentPos, true);
      },
      () => alert("위치 정보를 가져오는데 실패했습니다."),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      }
    );
  };
  const moveToPoint = (pos, idx = 0) => {
    setActiveIndex(idx);
    closeInfoWindow();
    // markers[idx]?.infowindow.open(map, markers[idx].marker);
    markers[idx]?.infowindow.setMap(map);
    // 현재 선택된 마크의 position
    setActivePos(pos);
    map.setCenter(pos);
  };

  const getPosSuccess = (pos, init = false) => {
    moveToPoint(pos);
  };

  const closeInfoWindow = () => {
    // 기존의 열린 infowindow가 있는지 확인하고 닫기
    markers.forEach((markerObj) => {
      // markerObj?.infowindow?.close();
      markerObj?.infowindow.setMap(null);
    });
  };

  const InfowindowText = (text) => `<div style='position:relative;
  display: flex;
  flex-direction: column;
  top: -65px;
  left: 0;
  gap: 5px;
  background-color: #fff;
  border: 1px solid black;
  border-radius: 20px;padding:10px 20px;'>
  <div style='position: absolute;
  right: -5px;
  top: -5px;
  background: red;
  color: white;
  font-size: 12px;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}'>X</div><span style="text-align:center">${text}</span></div>`;

  const setMarkerFlg = (currentPos, init, addrText) => {
    const text = init ? "현재 위치" : "";
    // 지도를 이동 시킨다.
    const marker = new kakao.maps.Marker({
      map: map,
      position: currentPos,
    });

    const iwContent = InfowindowText(addrText); // 인포윈도우에 표시할 내용
    // const iwRemoveable = true;

    // 인포윈도우를 생성합니다
    // const infowindow = new kakao.maps.InfoWindow({
    //   content: iwContent,
    //   removable: iwRemoveable,
    // });
    const infowindow = new kakao.maps.CustomOverlay({
      content: iwContent,
      map: map,
      position: marker.getPosition(),
    });

    // 마커를 추가합니다
    if (!init) {
      // setMarkers((prevMarkers) => [...prevMarkers, marker]);
      setMarkers((prevMarkers) => [
        ...prevMarkers,
        { marker, infowindow, INDEX },
      ]);
      INDEX++;
    }
  };

  // 출발지와 목적지 좌표 설정
  // const url1 = "https://apis-navi.kakaomobility.com/v1/directions";

  const handlerRemove = (num) => {
    const data = searchData.filter((_, idx) => idx !== num);
    // closeInfoWindow();
    setSearchData(data);
    // 해당 마커를 지도에서 제거합니다
    markers[num].marker.setMap(null);
    // markers[num].infowindow.close();
    markers[num].infowindow.setMap(null);
    // 마커 배열에서 해당 마커를 제거합니다
    setMarkers((prevMarkers) => prevMarkers.filter((_, idx) => idx !== num));
  };

  useEffect(() => {
    if (map) {
      getCurrentPosBtn();
    }
  }, [map]);

  Polyline({
    map,
    activePos,
    start: activePos,
    end: new kakao.maps.LatLng(positions[0].coords[0], positions[0].coords[1]),
  });

  // useEffect(() => {
  //   // if (markers.length >= 2) {
  //   console.log(markers[0]?.marker.getPosition());
  //   // const start = markers[markers.length - 2].marker.getPosition();
  //   // const end = markers[markers.length - 1].marker.getPosition();
  //   const currentPos = new kakao.maps.LatLng(
  //     positions[0].coords[0],
  //     positions[0].coords[1]
  //   );
  //   console.log(activePos, currentPos);
  //   drawPolyline(activePos, currentPos);

  //   // }
  // }, [markers]);

  return (
    <>
      <MapContainer>
        <MapDiv id='map'>
          <CurrentPos setMap={setMap} map={map} currentPos={currentPos} />

          <SearchInput
            markers={markers}
            setMarkerFlg={setMarkerFlg}
            moveToPoint={moveToPoint}
            setSearchData={setSearchData}
          />
        </MapDiv>

        <Navigations activePos={activePos} positions={positions} map={map} />
      </MapContainer>
      <SearchAddressData
        searchData={searchData}
        handlerRemove={handlerRemove}
        moveToPoint={moveToPoint}
        activeIndex={activeIndex}
      />
    </>
  );
};

export default Map;
