import { Cancel } from "@material-ui/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { userRequest } from "../requestMethods";
import { mobile } from "../responsive";
import { formatDate } from "../utils/date";
import Alert from "./Alert";

const Info = styled.div`
  flex: 3;
  padding: 10px;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 30;
  text-align: center;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  ${mobile({ flexDirection: "column" })}
`;

const OrderDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 100px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const OrderStatus = styled.span`
  color: #555;
`;

const OrderName = styled.span``;

const OrderId = styled.span``;

const OrderInfo = styled.p`
  text-align: center;
  align-self: center;
  padding: 20px;
  margin: 20px;
`;

const Button = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  border: 2px solid #000;
  padding: 10px;
  cursor: pointer;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const OrderList = ({ orders, getOrder }) => {
  const [notify, setNotify] = useState(null);
  const user = useSelector((state) => state.user.currentUser);
  const handleCancel = async (id) => {
    try {
      const res = await userRequest.put(`/order/${user._id}`, {
        status: "Cancelled",
      });
      // console.log(res.data);
      setNotify(res.data);
      getOrder();
      setNotify(null);
    } catch (err) {
      console.log(err);
      setNotify(err.response.data);
    }
  };

  return (
    <Info>
      <Title>ORDER HISTORY</Title>
      {notify !== null && <Alert msg={notify} type="success" />}
      {orders.length !== 0 ? (
        <>
          {orders.map((order, index) => (
            <div key={index}>
              <Wrapper>
                <OrderDetail>
                  <Image src={order.products[0]._id.img} />
                  <Details>
                    <OrderStatus>
                      <b>Order Status: {order.status}</b>
                    </OrderStatus>
                    <OrderName>
                      <b>Order #:</b> {order._id}
                    </OrderName>
                    <OrderId>
                      <b>Ordered on:</b> {formatDate(order.createdAt)}
                    </OrderId>
                    <OrderId>
                      <b>Ordered Items:</b> {order.products.length}
                    </OrderId>
                    <OrderId>
                      <b>Total Amount:</b> $ {order.amount}.00
                    </OrderId>
                  </Details>
                </OrderDetail>

                {order.status === "pending" && (
                  <Button onClick={() => handleCancel(order._id)}>
                    <Cancel style={{ fontSize: 20, marginRight: "10px" }} />
                    Cancel Order
                  </Button>
                )}
              </Wrapper>
              <Hr />
            </div>
          ))}
        </>
      ) : (
        <OrderInfo>You Haven't Made Any Orders Yet!</OrderInfo>
      )}
    </Info>
  );
};

export default OrderList;
