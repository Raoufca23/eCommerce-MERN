import React from "react";
import Header from "../Header";
import MenuHeader from "../MenuHeader";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <MenuHeader />
      {children}
    </>
  );
}
