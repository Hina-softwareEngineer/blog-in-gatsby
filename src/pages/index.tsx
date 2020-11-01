import React, { useState, createRef,Ref } from "react";

import Layout from '../components/Layout/Layout';
import Blogs from '../components/BlogList/blogList';

import { GlobalAuthProvider } from "../context/auth/auth";


import * as classCss from '../style/modules/main.module.css';
import {data } from '../../data';
// material styles
import { makeStyles } from '@material-ui/core/styles';
import ModalSignIn from '../components/modal/modal';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  imageContainer: {
    width: "100%",
    height: "600px",
    overflow: "hidden"
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));



export default function Home() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const classes = useStyles();
  
  let blogsHeadingRef = createRef<HTMLHeadingElement>();

  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };
   
  return (
    <GlobalAuthProvider>
      <ModalSignIn open={openLoginModal} handleClose={handleCloseLoginModal} />
      <Layout blogsHeadingRef={blogsHeadingRef} handleOpenLoginModal={handleOpenLoginModal} >
        <div className={`${classes.imageContainer} image-Container`}>
          <img loading='lazy' src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80" alt="Blog post" />
          <div className={
            classCss.intro
          }>
            <Typography variant="h6" color="textSecondary" className={
              classCss.aboutMe
            }>
              <h3 className={classCss.h3About}>Hi Guys! <div className={classCss.hand}>👋</div></h3>
              <h1 className={classCss.aboutName}>{data.name} here</h1>
          <h5 className={classCss.aboutName}>Future Software Engineer!  🥰🥰 | 
          Love to Code❤️❤️ <br /> Full Stack Developer✨✨ | MERN Developer ☘️☘️|
           Python Developer⭐️⭐️ | Javascript Developer 🔥 🔥</h5>
            </Typography>
            </div>
      </div>
        <Blogs blogsHeadingRef={blogsHeadingRef} handleOpenLoginModal={handleOpenLoginModal} />
      </Layout>
      </GlobalAuthProvider>
  );
}