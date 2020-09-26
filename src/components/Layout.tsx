import React, { ReactNode } from "react";
import Header from "./header";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header title="Header of a Page" />
      {children}
    </div>
  );
}
