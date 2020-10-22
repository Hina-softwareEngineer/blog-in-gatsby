import React from "react";
import Layout from "../components/Layout";
import { Link} from 'gatsby';
import styles from "./about.module.css";
import Header from '../components/header';
import { GlobalAuthProvider } from "../context/auth/auth";


export default function About() {
  return (
    <GlobalAuthProvider>
    <div>
      <Header />
      <h1>About Me</h1>
      <p>I'm Hina Khadim</p>
      <p>Future Software Engineer</p>
      </div>
      </GlobalAuthProvider>
  );   
}
