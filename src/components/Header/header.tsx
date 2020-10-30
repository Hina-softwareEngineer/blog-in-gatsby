import React, { useState,useContext,useEffect,createRef} from "react";
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
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import Brightness3Icon from '@material-ui/icons/Brightness3';

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
    [theme.breakpoints.down('xs')]: {
      margin: '20px auto',
      width: '80px',
      height: '80px'
    },
  },
  mobileProfile: {
    textAlign:"center"
  }

}));

export default function Header({ handleOpen,blogs}) {
  const classes = useStyles();
  const [resize, setResize] = useState(null);
  const [drawerState, setDrawerState] = useState(false);

  const theme = useTheme();
  const { state, signOut } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(false);

  const toggleDrawer = (option) => { 
    if (option === 'close') {
      setDrawerState(false);
    }
    else if (option == null) { 
setDrawerState(!drawerState);
    }
  }

  useEffect(() => { 
    window.addEventListener('resize', () => setResize(window.innerWidth));
    setResize(window.innerWidth);
        
        () => window.removeEventListener("resize", () => setResize(window.innerWidth));
    }, []);

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

          {
            theme.breakpoints.values.sm <= resize ? <>
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
              }</> : <><MenuIcon onClick={()=> toggleDrawer(null)} />
          <Drawer anchor={'left'} open={drawerState} onClose={()=>toggleDrawer('close')}>
                  
                  <div style={{padding:"8px 0",width:"250px"}}>
                    <List>
                      {
                        state.isAuthenticated && !state.isLoading ?
                          <div className={classes.mobileProfile}>
                            <Avatar src={state.user?.photoURL || "/broken-image.jpg"} className={classes.large} />
                            <h3 className={classes.name}>{state.user?.displayName}</h3>
                            <p style={{padding: '0 5px', fontSize: "13px", margin: '5px 0', marginBottom :"20px"}}>{state.user?.email}</p>
                        </div> : 
                           null
                      }
                      
                      <ListItem onClick={(e) => {toggleDrawer("close");  onClick(e); }} button key={"blogs"}>
            <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
            <ListItemText primary={"Blogs"} />
                      </ListItem>
                      <ListItem onClick={() => {
                        navigate("/about");
                        toggleDrawer("close");
                      }} button key={"About"}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary={"About"} />
                      </ListItem>
                      {
                        state.isAuthenticated && !state.isLoading ? 
                           <ListItem onClick={Signout}  button key={"Logout"}>
            <ListItemIcon><ArrowBackIcon /></ListItemIcon>
            <ListItemText primary={"Logout"} />
                          </ListItem>
                          :  
                          <ListItem onClick={(e) => { handleOpen(e); setDrawerState(false); }}   button key={"Login"}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary={"Login"} />
                      </ListItem> 
                      }
                    
                    
                    </List>
                    
                    </div>
          </Drawer></>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
