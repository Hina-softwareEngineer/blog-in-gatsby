import React,{useState,createRef} from "react";
import Header from '../components/header';
import Blogs from '../components/blogList';
import Blog from '../components/blogs';
import ModalSignIn from '../components/modal';
import Layout from '../components/Layout';
import { GlobalAuthProvider} from "../context/auth/auth";
export default function Home() {
  const [open, setOpen] = useState(false);
  
  let blogs = createRef();
  let about = createRef();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 
  return (
    <GlobalAuthProvider>
      <ModalSignIn open={open} handleClose={handleClose} />
      <Layout about={about} blogs={blogs} handleOpen={handleOpen} >
        <Blogs blogs={blogs} handleOpen={handleOpen} />
      </Layout>
      </GlobalAuthProvider>
  );
}