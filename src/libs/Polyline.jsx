import React, { useEffect, useState } from "react";

const { kakao } = window;
const Polyline = ({ map, activePos, start, end }) => {
  console.log(start, end);
  const [polylines, setPolylines] = useState([]);

  if (!start || !end) return null;

  const headers = {
    Authorization: `KakaoAK ${process.env.REACT_APP_MAP_API_KEY}`,
  };
  const drawRoute = async (start, end) => {
    const url = `https://apis-navi.kakaomobility.com/v1/directions?origin=${start.getLng()},${start.getLat()}&destination=${end.getLng()},${end.getLat()}&waypoints=&priority=RECOMMEND`;

    fetch(url, { headers })
      .then((response) => response.json())
      .then((data) => {
        // 응답 데이터 처리
        const route = data.routes[0];
        console.log(route);
        if (route.length > 0) {
          const path = route.sections[0].roads.map(
            (road) => new kakao.maps.LatLng(road.y, road.x)
          );
          console.log(path);
          const polyline = new kakao.maps.Polyline({
            path: path,
            strokeWeight: 5,
            strokeColor: "#FF0000",
            strokeOpacity: 0.7,
            strokeStyle: "solid",
          });

          polyline.setMap(map);
          setPolylines((prevPolylines) => [...prevPolylines, polyline]);
        }
      })
      .catch((error) => {
        // 오류 처리
        console.error("길찾기 정보를 가져오는 데 실패했습니다:", error);
      });
  };

  useEffect(() => {
    drawRoute(start, end);
  }, [activePos]);

  return <div>Polyline</div>;
};

export default Polyline;
