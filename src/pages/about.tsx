import React from "react";
import Layout from "../components/Layout";
import { Link} from 'gatsby';
import styles from "./about.module.css";
import Header from '../components/header';
import { GlobalAuthProvider } from "../context/auth/auth";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

export default function About() {
  return (
    <GlobalAuthProvider>
    <div>
      <Header />
      <h1>About Me</h1>
      <p>I'm Hina Khadim</p>
        <p>Future Software Engineer</p>
        <p>A Full Stack Software Engineer who’s passionate about creating content that can be of value to others. Besides juggling work, content creation and other commitments, I can be found traveling to contemplate the meaning of life under the stars✨
        </p>
        
        <div>
          <li><a href="#"><LinkedInIcon /></a></li>
          <li><a href="#"><GitHubIcon /></a></li>
          <li><a href="#"><TwitterIcon /></a></li>
          <li><a href="#"><EmailIcon /></a></li>
          <li><a href="#"><FacebookIcon /></a></li>
          
        </div>
      </div>
      </GlobalAuthProvider>
  );   
}
