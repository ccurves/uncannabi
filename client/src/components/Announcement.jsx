import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #6cae75;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement = () => {
  return (
    <Container>SAVE UP TO 30% ON EVERY ORDER | CHECK ELIGIBILITY</Container>
  );
};

export default Announcement;
