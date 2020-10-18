import React, { useState,useContext} from "react";
import { makeStyles } from '@material-ui/core/styles';
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
  },
  imageContainer: {
    width: "100%",
    height: "600px",
    overflow: "hidden"
  },

}));

export default function Header({ handleOpen}) {
  const classes = useStyles();
  const { state, signOut } = useContext(AuthContext);

  const Signout = () => {
    signOut();
  }

  return (
    <div>
      <AppBar className="header" position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            HINA KHADIM
          </Typography>

          
        <Typography variant="h6" color="textSecondary" component="p">
            Blog
        </Typography>
          <Typography variant="h6" color="textSecondary" component="p">
            About
        </Typography>
          {
            state.isAuthenticated && !state.isLoading ? <Button color="secondary" onClick={Signout}>Sign Out</Button> : <Button color="secondary" onClick={handleOpen}>Login</Button>
          }
          
        </Toolbar>
      </AppBar>
      <div className={`${classes.imageContainer} image-Container`}>
        <img src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80" alt="Blog post" />
         <Typography variant="h6" color="textSecondary" component="p" className="about-me">
                About
        </Typography>
      </div>
    </div>
  );
}
