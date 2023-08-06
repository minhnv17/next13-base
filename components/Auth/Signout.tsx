"use client";
import { signOut } from "next-auth/react";
import { MouseEventHandler } from "react";

const Signout = () => {
  const handleSignOut: MouseEventHandler<HTMLButtonElement> = async (e) => {
    await signOut();
  };

  return <button onClick={handleSignOut}>Signout</button>;
};

export default Signout;
