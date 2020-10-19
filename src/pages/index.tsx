import React,{useState} from "react";
import Header from '../components/header';
import Blogs from '../components/blogList';
import Blog from '../components/blogs';
import ModalSignIn from '../components/modal';
import Layout from '../components/Layout';
import { GlobalAuthProvider} from "../context/auth/auth";
export default function Home() {
    const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 
  return (
    <GlobalAuthProvider>
      <ModalSignIn open={open} handleClose={handleClose} />
      <Layout handleOpen={handleOpen} >
        <Blogs handleOpen={handleOpen} />
      </Layout>
      </GlobalAuthProvider>
  );
}