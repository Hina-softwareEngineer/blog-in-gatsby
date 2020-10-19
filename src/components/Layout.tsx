import React, { ReactNode } from "react";
import Header from "./header";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children , handleOpen }) {
  return (
    <div>
      <Header handleOpen={handleOpen} title="Header of a Page" />
      {children}
    </div>
  );
}
