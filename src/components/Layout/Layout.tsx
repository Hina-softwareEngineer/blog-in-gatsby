import React, { ReactNode } from "react";
import Header from "../Header/header";
import { Footer} from '../Footer/footer';

export default function Layout({ children , handleOpenLoginModal, blogsHeadingRef }) {
  return (
    <div>
      <Header blogsHeadingRef={blogsHeadingRef} handleOpenLoginModal={handleOpenLoginModal} title="Header of a Page" />
      {children}
      <Footer center={true} />
    </div>
  );
}
