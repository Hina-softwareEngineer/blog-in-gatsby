import React, { ReactNode } from "react";
import Header from "../Header/header";
import { Footer} from '../Footer/footer';

export default function Layout({ children , handleOpen, blogs }) {
  return (
    <div>
      <Header blogs={blogs} handleOpen={handleOpen} title="Header of a Page" />
      {children}
      <Footer center={true} />
    </div>
  );
}
