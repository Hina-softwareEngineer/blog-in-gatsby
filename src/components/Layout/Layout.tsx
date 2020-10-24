import React, { ReactNode } from "react";
import Header from "./header";
import { Footer} from './footer';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children , handleOpen, blogs }) {
  return (
    <div>
      <Header blogs={blogs} handleOpen={handleOpen} title="Header of a Page" />
      {children}
      <Footer center={true} />
    </div>
  );
}
