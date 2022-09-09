import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
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
      <h1>404</h1>
      <p> The page you are looking for doesn't exist</p>
      <Link to="/">
        <button style={{ padding: 10, marginTop: 20 }}>Back To Homepage</button>
      </Link>
    </div>
  );
};

export default Error404;
