import React from "react";
import Header from "../Header/header";
import { Footer} from '../Footer/footer';

export default function Layout({ children }) {
  return (
    <div>
      <Header  />
      {children}
      <Footer center={true} />
    </div>
  );
}
