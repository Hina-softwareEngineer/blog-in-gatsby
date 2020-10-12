import React from 'react';
import { navigate } from "gatsby";
import './blogs.css';

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export default function Blog(props) {
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img className="images-inside-container" alt={alt} src={url} />
      },
    },
  }
  console.log(props, " blogs");
  let blog = props.pageContext;
    return (
      <div className="main-blog">

        <button onClick={()=>  navigate("/")}>Go back</button>
       <h1>{blog.title}</h1>

            <p>{blog.publishedDate}</p>

            <img src={blog.featuredImage} alt="alter girl" />


            <p>{documentToReactComponents(blog.body,options)}</p>
        
      </div>
    );
  }
  