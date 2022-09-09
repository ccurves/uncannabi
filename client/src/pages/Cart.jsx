import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import CartList from "../components/CartList";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const TitleContainer = styled.div`
  height: 35vh;
  padding: 35px;
`;

const Top = styled.div`
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

const SummaryTitle = styled.h1`
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

const WarningText = styled.span`
  color: #6cae75;
  text-decoration: underline;
  cursor: pointer;
  text-align: center;
`;

const SummaryItemPrice = styled.span``;

const SummaryButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #000;
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #6cae75;
  }
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist.products);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/shop">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <Link to="/cart" className="link">
              <TopText>Shopping Bag({cart.quantity})</TopText>
            </Link>
            <Link to="/dashboard" className="link">
              <TopText>Your Wishlist({wishlist.length})</TopText>
            </Link>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          {cart.products.length !== 0 ? (
            <>
              <CartList cart={cart} />
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>$ 0.00</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>$ 0.00</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>$ {cart.total}.00</SummaryItemPrice>
                </SummaryItem>

                <>
                  {!currentUser ? (
                    <Link to="/login">
                      <WarningText>Login to complete checkout</WarningText>
                    </Link>
                  ) : (
                    <>
                      {visible ? (
                        <SummaryButton
                          onClick={() => {
                            setVisible(false);
                          }}
                        >
                          CHECKOUT NOW
                        </SummaryButton>
                      ) : (
                        <PayPalButtons
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: cart.total.toString(),
                                  },
                                },
                              ],
                            });
                          }}
                          onApprove={async (data, actions) => {
                            return actions.order.capture().then((details) => {
                              console.log(details);
                              navigate("/success", {
                                state: {
                                  data: details,
                                  products: cart,
                                },
                              });
                            });
                          }}
                        />
                      )}
                    </>
                  )}
                </>
              </Summary>
            </>
          ) : (
            <>
              <TitleContainer>
                <SummaryTitle>Your cart is empty. Start shopping.</SummaryTitle>
              </TitleContainer>
            </>
          )}
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
