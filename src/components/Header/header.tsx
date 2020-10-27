import React, { useState,useContext,createRef} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { navigate} from 'gatsby';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ModalSignIn from '../modal/modal';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import "./header.css";
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import { useTheme } from '@material-ui/core/styles';

import { AuthContext } from '../../context/auth/auth';
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
    // textTransform:"Capitalize",
    fontFamily: "'Karla', serif",
  },
  image: {
    width: 'inherit',
    height:"inherit"
    
  },
  name: {
    margin: "0 10px"
  },
  menu: {
    cursor: "pointer",
    display: "flex",
    alignItems: 'center',
    textShadow:"0 2px 4px #000"
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },

}));

export default function Header({ handleOpen,blogs}) {
  const classes = useStyles();

  const theme = useTheme();
  console.log(theme,'the,e')
  const { state, signOut } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const Signout = () => {
    signOut();
    if (window.location.pathname != '/') { 
      navigate("/");
    }
  }

  const onClick = (e) => {
    if (e.target.textContent === 'Blogs') {
      if (window.location.pathname === '/') {
        blogs.current.scrollIntoView({
          behavior: "smooth", block: "start"
        })
      }
      else {
        navigate("/");
      }
    }
  }

  return (
    <div>
      <AppBar className="header" position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            HINA KHADIM
          </Typography>
{/* 
          {
            screen
          } */}

          <Button onClick={onClick}  className={classes.loginBtn} >Blogs</Button>
          <Button onClick={() => {
            navigate("/about")
          }} className={classes.loginBtn} >About</Button>
          {
            state.isAuthenticated && !state.isLoading ? <>
              <div className={classes.menu} onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
                <Avatar src={state.user?.photoURL || "/broken-image.jpg"} className={classes.large} />
                <h3 className={classes.name}>{state.user?.displayName}</h3>
              </div>
           <Menu
  id="simple-menu"
  anchorEl={anchorEl}
style={{top:'6%'}}
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
            <MenuItem>{state.user?.email}</MenuItem>
  <MenuItem onClick={Signout}>Logout</MenuItem>
</Menu>
          
            </> : 
              <Button onClick={handleOpen} className={classes.loginBtn}>Login</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
