import React, { useEffect, useState } from "react";
import { Info, Navi, NaviContainer, Title } from "../styles/mapStyle";

const { kakao } = window;
const Navigations = ({ activePos, positions, map }) => {
  const [naviText, setNaviText] = useState([]);

  const headers = {
    Authorization: `KakaoAK ${process.env.REACT_APP_MAP_API_KEY}`,
  };
  const distanceHandler = ({ coords, title }) => {
    const startLat = activePos.Ma;
    const startLng = activePos.La;

    const endLat = coords[0];
    const endLng = coords[1];
    const url = `https://apis-navi.kakaomobility.com/v1/directions?origin=${startLng},${startLat}&destination=${endLng},${endLat}&waypoints=&priority=RECOMMEND`;

    fetch(url, { headers })
      .then((response) => response.json())
      .then((data) => {
        // 응답 데이터 처리
        const route = data.routes[0];
        const distance = route.summary.distance; // 미터 단위
        const duration = route.summary.duration; // 초 단위

        // console.log(route.sections[0].guides);
        const textDistance = `목적지까지 거리: ${(distance / 1000).toFixed(
          2
        )}km`;
        const textDuration = `예상 소요 시간: ${(duration / 60).toFixed(2)}분`;
        const result = `${textDistance} <br> ${textDuration}`;

        setNaviText((prev) => ({ ...prev, [title]: result }));

        return result;
      })
      .catch((error) => {
        // 오류 처리
        console.error("길찾기 정보를 가져오는 데 실패했습니다:", error);
      });
  };
  useEffect(() => {
    if (activePos.length !== 0) {
      positions.forEach((pos) => {
        distanceHandler(pos);
      });
    }
  }, [activePos]);
  return (
    <NaviContainer>
      {positions.map((pos, idx) => {
        const posData = new window.kakao.maps.LatLng(
          pos.coords[0], // 위도
          pos.coords[1] // 경도
        );
        return (
          <Navi key={idx} onClick={() => map.setCenter(posData)}>
            <Title>{pos.title}</Title>
            {naviText[pos.title] ? (
              <Info dangerouslySetInnerHTML={{ __html: naviText[pos.title] }} />
            ) : (
              <Info>계산 중</Info>
            )}
          </Navi>
        );
      })}
    </NaviContainer>
  );
};

export default Navigations;
