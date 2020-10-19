import React from "react";
import { Router } from "@reach/router";
import Blog from "../components/blogs";
import Layout from "../components/Layout";
import { GlobalAuthProvider } from "../context/auth/auth";
import { PrivateRoute } from "../components/PrivateRoute";
import { useStaticQuery, graphql } from "gatsby";


export default function Home(props) {

const data = useStaticQuery(
        graphql`
          query {
            allContentfulBlogModel {
              nodes {
                slug    
              }
            }
          }
        `
      );
  return (
    <GlobalAuthProvider>
      <Layout>
              <Router>
                  {
                      data.allContentfulBlogModel.nodes.map(n =><PrivateRoute path={`/blog/${n.slug}`} component={Blog} />)
                  }
                  <PrivateRoute component={Blog} />

        </Router>
      </Layout>
    </GlobalAuthProvider>
  );
}
