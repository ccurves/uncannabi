import { ArrowBackOutlined } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Top = () => {
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist.products);
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <TopWrapper>
        <TopButton onClick={() => navigate(-1)}>
          <ArrowBackOutlined />
        </TopButton>

        <TopTexts>
          <Link to="/cart" className="link">
            <TopText>Shopping Bag({cart.quantity})</TopText>
          </Link>
          <Link to="/dashboard" className="link">
            <TopText>Your Wishlist({wishlist.length})</TopText>
          </Link>
        </TopTexts>
        <Link to="/cart" className="link">
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Link>
      </TopWrapper>
    </>
  );
};

export default Top;
