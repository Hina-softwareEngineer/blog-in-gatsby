import React from "react";
import { Router } from "@reach/router";
import Header from "../components/header";
import Blogs from "../components/blogList";
import Blog from "../components/blogs";
import Layout from "../components/Layout";
import Client1 from "../components/client1";
import { GlobalAuthProvider } from "../context/auth/auth";
// import { GlobalAuthProvider } from "../context/auth/auth";
import { PrivateRoute } from "../components/PrivateRoute";
export default function Home() {
  return (
    <GlobalAuthProvider>
      <Layout>
        <Router>
          {/* <Client1 path="/app/client" /> */}
          <PrivateRoute path="/app/client" component={Client1} />
        </Router>
      </Layout>
    </GlobalAuthProvider>
  );
}
