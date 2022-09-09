import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Alert from "../components/Alert";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
    url("https://images.unsplash.com/photo-1589141986943-5578615fdef2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")
      no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  margin-bottom: 45px;
`;

const Logo = styled.h1`
  font-weight: bold;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  font-size: 17px;
  border: 0.5px solid #000;
  outline: none;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #000;
  color: white;
  cursor: pointer;
  margin: 10px 0px 15px 0px;

  &:disabled {
    color: #000;
    background-color: #6cae75;
    cursor: not-allowed;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: wrap;
  justify-content: space-between;
`;

const StyledLink = styled.span`
  min-width: 40%;
  font-size: 12px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { errorMsg, isFetching } = useSelector((state) => state.user);
  const [notify, setNotify] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password }, setNotify);
  };

  return (
    <>
      <Container>
        <Wrapper>
          {notify && <Alert msg={errorMsg} setNotify={setNotify} />}
          <Center>
            <Link to="/" className="link">
              <Logo>.uncanabi</Logo>
            </Link>
          </Center>
          <Title>SIGN IN</Title>
          <Form>
            <Input
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={handleClick} disabled={isFetching}>
              {isFetching ? "Submitting..." : "LOGIN"}
            </Button>
            <LinkWrapper>
              <StyledLink>
                <Link to="" className="link">
                  FORGOT PASSWORD?
                </Link>
              </StyledLink>
              <StyledLink>
                <Link to="/register" className="link">
                  CREATE A NEW ACCOUNT
                </Link>
              </StyledLink>
            </LinkWrapper>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
