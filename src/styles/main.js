import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const Section = styled.section`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

export const Search = styled.article`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  border: 1px solid #000;
  border-radius: 5px;
  justify-content: space-between;

  &.search-card {
    cursor: pointer;
    &.active {
      background-color: #00961580;
      font-weight: bold;
    }
  }
  .click-box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .addr-name {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      cursor: pointer;
    }
    .user-name {
      display: flex;
      gap: 10px;
      span {
        text-wrap: nowrap;
      }
    }
  }

  .delete {
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
`;

export const CurrentButton = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 10;
  button {
    border: 1px solid black;
    border-radius: 30px;
    margin: 5px;
    padding: 10px;
    cursor: pointer;
    &:hover {
      color: white;
      background-color: #000;
      font-weight: 700;
    }
  }
`;
