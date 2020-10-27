import React,{useState,createRef} from "react";
import Header from '../components/Header/header';
import Blogs from '../components/BlogList/blogList';
import Blog from '../components/Blog/blogs';
import Layout from '../components/Layout/Layout';
import { GlobalAuthProvider } from "../context/auth/auth";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ModalSignIn from '../components/modal/modal';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

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
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const classes = useStyles();
  
  let blogs = createRef();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


   
  return (
    <GlobalAuthProvider>
      <ModalSignIn open={open} handleClose={handleClose} />
      <Layout blogs={blogs} handleOpen={handleOpen} >
        <div className={`${classes.imageContainer} image-Container`}>
          <img src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80" alt="Blog post" />
          <div className="intro">
        <Typography   variant="h6" color="textSecondary" className="about-me">
          <h3 className="h3-about">Hi Guys! <div className='hand'>👋</div></h3>
          <h1 className="about-name">HINA KHADIM here</h1>
          <h5 className='info-about'>Future Software Engineer!  🥰🥰 | 
          Love to Code❤️❤️ <br /> Full Stack Developer✨✨ | MERN Developer ☘️☘️|
           Python Developer⭐️⭐️ | Javascript Developer 🔥 🔥</h5>
            </Typography>
            </div>
      </div>
        <Blogs blogs={blogs} handleOpen={handleOpen} />
      </Layout>
      </GlobalAuthProvider>
  );
}