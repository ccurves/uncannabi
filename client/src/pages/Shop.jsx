import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import HomeNavbar from "../components/HomeNavbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Top from "../components/Top";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  margin-top: 120px;
  top: 20vh;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 0px 10px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px 30px 10px 10px !important;
  margin-right: 14px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option`
  width: 500px !important;
`;

const Shop = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <HomeNavbar />
      <Title>BROWSE STORE</Title>
      <Top />
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products: </FilterText>
          <Select name="size" onChange={handleFilters} defaultValue="Size">
            <Option disabled>Size</Option>
            <Option>500mg</Option>
            <Option>400mg</Option>
            <Option>50mg</Option>
            <Option>25mg</Option>
            <Option>XL</Option>
            <Option>L</Option>
            <Option>M</Option>
            <Option>S</Option>
          </Select>
          <Select name="color" onChange={handleFilters} defaultValue="Color">
            <Option disabled>Color</Option>
            <Option>black</Option>
            <Option>blue</Option>
            <Option>red</Option>
            <Option>purple</Option>
            <Option>pink</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>{" "}
        </Filter>
      </FilterContainer>
      <Products filters={filters} sort={sort} page="shop" />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Shop;
