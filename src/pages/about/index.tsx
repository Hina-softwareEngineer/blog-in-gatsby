import React from "react";
import { Link} from 'gatsby';

import { GlobalAuthProvider } from "../../context/auth/auth";
import { ModalContextProvider } from "../../context/modal/modal";

import Header from '../../components/Header/header';
import { data } from '../../../data';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import './about.css';

export default function About() {
  return (
    <GlobalAuthProvider>
      <ModalContextProvider>
        <div className='about-section'>
            <Header />
            <div className='info-section'>
              <h1>About Me</h1>
              <h3>I'm {data.name}</h3>
              <p>{data.introduction}</p>
              <p>
                {
                  data.description
                }
              </p>
            
              <div className='social-links'>
                <li><a className='linkedin' href={`${data.linkedIn}`}><LinkedInIcon /></a></li>
                <li><a className='github' href={`${data.github}`}><GitHubIcon /></a></li>
                <li><a className='twitter' href={`${data.twitter}`}><TwitterIcon /></a></li>
                <li><a className='mail' href={`mailto:${data.mail}`}><EmailIcon /></a></li>
                <li><a className='facebook' href={`${data.facebook}`}><FacebookIcon /></a></li>
              
              </div>
            </div>
          </div>
        </ModalContextProvider>
      </GlobalAuthProvider>
  );   
}
