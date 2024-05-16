import React, { useEffect, useRef, useState } from "react";

const { kakao } = window;
const Map = () => {
  // Kakao 지도를 사용할 수 있는 지 확인
  // var address = {
  //   lee: { address: "서울 송파구 백제고분로19길 4-3" },
  // };
  // var place = [
  //   { address1: "서울특별시 송파구 백제고분로19길 11" },
  //   { address2: "서울 송파구 삼전로 75 상윤빌딩 1층" },
  // ];

  // const handler = () => {
  //   console.log(address.lee);
  // };

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

  const [map, setMap] = useState();
  const [marker, setMarker] = useState();
  const [searchData, setSearchData] = useState([]);

  // const getLocationByAddress = async (address) => {
  //   const geocoder = new window.kakao.maps.services.Geocoder();

  //   return await new Promise((resolve) => {
  //     geocoder.addressSearch(address, function (result) {
  //       resolve(new window.kakao.maps.LatLng(result[0].y, result[0].x));
  //     });
  //   });
  // };

  const getLocationByAddress = (address) => {
    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new window.kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    return new Promise((resolve, reject) => {
      geocoder.addressSearch(address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          const marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          const infowindow = new kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
          });
          // infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
          resolve({
            result: result[0],
            coords: { latitude: coords.Ma, longitude: coords.La },
          });
        } else {
          console.log("주소검색에 실패 했습니다.");
        }
      });
    });
  };

  // const markerPosition = await getLocationByAddress(address);

  const getCurrentPosBtn = () => {
    navigator.geolocation.getCurrentPosition(
      getPosSuccess,
      () => alert("위치 정보를 가져오는데 실패했습니다."),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      }
    );
  };

  const getPosSuccess = (pos, init = true) => {
    const currentPos = new kakao.maps.LatLng(
      pos.coords.latitude, // 위도
      pos.coords.longitude // 경도
    );
    setMarkerFlg(currentPos);
    map.setCenter(currentPos);
  };

  const setMarkerFlg = (currentPos, init = false) => {
    const message = `<div style="padding:5px;">${init}</div>`; // 인포윈도우에 표시될 내용입니다
    // 지도를 이동 시킨다.

    const marker = new kakao.maps.Marker({
      map: map,
      position: currentPos,
    });

    const iwContent = message; // 인포윈도우에 표시할 내용
    const iwRemoveable = true;

    // 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    // 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);

    // 인포윈도우의 닫기 버튼을 클릭했을 때 마커를 제거합니다
    kakao.maps.event.addListener(infowindow, "close", () => {
      marker.setMap(null);
    });
  };

  const posHandler = (pos) => {
    // console.log(pos);
    getPosSuccess(pos, false);
  };

  const apiKey = "192325c54db4d55682a42361ee447d45";
  // 출발지와 목적지 좌표 설정

  const url1 = "https://apis-navi.kakaomobility.com/v1/directions";

  const headers = {
    Authorization: `KakaoAK ${apiKey}`,
  };

  const [navText, setNavText] = useState([]);

  // useEffect(() => {
  //   console.log("useeeffect");
  //   fetch(url, { headers })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCurrentPos(data);
  //       // 응답 데이터 처리
  //       const route = data.routes[0];
  //       const distance = route.summary.distance; // 미터 단위
  //       const duration = route.summary.duration; // 초 단위

  //       // 결과 출력
  //       console.log(
  //         `목적지까지 거리: ${(distance / 1000).toFixed(
  //           2
  //         )}km, 예상 소요 시간: ${(duration / 60).toFixed(2)}분`
  //       );
  //     })
  //     .catch((error) => {
  //       // 오류 처리
  //       console.error("길찾기 정보를 가져오는 데 실패했습니다:", error);
  //     });
  // }, []);
  const startLat = 37.5052276;
  const startLng = 127.0867809;

  const [start, setStart] = useState([startLat, startLng]);
  // setStart([startLat, startLng]);

  const box = [];

  const distanceHandler = ({ coords, title }) => {
    const startLat = start[0] || 37.5052276;
    const startLng = start[1] || 127.0867809;

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
        const result = `목적지까지 거리: ${(distance / 1000).toFixed(
          2
        )}km, 예상 소요 시간: ${(duration / 60).toFixed(2)}분`;

        setNavText((prev) => ({ ...prev, [title]: result }));
        // console.log(result);

        // box[title] = result;
        // return result;
        // console.log(box);
        // 결과 출력
        // console.log(
        //   `목적지까지 거리: ${(distance / 1000).toFixed(2)}km, 예상 소요 시간: ${(duration / 60).toFixed(2)}분`
        // );
        return result;
      })
      .catch((error) => {
        // 오류 처리
        console.error("길찾기 정보를 가져오는 데 실패했습니다:", error);
      });
  };

  // fetch(url, { headers }).then((response) => console.log(response));

  const submitHandler = async (e) => {
    e.preventDefault(); // 폼의 기본 제출 동작을 방지
    const inputVal = document.getElementById("myInput").value;
    const splitVal = inputVal.split(",");
    getLocationByAddress(inputVal)
      .then((result) => {
        console.log("검색 결과:", result);
        console.log(result);
        setSearchData((prev) => [...prev, result]);
      })
      .catch((error) => {
        console.error("에러:", error);
      });

    //"37.483376642258,127.12077554098597"
    // const pos = { coords: [splitVal[0], splitVal[1]], title: "내 위치" };

    // setStart([splitVal[0], splitVal[1]]);
    // positions.forEach((pos) => {
    //   distanceHandler(pos);
    // });
  };

  useEffect(() => {
    var container = document.getElementById("map");

    var options = {
      center: new window.kakao.maps.LatLng(35.837967501223, 127.065321365341),
      level: 3,
    };

    setMap(new window.kakao.maps.Map(container, options));

    // positions.forEach((pos) => {
    //   distanceHandler(pos);
    // });
  }, []);

  useEffect(() => {
    if (map) {
      console.log("position");
      getCurrentPosBtn();
    }
  }, [map]);

  return (
    <>
      <div id='map' style={{ width: "100%", height: "500px" }}></div>
      <button onClick={getCurrentPosBtn}>현재 위치</button>
      <form id='myForm' onSubmit={(e) => submitHandler(e)}>
        <input type='text' id='myInput' />
        {/* <input type='submit' style={{ display: "none" }} /> */}
      </form>
      {searchData?.map((data, idx) => {
        const addressData = data.result;
        return (
          <div
            key={idx}
            onClick={() => posHandler(data)}
            style={{ display: "flex", gap: "20px", justifyContent: "center" }}
          >
            <div>{addressData.address_name}</div>
            <div>{navText[data.address_name]}</div>
          </div>
        );
      })}

      {positions.map((pos, idx) => {
        return (
          <div
            key={idx}
            onClick={() => distanceHandler(pos)}
            style={{ display: "flex", gap: "20px", justifyContent: "center" }}
          >
            <div>{pos.title}</div>
            <div>{navText[pos.title]}</div>
          </div>
        );
      })}
    </>
  );
};

export default Map;
