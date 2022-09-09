import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/apiCalls";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const TitleContainer = styled.div`
  height: 35vh;
  padding: 35px;
`;

const Products = ({ cat, filters, sort, page }) => {
  const { products, isFetching } = useSelector((state) => state.product);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getProducts(dispatch, cat);
  }, [dispatch, cat]);

  useEffect(() => {
    if (cat || page === "shop") {
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    }
  }, [cat, filters, products, page]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {isFetching ? (
        <TitleContainer>
          <Title>Fetching products...</Title>
        </TitleContainer>
      ) : (
        <>
          {products.length === 0 && filteredProducts.length === 0 ? (
            <TitleContainer>
              <Title>No products found</Title>
            </TitleContainer>
          ) : (
            <>
              {" "}
              {cat || page === "shop" ? (
                <>
                  {filteredProducts.length === 0 ? (
                    <TitleContainer>
                      <Title>No products found</Title>
                    </TitleContainer>
                  ) : (
                    filteredProducts.map((item) => (
                      <Product item={item} key={item._id} />
                    ))
                  )}
                </>
              ) : (
                <>
                  {page === "home"
                    ? products
                        .slice(0, 8)
                        .map((item) => <Product item={item} key={item._id} />)
                    : products.map((item) => (
                        <Product item={item} key={item._id} />
                      ))}
                </>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Products;
