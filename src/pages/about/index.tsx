import React from "react";
import { Link} from 'gatsby';
import Header from '../../components/Header/header';
import { GlobalAuthProvider } from "../../context/auth/auth";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import './about.css';

export default function About() {
  return (
    <GlobalAuthProvider>
    <div className='about-section'>
        <Header />
        <div className='info-section'>
      <h1>About Me</h1>
      <h3>I'm Hina Khadim</h3>
        <p>Undergraduate Software Engineer | Learner | Mentor</p>
          <p>
            A Full Stack Web developer trying to make the world better place through coding 😇. Loves to code in Python and Javascript.💜 
        </p>
        
        <div className='social-links'>
          <li><a className='linkedin' href="https://www.linkedin.com/in/hina-khadim-632845178/"><LinkedInIcon /></a></li>
          <li><a className='github' href="https://github.com/Hina-softwareEngineer"><GitHubIcon /></a></li>
          <li><a className='twitter' href="http://twitter.com/hinaKhadim_2002"><TwitterIcon /></a></li>
          <li><a className='mail' href="mailto:hinakhadim2002@gmail.com"><EmailIcon /></a></li>
          <li><a className='facebook' href="https://www.facebook.com/hina.hina.35574406"><FacebookIcon /></a></li>
          
          </div>
          </div>
      </div>
      </GlobalAuthProvider>
  );   
}
