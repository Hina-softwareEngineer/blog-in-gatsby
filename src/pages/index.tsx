import React from "react";
import { Link, navigate } from "gatsby";
import { Router} from '@reach/router';
import Header from "../components/header";
import { blogs } from '../../blogs';
import Blog from '../components/blogs';
import { useStaticQuery, graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"


export default function Home() {
  const data = useStaticQuery(
    graphql`
      query {
        allContentfulBlogModel {
          nodes {
            title
            slug
            publishedDate(formatString: "YYYY MMM, DD")
              featuredImage {
                fluid {
                    src
                }
              }
              body {
                json
                }
          }
        }
      }
    `
  );

  console.log("data ; ", data);
  
  return (
    <div>
      
      <h1>Hi my name is hina</h1>
       
      <div>
        {
          data.allContentfulBlogModel.nodes.map((blog, index) => <div>
            <h1>{blog.title}</h1>
            <Link to={`/blog/${blog.slug}`}>Go to page</Link>
            <p>{blog.slug}</p>

            <p>{blog.publishedDate}</p>

            <img src={blog.featuredImage.fluid.src} alt="alter girl" />


            <p>{blog.body.json.content[0].content[0].value.substr(0,500)}</p>

          </div>)
        }
       
        </div>

    </div>
  );
}