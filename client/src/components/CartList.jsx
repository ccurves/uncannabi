import React from "react";
import styled from "styled-components";
import { Add, Delete, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { addQty, descQty, removeProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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
  width: 100px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

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

const ButtonContainer = styled.span`
  display: flex;
  text-decoration: underline;
  align-items: center;
  cursor: pointer;
`;

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
            <Link to={`/product/${product.slug}`} className="link">
              <ProductDetail>
                <Image src={product.img} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {product.title}
                  </ProductName>
                  <ProductId></ProductId>
                  <ButtonContainer onClick={() => handleDelete(product)}>
                    <Delete style={{ fontSize: 20 }} /> <b>Remove Item</b>
                  </ButtonContainer>
                </Details>
              </ProductDetail>
            </Link>

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
          </Product>
          <Hr />
        </div>
      ))}
    </Info>
  );
};

export default CartList;
