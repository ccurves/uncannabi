import { Favorite } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { updateWishlist } from "../redux/apiCalls";
import { mobile } from "../responsive";

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

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  /* ${mobile({ flexDirection: "column" })} */
  ${mobile({ justifyContent: "space-evenly" })}
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

const ProductInfo = styled.p`
  text-align: center;
  align-self: center;
  padding: 20px;
  margin: 20px;
`;

const ProductId = styled.span`
  font-size: 25px;
  font-weight: 200;
`;

const ButtonContainer = styled.span`
  align-self: center;
  cursor: pointer;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const List = ({ wishlist, user, getWishlist }) => {
  const dispatch = useDispatch();
  const handleClick = async (productId) => {
    updateWishlist(dispatch, user, productId);
  };
  return (
    <Info>
      <Title>YOUR WISHLIST</Title>
      <Hr />
      {wishlist.length !== 0 ? (
        <>
          {wishlist.map((product, index) => (
            <>
              <Product key={index}>
                <Link to={`/product/${product.slug}`} className="link">
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>{product.title}</b>
                      </ProductName>
                      <ProductId>${product.price}</ProductId>
                    </Details>
                  </ProductDetail>
                </Link>

                <ButtonContainer>
                  <Favorite
                    style={{
                      fontSize: 28,
                      color: "#6cae75",
                    }}
                    onClick={() => handleClick(product._id)}
                  />{" "}
                </ButtonContainer>
              </Product>
              <Hr />
            </>
          ))}
        </>
      ) : (
        <>
          <ProductInfo>You Have No Items In Your Wishlist Yet!</ProductInfo>
        </>
      )}
    </Info>
  );
};

export default List;
