import React, { useContext,useState,useEffect } from 'react';
import { AuthContext} from '../../context/auth/auth';
import { navigate } from "gatsby";
import './blogs.css';
import { GlobalAuthProvider } from '../../context/auth/auth';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { MARKS} from '@contentful/rich-text-types'
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Footer} from '../Footer/footer';
import Header from '../Header/header';

function Blog(props) {

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
    <>
    <Header />
    <div className='main-container'>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}><ArrowBackIcon />&nbsp; Go Back</Button>
    <div className="main-blog">
      {
        state.isAuthenticated && !state.isLoading ? <>
          
          <h1>{blog.title}</h1>

          <p className='date'>{blog.publishedDate}</p>

          <img className='feature-image' src={blog.featuredImage} alt="alter girl" />
            <div className='post-content'>{documentToReactComponents(blog.body, options)}</div>
            <Footer />
        </> : (!state.isAuthenticated && !state.isLoading ? <div>Loading...</div> : <div>Error...</div>)
      }
      </div>
      </div>
      </>
  );
}