import React from "react";
import Map from "../components/Map";
import { Container } from "../styles/main";

const HomePage = () => {
  return (
    <Container>
      <h1>거리 계산</h1>

      <Map />
    </Container>
  );
};

export default HomePage;
