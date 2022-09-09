import React from "react";
import styled from "styled-components";
import { Add, Delete, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { addQty, descQty, removeProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Info = styled.div`
  flex: 3;
  padding: 10px;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const ButtonContainer = styled.span``;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const CartList = ({ cart }) => {
  const dispatch = useDispatch();

  const handleAdd = (product) => {
    dispatch(addQty(product));
  };

  const handleSub = (product) => {
    product.qty > 1 && dispatch(descQty(product));
  };

  const handleDelete = (product) => {
    dispatch(removeProduct(product));
  };

  return (
    <Info>
      {cart.products.map((product, index) => (
        <div key={index}>
          <Product>
            <ProductDetail>
              <Image src={product.img} />
              <Details>
                <ProductName>
                  <b>Product:</b> {product.title}
                </ProductName>
                <ProductId>
                  <b>ID:</b> {product._id}
                </ProductId>
                <ProductColor color={product.color} />
                <ProductSize>
                  <b>Size:</b> {product.size}
                </ProductSize>
              </Details>
            </ProductDetail>
            <PriceDetail>
              <ProductAmountContainer>
                <Add
                  style={{ fontSize: 20, cursor: "pointer" }}
                  onClick={() => handleAdd(product)}
                />
                <ProductAmount>{product.qty}</ProductAmount>
                <Remove
                  style={{ fontSize: 20, cursor: "pointer" }}
                  onClick={() => handleSub(product)}
                />
              </ProductAmountContainer>
              <ProductPrice>$ {product.price * product.qty}</ProductPrice>
            </PriceDetail>
            <ButtonContainer>
              <Delete
                style={{ fontSize: 20, cursor: "pointer" }}
                onClick={() => handleDelete(product)}
              />
            </ButtonContainer>
          </Product>
          <Hr />
        </div>
      ))}
    </Info>
  );
};

export default CartList;
