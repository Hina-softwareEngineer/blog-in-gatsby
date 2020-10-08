import React from 'react';

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

export default function Blog(props) {
  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img alt={alt} src={url} />
      },
    },
  }
  console.log(props, " blogs");
  let blog = props.pageContext;
    return (
      <div>
       <h1>{blog.title}</h1>
            
            <p>{blog.slug}</p>

            <p>{blog.publishedDate}</p>

            <img src={blog.featuredImage} alt="alter girl" />


            <p>{documentToReactComponents(blog.body),options}</p>
        
      </div>
    );
  }
  