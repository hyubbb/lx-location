import styled from "styled-components";

export const MapContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  gap: 20px;
  flex-wrap: wrap;
`;

export const MapDiv = styled.div`
  display: flex;
  flex: 3;
  height: 500px;
`;

export const NaviContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  flex: 1;
  @media (max-width: 700px) {
    flex: 1 1 100%; /* 너비를 100%로 설정하여 줄바꿈 */
    flex-direction: row;
  }
`;

export const Navi = styled.article`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid #000;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 1rem;
  text-align: center;
  flex: 1;
`;

export const Info = styled.div`
  font-size: 1rem;
  text-align: center;
  flex: 1;
  padding: 0.5rem;
`;

export const SearchAddressForm = styled.form`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  svg {
    position: absolute;
    left: 10px;
    font-size: 20px;
  }
  input {
    width: 300px;
    height: 20px;
    padding: 10px;
    padding-left: 35px;
    border-radius: 30px;
    border: 1px solid black;
  }
`;

export const SearchAddressDiv = styled.div`
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;
