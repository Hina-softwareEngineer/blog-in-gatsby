import React from "react";
import Header from '../components/header';
import Blogs from '../components/blogList';
import Blog from '../components/blogs';
import { GlobalAuthProvider} from "../context/auth/auth";
export default function Home() {
 
  return (
    <GlobalAuthProvider>
      <div>
     
        <Header />

        <Blogs />

      </div>
      </GlobalAuthProvider>
  );
}