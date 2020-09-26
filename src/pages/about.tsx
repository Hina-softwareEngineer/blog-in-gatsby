import React from "react";
import Layout from "../components/Layout";

import styles from "./about.module.css";

export default function About() {
  return (
    <Layout>
      <h1>Hello about</h1>
      <p>About Page !!!</p>
      <div className={styles.myTitle}>About page styes</div>
    </Layout>
  );
}
