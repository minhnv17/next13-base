"use client";

import React, { FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";

const Signin = ({ callbackUrl }) => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      callbackUrl,
    });
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={userInfo.email}
          onChange={({ target }) => {
            setUserInfo({ ...userInfo, email: target.value });
          }}
        />
        <input
          type="password"
          value={userInfo.password}
          onChange={({ target }) => {
            setUserInfo({ ...userInfo, password: target.value });
          }}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Signin;
