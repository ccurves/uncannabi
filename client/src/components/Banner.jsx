import React from "react";
import styled from "styled-components";

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Banner = ({ source }) => {
  return (
    <>
      <Image src={source} />
    </>
  );
};

export default Banner;
