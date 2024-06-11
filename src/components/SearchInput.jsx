import React from "react";
import { SearchAddressDiv, SearchAddressForm } from "../styles/mapStyle";
import { IoIosSearch } from "react-icons/io";
const { kakao } = window;
const SearchInput = ({
  markers,
  setMarkerFlg,
  moveToPoint,
  setSearchData,
  getPosSuccess,
}) => {
  const getLocationByAddress = (address) => {
    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    return new Promise((resolve, reject) => {
      geocoder.addressSearch(address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          resolve({
            result: result[0],
            coords,
          });
        } else {
          console.log("주소검색에 실패 했습니다.");
        }
      });
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault(); // 폼의 기본 제출 동작을 방지
    const inputVal = document.getElementById("myInput").value;
    getLocationByAddress(inputVal)
      .then((result) => {
        // 마커를 생성합니다
        setMarkerFlg(result.coords, false, result.result.address_name);
        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        moveToPoint(result.coords, markers.length);
        setSearchData((prev) => [...prev, result]);
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  };

  return (
    <SearchAddressDiv>
      <SearchAddressForm id='myForm' onSubmit={(e) => submitHandler(e)}>
        <IoIosSearch size='20' />
        <input type='text' id='myInput' placeholder='insert address' />
      </SearchAddressForm>
    </SearchAddressDiv>
  );
};

export default SearchInput;
