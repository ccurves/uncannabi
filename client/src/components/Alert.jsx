import { Cancel } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";

const AlertContainer = styled.div`
  height: 30px;
  width: 100%;
  background-color: ${(props) =>
    props.type === "success" ? "#6cae75" : "#eb5f5f"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  position: sticky;
  top: 0;
  z-index: 9999;
`;

const Text = styled.p`
  margin-right: 20px;
`;

const Icon = styled.span`
  cursor: pointer;
  margin-top: 3px;
`;

const Alert = ({ msg, type, setNotify }) => {
  return (
    <AlertContainer type={type}>
      <Text>{msg}</Text>
      <Icon onClick={() => setNotify(false)}>
        <Cancel style={{ fontSize: 17 }} />
      </Icon>
    </AlertContainer>
  );
};

export default Alert;
