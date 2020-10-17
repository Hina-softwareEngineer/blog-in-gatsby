import React, { useContext } from 'react';
import { AuthContext} from '../context/auth/auth';
import { navigate } from "gatsby";
import './blogs.css';
import { GlobalAuthProvider } from '../context/auth/auth';
import { PrivateRoute} from './PrivateRoute';

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

function Blog(props) {
  
  let states = useContext(AuthContext);
  console.log("state : ", states);

  const options = {
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img className="images-inside-container" alt={alt} src={url} />
      },
    },
  }
  
  let blog = props.pageContext;
  console.log("props : ",props,states)
  return (
      <GlobalAuthProvider>
      <BlogData blog={blog} options={options} />
      </GlobalAuthProvider>
    );
  }
  
export default Blog;


export const BlogData = ({ blog, options, ...props }) => {
   let states = useContext(AuthContext);
  console.log("state : ", states);

  if (states) { 
    
    console.log('states', states.getSignedInUser());
    if (states.getSignedInUser() === null) {
      
    }
    else { 
      
    }

  }
  return (
    <div className="main-blog">
      {
        states ? (states.getSignedInUser() ? <>
        <button onClick={() => navigate("/")}>Go back</button>
      <h1>{blog.title}</h1>

      <p>{blog.publishedDate}</p>

      <img src={blog.featuredImage} alt="alter girl" />


      <p>{documentToReactComponents(blog.body, options)}</p>
          </> : <div> Error</div>) : <div>Loading...</div>
      }
    </div>
  );
}