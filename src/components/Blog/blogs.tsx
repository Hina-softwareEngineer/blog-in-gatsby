import React, { useContext } from 'react';
import { GlobalAuthProvider, AuthContext } from '../../context/auth/auth';

import './blogs.css';

import { navigate } from "gatsby";
import { MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import Header from '../Header/header';
import { Footer } from '../Footer/footer';

import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


function Blog(props) {

  const options = {
    renderMark: {
      [MARKS.CODE]: code => <pre><code className='language-javascript'>{code}</code></pre>
    },
    renderNode: {
      "embedded-asset-block": node => {
        const alt = node.data.target.fields.title["en-US"]
        const url = node.data.target.fields.file["en-US"].url
        return <img loading='lazy' className="images-inside-container" alt={alt} src={url} />
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





const BlogData = ({ blog, options, ...props }) => {
  let { state } = useContext(AuthContext);

  return (
    <>
    <Header />
    <div className='main-container'>
        <Button style={{
          borderRadius: '50%',
          padding: "20px 0",
          margin: "10px"
        }} onClick={() => navigate("/")}>
          <ArrowBackIcon />
        </Button>
      <div className="main-blog">
        {
            state.isAuthenticated && !state.isLoading ?
              <>
                <h1>{blog.title}</h1>
                <p className='date'>{blog.publishedDate}</p>
                <img className='feature-image' loading='lazy' src={blog.featuredImage} alt="alter girl" />
                <div className='post-content'>{documentToReactComponents(blog.body, options)}</div>
                <Footer center={true} />
              </>
              :
              (!state.isAuthenticated && !state.isLoading ? <div>Loading...</div> : <div>Error...</div>)
        }
      </div>
    </div>
    </>
  );
}