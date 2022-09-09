import React, { useEffect } from "react";
import styled from "styled-components";
import {
  PermIdentityOutlined,
  Search,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/userRedux";
import Alert from "./Alert";
import Announcement from "./Announcement";
import { userRequest } from "../requestMethods";
import { changeState, updateList } from "../redux/wishlistRedux";

const Container = styled.div`
  height: 90px;
  width: 100%;
  top: 0;
  bottom: 10;
  background-color: #fff;
  z-index: 2000;
  box-shadow: 0 -1px 12px 6px rgb(0 0 0 / 15%);
  position: fixed;
  display: flex;
  flex-direction: column;
  ${mobile({ height: "85px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "4px" })}
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px", marginLeft: "15px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const HomeNavbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const error = useSelector((state) => state.wishlist.error);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  };

  const setNotify = (val) => {
    dispatch(changeState(val));
  };

  useEffect(() => {
    const getWishlist = async () => {
      try {
        const res = await userRequest.get(`/wishlist/${user._id}`);
        dispatch(updateList(res.data.wishlist));
      } catch (error) {}
    };

    user !== null && getWishlist();
  }, [user, dispatch]);

  return (
    <>
      <Container>
        {!error && <Announcement />}
        {error && !user && (
          <Alert
            msg="You need to login to wishlist a product"
            setNotify={setNotify}
          />
        )}

        <Wrapper>
          <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input placeholder="Search" />
              <Search style={{ color: "gray", fontSize: "16px" }} />
            </SearchContainer>
          </Left>
          <Center>
            <Link to="/" className="link">
              <Logo>.uncanabi</Logo>
            </Link>
          </Center>
          <Right>
            {!user && (
              <>
                <Link to="/register" className="link">
                  <MenuItem>REGISTER</MenuItem>
                </Link>
                <Link to="/login" className="link">
                  <MenuItem>SIGN IN</MenuItem>
                </Link>
                <Link to="/shop" className="link">
                  <MenuItem>STORE</MenuItem>
                </Link>
              </>
            )}
            {user && (
              <>
                <Link to="/shop" className="link">
                  <MenuItem>STORE</MenuItem>
                </Link>
                <Link to="" className="link">
                  <MenuItem onClick={handleClick}>LOGOUT</MenuItem>
                  {/* <LogoutIcon /> */}
                </Link>
                <Link to="/dashboard" className="link">
                  <MenuItem>
                    <PermIdentityOutlined />
                  </MenuItem>
                </Link>
              </>
            )}

            <Link to="/cart" className="link">
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        </Wrapper>
      </Container>
    </>
  );
};

export default HomeNavbar;
