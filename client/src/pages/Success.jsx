import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { emptyCart } from "../redux/cartRedux";
import { CheckCircleOutline } from "@material-ui/icons";

const Success = () => {
  const location = useLocation();
  const data = location.state.data;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const userCart = useSelector((state) => state.cart);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/order", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.purchase_units[0].shipping.address,
        });

        setOrderId(res.data._id);
        dispatch(emptyCart());
      } catch (error) {
        console.log(error);
      }
    };
    userCart.quantity !== 0 && createOrder();
  }, [cart, data, currentUser, dispatch, userCart]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <CheckCircleOutline
        style={{ marginBottom: 20, color: "#000", fontSize: 80 }}
      />
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successful. Your order is being processed...`}
      <Link to="/dashboard">
        <button style={{ padding: 10, marginTop: 20 }}>Go to Dashboard</button>
      </Link>
    </div>
  );
};

export default Success;
