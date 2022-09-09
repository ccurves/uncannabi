import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

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
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `${process.env.REACT_APP_API_URL}/product?category=${cat}`
            : `${process.env.REACT_APP_API_URL}/product`
        );
        setProducts(res.data);
      } catch (error) {}
    };
    getProducts();
  }, [cat]);

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
    </Container>
  );
};

export default Products;
