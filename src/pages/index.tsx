import React from "react";
import { Link, navigate } from "gatsby";
import { Router} from '@reach/router';
import Header from "../components/header";
import ClientPage1 from '../components/client1';
import { graphql } from 'gatsby';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function Home({ data}) {
  // console.log(data, data.allContentfulBlogTitle.edges[0].node.title);
  // let title = data.allContentfulBlogTitle.edges[0].node.title;
  return (
    <div>
      <Header title="Index Page" />
      Hello World
      <Link to="/about">About</Link>
      <button
        onClick={() => {
          navigate("/about");
        }}
      >
        About page with Button
      </button>
      <Router basepath='/app'>
        <ClientPage1 path="/path1" />
      </Router>
      <Link to='/my-dynamic-page/'>Dynamically created at build time</Link>

      {/* <div>{title}</div> */}
      {/* <div>{documentToReactComponents()}</div> */}
    </div>
  );
}

// export const query = graphql`
//   query{
    
//     }
//   }
// `;
