import React from "react";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby";

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
      
      <h1>Hi my name is hina.</h1>
       
      <div>
        {
          data.allContentfulBlogModel.nodes.map((blog, index) => <div>
            <h1>
              <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
              </h1>

            <p>{blog.publishedDate}</p>

            <img src={blog.featuredImage.fluid.src} alt="alter girl" />


            <p>{blog.body.json.content[0].content[0].value.substr(0,500)}</p>

          </div>)
        }
       
        </div>

    </div>
  );
}