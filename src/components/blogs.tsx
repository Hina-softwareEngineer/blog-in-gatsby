import React, { useContext,useState,useEffect } from 'react';
import { AuthContext} from '../context/auth/auth';
import { navigate } from "gatsby";
import './blogs.css';
import { GlobalAuthProvider } from '../context/auth/auth';
import { PrivateRoute } from './PrivateRoute';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { MARKS} from '@contentful/rich-text-types'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Prism from "prismjs";
import "../style/prism.css";

function Blog(props) {
  
  let states = useContext(AuthContext);

  const options = {
    renderMark: {
      [MARKS.CODE]: code => <pre><code className='language-javascript'>{code}</code></pre>
    },
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img className="images-inside-container" alt={alt} src={url} />
      },
    },
  }
  
  let blog = props.pageContext;
  return (
      <GlobalAuthProvider>
      <BlogData blog={blog} options={options} />
      </GlobalAuthProvider>
    );
  }
  
export default Blog;


export const BlogData = ({ blog, options, ...props }) => {
  let { state } = useContext(AuthContext);
  
   useEffect(() => {
    Prism.highlightAll();
  }, [])
 

  return (
    <div className="main-blog">
      {
        state.isAuthenticated && !state.isLoading ? <>
          
          <Button color="primary" onClick={() => navigate("/")}><ArrowBackIcon /></Button>
          <h1>{blog.title}</h1>

          <p className='date'>{blog.publishedDate}</p>

          <img src={blog.featuredImage} alt="alter girl" />
          <pre>
  <code className="language-javascript">
  {`
    onSubmit(e) {
      e.preventDefault();
      const job = {
        title: 'Developer',
        company: 'Facebook' 
        };
      }
  `}
  </code>
</pre>

          <div className='post-content'>{documentToReactComponents(blog.body, options)}</div>
        </> : (!state.isAuthenticated && !state.isLoading ? <div>Loading...</div> : <div>Error...</div>)
      }
      </div>
  );
}