import React, { useContext } from 'react';
import { AuthContext} from '../context/auth/auth';
import { navigate } from "gatsby";
import './blogs.css';
import { PrivateRoute} from '../context/ProtectedRoute/route';

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
  console.log("props : ",props)
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
  
export default PrivateRoute(Blog);