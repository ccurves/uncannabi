import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Top from "../components/Top";
import List from "../components/List";

import { mobile } from "../responsive";
import OrderList from "../components/OrderList";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethods";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  margin-bottom: 40px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: max-content;
`;

const SummaryTitle = styled.h2`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "22px"};
`;

const SummaryItemText = styled.span``;

// const WarningText = styled.span`
//   color: #6cae75;
//   text-decoration: underline;
//   cursor: pointer;
//   text-align: center;
// `;

const SummaryItemPrice = styled.span``;

const Dashboard = () => {
  const user = useSelector((state) => state.user.currentUser);
  const wishlist = useSelector((state) => state.wishlist.products);
  const section = localStorage.getItem("currentSection");
  const [orders, setOrders] = useState([]);
  const [stateSection, setStateSection] = useState(section);

  const setSection = (value) => {
    localStorage.setItem("currentSection", value);
    setStateSection(value);
  };

  useEffect(
    (section) => {
      if (!stateSection) {
        localStorage.setItem("currentSection", "Orders");
        window.location.reload();
      }
    },
    [stateSection]
  );

  const getOrder = useCallback(async () => {
    try {
      const res = await userRequest.get(`/order/find/${user._id}`);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>DASHBOARD</Title>
        <Top />
        <Bottom>
          <Summary>
            <SummaryTitle>WELCOME, {user.username.toUpperCase()}</SummaryTitle>
            <SummaryItem>
              <Link
                to=""
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  setSection("Orders");
                }}
              >
                <SummaryItemText>Orders</SummaryItemText>
              </Link>
              <SummaryItemPrice>({orders.length})</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <Link
                to=""
                className="link"
                onClick={(e) => {
                  e.preventDefault();
                  setSection("Wishlist");
                }}
              >
                <SummaryItemText>Wishlist</SummaryItemText>
              </Link>
              <SummaryItemPrice>({wishlist.length})</SummaryItemPrice>
            </SummaryItem>
          </Summary>
          {stateSection === "Orders" && (
            <OrderList orders={orders} getOrder={getOrder} />
          )}
          {stateSection === "Wishlist" && (
            <List wishlist={wishlist} user={user} />
          )}
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Dashboard;
