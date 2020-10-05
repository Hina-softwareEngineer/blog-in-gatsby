import React from "react";
import Layout from "../components/Layout";
import { Link} from 'gatsby';
import styles from "./about.module.css";

export default function About() {
  return (
    <Layout>
      <h1>Hello about</h1>
      <p>About Page !!!</p>
      <div className={styles.myTitle}>About page styes</div>
      <Link to="/app/page1/">Go to Client Page 1</Link>
    </Layout>
  );
}
