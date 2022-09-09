import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from "../redux/userRedux";
import { VisibilityOffOutlined, VisibilityOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import { handleError } from "../utils/errorHandler";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
    url("https://images.unsplash.com/photo-1617101815102-e5728e6685fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=814&q=80")
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
  width: 40%;
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

const Subtitle = styled.span``;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const InputContainer = styled.div`
  flex: 1;
  border: 1px solid #000;
  margin: 20px 10px 0px 0px;
`;

const Toggle = styled.span`
  cursor: pointer;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border: 1px solid #000;
  outline: none;
`;

const PasswordInput = styled.input`
  border: none;
  outline: none;
  min-width: 80%;
  /* width: 60%; */
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #6cae75;
  color: white;
  cursor: pointer;
  &:disabled {
    color: #fff;
    background-color: #000;
    cursor: not-allowed;
  }
`;

const Register = () => {
  const [visible, setVisibilty] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const { email, firstname, lastname, username, password1, password2 } =
    formData;
  const [notify, setNotify] = useState(false);

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleToggle = (e) => {
    if (visible) {
      setVisibilty(false);
    } else {
      setVisibilty(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstname && lastname && username && email && password1) {
      dispatch(registerStart());
      if (password1 === password2) {
        publicRequest
          .post("/auth/register", {
            fullName: firstname + " " + lastname,
            email,
            username,
            password: password1,
          })
          .then((res) => {
            setFormData({
              ...formData,
              firstname: "",
              lasttname: "",
              email: "",
              username: "",
              password1: "",
              password2: "",
            });
            dispatch(registerSuccess(res.data));
          })
          .catch((error) => {
            dispatch(registerFailure(handleError(error.response.data)));
            setNotify(handleError(error.response.data));
          });
      } else {
        setNotify("Passwords don't match");
      }
    } else {
      setNotify("Fill out all fields");
    }
  };

  return (
    <Container>
      <Wrapper>
        {notify && <Alert msg={notify} setNotify={setNotify} />}
        <Center>
          <Link to="/" className="link">
            <Logo>.uncanabi</Logo>
          </Link>
        </Center>

        <Title>CREATE AN ACCOUNT</Title>
        <Subtitle>
          Already own an account?
          <Link to="/login" className="link">
            SIGN IN
          </Link>{" "}
        </Subtitle>

        <Form onSubmit={handleSubmit}>
          <Input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange("firstname")}
            value={firstname}
          />
          <Input
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange("lastname")}
            value={lastname}
          />
          <Input
            placeholder="Username"
            name="username"
            onChange={handleChange("username")}
            value={username}
          />
          <Input
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange("email")}
            value={email}
          />
          {/* <ToggleText>Show password</ToggleText> */}

          <InputContainer>
            <PasswordInput
              placeholder="Password"
              name="password"
              type={visible ? "text" : "password"}
              onChange={handleChange("password1")}
              value={password1}
            />
            <Toggle onClick={handleToggle}>
              {visible ? (
                <VisibilityOutlined
                  style={{ fontSize: 20, marginTop: "10px" }}
                />
              ) : (
                <VisibilityOffOutlined
                  style={{ fontSize: 20, marginTop: "10px" }}
                />
              )}
            </Toggle>
          </InputContainer>
          <InputContainer>
            <PasswordInput
              placeholder="Confirm Password"
              name="cpassword"
              type={visible ? "text" : "password"}
              onChange={handleChange("password2")}
              value={password2}
            />
            <Toggle onClick={handleToggle}>
              {visible ? (
                <VisibilityOutlined
                  style={{ fontSize: 20, marginTop: "10px" }}
                />
              ) : (
                <VisibilityOffOutlined
                  style={{ fontSize: 20, marginTop: "10px" }}
                />
              )}
            </Toggle>
          </InputContainer>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>

          <Button type="submit">SIGN UP</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
