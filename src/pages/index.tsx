import React from "react";
import Header from '../components/header';
import Blogs from '../components/blogList';
import Blog from '../components/blogs';

import Layout from '../components/Layout';
import { GlobalAuthProvider} from "../context/auth/auth";
export default function Home() {

 
  return (
    <GlobalAuthProvider>
      <Layout>
        <Blogs />
      </Layout>
      </GlobalAuthProvider>
  );
}