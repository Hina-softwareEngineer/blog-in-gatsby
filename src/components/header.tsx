import React, { useState,useContext,createRef} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { navigate} from 'gatsby';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ModalSignIn from '../components/modal';
import "./header.css";

import { AuthContext } from '../context/auth/auth';
import { auth } from "firebase";



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "'Karla', serif",
  },
  imageContainer: {
    width: "100%",
    height: "600px",
    overflow: "hidden"
  },
  options: {
    fontFamily: "'Karla', serif",
    color: '#fff',
    fontSize: "1.2em",
    margin: '0 20px'
  },
  loginBtn: {
    margin: '0 15px',
    padding: '0',
    color: '#fff',
    fontSize: '1.2em',
    textTransform:"Capitalize",
    fontFamily: "'Karla', serif",
  }

}));

export default function Header({ handleOpen,blogs,about}) {
  const classes = useStyles();

  const { state, signOut } = useContext(AuthContext);

  const Signout = () => {
    signOut();
  }

  const onClick = (e) => {
    if (e.target.textContent === 'Blog') {
      blogs.current.scrollIntoView({
        behavior: "smooth", block: "start"
      })
    }
  }

  return (
    <div>
      <AppBar className="header" position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            HINA KHADIM
          </Typography>

          <Button onClick={onClick}  className={classes.loginBtn} >Blogs</Button>
          <Button onClick={()=> navigate("/about")} className={classes.loginBtn} >About</Button>

          
          {/* <Typography className={classes.options}  variant="h6" color="textSecondary" component="p">
            Blog
        </Typography>
          <Typography className={classes.options} variant="h6" color="textSecondary" component="p">
            About
        </Typography> */}
          {
            state.isAuthenticated && !state.isLoading ? <Button className={classes.loginBtn} onClick={Signout}>Sign Out</Button> : <Button onClick={handleOpen} className={classes.loginBtn}>Login</Button>
          }
          
        </Toolbar>
      </AppBar>
      <div className={`${classes.imageContainer} image-Container`}>
        <img src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80" alt="Blog post" />
         <Typography ref={about} variant="h6" color="textSecondary" component="p" className="about-me">
                About
        </Typography>
      </div>
    </div>
  );
}
